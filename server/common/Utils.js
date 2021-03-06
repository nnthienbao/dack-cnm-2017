const request = require('request-promise');
const ursa = require('ursa');
const crypto = require('crypto');
const {forEach, findIndex} = require('lodash');

const config = require('../config/config-system.json');
const TokenVerify = require('../models/TokenVerify');
const TokenConfirmTransaction = require('../models/TokenConfirmTransaction');
const OutputTransaction = require('../models/OuputTransaction');
const InputTransaction = require('../models/InputTransaction');
const User = require('../models/User');

const URI_KCOIN_API = require('../config/config-system.json').kcoinUriApi;
const HASH_ALGORITHM = 'sha256';

module.exports.checkValidCaptcha = function (captchaResponse) {
    const data = {
        "secret": config.recaptcha.secret,
        "response": captchaResponse
    }
    return request.post(config.recaptcha.url, {form:data});
}

function hash(data) {
    let hash = crypto.createHash(HASH_ALGORITHM);
    hash.update(data);
    return hash.digest();
}

function generateKey() {
    return ursa.generatePrivateKey(1024, 65537);
}

module.exports.generateAddress = function () {
    let privateKey = generateKey();
    let publicKey = privateKey.toPublicPem();
    return {
        privateKey: privateKey.toPrivatePem('hex'),
        publicKey: publicKey.toString('hex'),
        // Address is hash of public key
        address: hash(publicKey).toString('hex')
    };
}

module.exports.createTokenVerifyWithUser = function (user, type) {
    const token = crypto.randomBytes(16).toString('hex');
    const tokenVerify = new TokenVerify({
        _userId: user._id,
        token: token,
        type: type
    });

    return tokenVerify;
};

module.exports.getRealableWallet = function (address) {
    return OutputTransaction.find({ lockScript: "ADD " + address }).then(outputs => {
        if(outputs === null) return 0;

        let coin = 0;
        let promises = [];

        forEach(outputs, output => {
            promises.push(
                InputTransaction.findOne({
                    referencedOutputHash: output.hash_transaction,
                    referencedOutputIndex: output.index
                })
                    .then(inputs => {
                        if (inputs === null) coin += output.value;
                    }));
        });

        return Promise.all(promises).then(() => {
            return coin;

        }).catch(err => {
            console.log(err);
        })
    })
};

module.exports.getCoinLocked = function (address) {
    return request.get(URI_KCOIN_API + 'unconfirmed-transactions').then(transUnconfirms => {
        let coinLock = 0;
        let promises = [];

        forEach(transUnconfirms.inputs, input => {
            promises.push(OutputTransaction.findOne({
                hash_transaction: input.referencedOutputHash,
                index: input.referencedOutputIndex,
                lockScript: "ADD " + address
            }).then(output => {
                if(output !== null) coinLock += output.value;
            }));
        });

        return Promise.all(promises).then(() => {
            return coinLock;
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    })
};

let toBinary = function(transaction, withoutUnlockScript) {
    let version = Buffer.alloc(4);
    version.writeUInt32BE(transaction.version);
    let inputCount = Buffer.alloc(4);
    inputCount.writeUInt32BE(transaction.inputs.length);
    let inputs = Buffer.concat(transaction.inputs.map(input => {
        // Output transaction hash
        let outputHash = Buffer.from(input.referencedOutputHash, 'hex');
        // Output transaction index
        let outputIndex = Buffer.alloc(4);
        // Signed may be -1
        outputIndex.writeInt32BE(input.referencedOutputIndex);
        let unlockScriptLength = Buffer.alloc(4);
        // For signing
        if (!withoutUnlockScript) {
            // Script length
            unlockScriptLength.writeUInt32BE(input.unlockScript.length);
            // Script
            let unlockScript = Buffer.from(input.unlockScript, 'binary');
            return Buffer.concat([outputHash, outputIndex, unlockScriptLength, unlockScript]);
        }
        // 0 input
        unlockScriptLength.writeUInt32BE(0);
        return Buffer.concat([outputHash, outputIndex, unlockScriptLength]);
    }));
    let outputCount = Buffer.alloc(4);
    outputCount.writeUInt32BE(transaction.outputs.length);
    let outputs = Buffer.concat(transaction.outputs.map(output => {
        // Output value
        let value = Buffer.alloc(4);
        value.writeUInt32BE(output.value);
        // Script length
        let lockScriptLength = Buffer.alloc(4);
        lockScriptLength.writeUInt32BE(output.lockScript.length);
        // Script
        let lockScript = Buffer.from(output.lockScript);
        return Buffer.concat([value, lockScriptLength, lockScript]);
    }));
    return Buffer.concat([version, inputCount, inputs, outputCount, outputs]);
};

let sign = function (message, privateKeyHex) {
    // Create private key form hex
    let privateKey = ursa.createPrivateKey(Buffer.from(privateKeyHex, 'hex'));
    // Create signer
    let signer = ursa.createSigner(HASH_ALGORITHM);
    // Push message to verifier
    signer.update(message);
    // Sign

    return signer.sign(privateKey, 'hex');
};

module.exports.createInputUnlockScript = function(transaction, keys) {

    let message = toBinary(transaction, true);
    transaction.inputs.forEach((input, index) => {
        let key = keys[index];
        let signature = sign(message, key.privateKey);
        // Genereate unlock script
        input.unlockScript = 'PUB ' + key.publicKey + ' SIG ' + signature;
    });

};

module.exports.getAllUserLockScript = function() {

    return User.find().then(users => {

        let allLockScript = [];

        forEach(users, user => {

            let lockScript = "ADD " + user.address;
            allLockScript.push(lockScript);

        });

        return allLockScript;
    });
}

module.exports.searchOutputNonUsingEachLockScript = function(lockScript) {

    return OutputTransaction.find({lockScript: lockScript}).then(outputList => {

        if (outputList === null)
            return [];

        let transUnconfirms = [];

        return request.get(URI_KCOIN_API + 'unconfirmed-transactions').then(res => {
            transUnconfirms = JSON.parse(res);
        }).then(() => {
            let outputNonUsingList = [];
            let promises = [];

            forEach(outputList, output => {
                if (isOutputInTransUnConfirm(transUnconfirms, output)) {
                    console.log(output);
                    return;
                }

                promises.push(
                    InputTransaction.findOne({
                        referencedOutputHash: output.hash_transaction,
                        referencedOutputIndex: output.index
                    }).then(input => {
                        if (input === null)
                            outputNonUsingList.push(output);
                    }));
            });

            return Promise.all(promises).then(() => {
                return outputNonUsingList;
            }).catch(err => {
                console.log(err);
            })
        });
    });
};

module.exports.searchOutputNonUsingList = function() {

    return this.getAllUserLockScript().then((allUserLockScript) => {

        let outputNonUsingList = [];
        let promises = [];

        forEach(allUserLockScript, (lockScript)=> {

            promises.push(this.searchOutputNonUsingEachLockScript(lockScript).then((outputList) => {
                let List = [];
                forEach(outputList, (output) => {

                    List.push(output);
                })
                return List;
            }).then(NonUsingList => {
                forEach(NonUsingList, output => {
                    outputNonUsingList.push(output);
                })
            }));
        })

        return Promise.all(promises).then(() => {
            return outputNonUsingList;
        }).catch(err => {
            console.log(err);
        });
    });
}

module.exports.findKeyByOutput = function(output) {

    let address = output.lockScript.split(" ")[1];
    return User.findOne({address: address}).then(user => {
        return user.key;
    })
}

module.exports.sortKey = function(outputs, keys) {

    let newKeys = [];

    for (let i = 0; i < outputs.length; i++) {
        let address = outputs[i].lockScript.split(" ")[1];

        for (let j = 0; j < keys.length; j++) {
            if (keys[j].address === address) {
                newKeys.push(keys[j]);
                break;
            }
        }
    }

    return newKeys;
}

const isOutputInTransUnConfirm = function(transUnconfirms, output) {
    let isIn = false;
    forEach(transUnconfirms, unconfirm => {
        forEach(unconfirm.inputs, input => {
            if (output.hash_transaction === input.referencedOutputHash &&
                output.index === input.referencedOutputIndex) {
                isIn = true;
                return false;
            }
        });
        if(isIn) return false;
    });
    return isIn;
}

module.exports.isEnoughOutputForTransaction = function(sendValue) {
    let count = 0;
    return this.searchOutputNonUsingList().then(outputNonUsingList => {
        forEach(outputNonUsingList, output => {
            count += output.value;

            if (count >= sendValue) {
                return false;
            }
        });
        return count >= sendValue;
    });
};

module.exports.createTokenConfirmTransaction = function (transLocal) {
    const token = crypto.randomBytes(16).toString('hex');
    const tokenconfirm = new TokenConfirmTransaction({
        _transId: transLocal._id,
        token: token,
    });

    return tokenconfirm;
}

module.exports.getTotalCoinOfSystem = function () {
    let totalCoin = {
        totalRealableCoin: 0,
        totalAvailableCoin: 0
    };
    return User.find({}).then(listUsers => {

        if (listUsers === null)
            return totalCoin;

        let transUnconfirms = [];

        return request.get(URI_KCOIN_API + 'unconfirmed-transactions').then(res => {
            transUnconfirms = JSON.parse(res);
        }).then(() => {
            let promiseUsers = [];
            let promiseOuputs = [];

            forEach(listUsers, user => {
                promiseUsers.push(
                    OutputTransaction.find({lockScript: 'ADD ' + user.address}).then(listOutputs => {
                        forEach(listOutputs, output => {
                            promiseOuputs.push(InputTransaction.findOne({
                                referencedOutputHash: output.hash_transaction,
                                referencedOutputIndex: output.index
                            }).then(input => {
                                if (input === null) {
                                    totalCoin.totalRealableCoin += output.value;
                                    if (!isOutputInTransUnConfirm(transUnconfirms, output)) {
                                        totalCoin.totalAvailableCoin += output.value;
                                    }
                                }
                            }));
                        })
                    }))
            });

            return Promise.all(promiseUsers).then(() => {
                return Promise.all(promiseOuputs).then(() => {
                    return totalCoin;
                })
            }).catch(err => {
                console.log(err);
            })
        });
    });
};

const isOutputHasUsed = function (output) {
    return InputTransaction.findOne({
        referencedOutputHash: output.hash_transaction,
        referencedOutputIndex: output.index }).then(input => {
            return input !== null;
    })
};

const getAllTransUnConfirm = function () {
    return request.get(URI_KCOIN_API + 'unconfirmed-transactions').then(transUnConfirm => {
        return JSON.parse(transUnConfirm);
    });
};

module.exports.getCoinByAddress = function (address) {
    let coin = {
        realable: 0,
        available: 0
    };
    let transUnconfirms = [];
    return getAllTransUnConfirm().then(trans => {
        transUnconfirms = trans;
    }).then(() => {
        let promises = [];
        return OutputTransaction.find({ lockScript: 'ADD ' + address }).then(listOutputs => {
            forEach(listOutputs, output => {
                promises.push(isOutputHasUsed(output).then(hasUsed => {
                    if(!hasUsed) {
                        if(!isOutputInTransUnConfirm(transUnconfirms, output)) {
                            coin.available += output.value;
                        }
                        coin.realable += output.value;
                    }
                }));
            });

            return Promise.all(promises).then(() => {
                return coin;
            })
        });
    });
};





