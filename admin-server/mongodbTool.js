const mongoClient = require("mongodb").MongoClient;
const server = "mongodb://localhost:27017"

let cacheClient = null;
function connectClient() {
    return new Promise(function (resolve, reject) {
        if (cacheClient) {
            resolve(cacheClient); return;
        }
        const config = { useNewUrlParser: true, useUnifiedTopology: true };
        mongoClient.connect(server, config, function (err, client) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            cacheClient = client;
            resolve(client);
        });
    })
}

/**
 * 查询数据
 * dbName: 数据库名
 * collectName : 集合名
 * filter : 查找过滤条件
 * pageNo : 查询页面
 * pageSize : 每页条数
 */
async function queryCollectionData(dbName, collectName, filter, pageNo, pageSize) {
    let client = await connectClient();

    return new Promise(function (resolve, reject) {
        if (pageNo && pageSize) {
            let skipNum = pageNo * pageSize;
            client.db(dbName).collection(collectName).find(filter).skip(skipNum).limit(pageSize).toArray(function (err, result) {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                resolve(result);
            })
        } else {
            client.db(dbName).collection(collectName).find(filter).toArray(function (err, result) {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }
                resolve(result);
            })
        }
    });
}

/**
 * 删除数据
 * dbName: 数据库名
 * collectName : 集合名
 * filter : 删除的过滤条件
 */
async function removeCollectionData(dbName, collectName, filter) {
    let client = await connectClient();
    return new Promise(function (resolve, reject) {
        client.db(dbName).collection(collectName).deleteOne(filter, function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            resolve(result.result);
        })
    });
}

/**
 * 修改数据
 * dbName: 数据库名
 * collectName : 集合名
 * filter : 更新的过滤条件
 * targetValue : 需要更新的值
 */
async function updateCollectionData(dbName, collectName, filter, targetValue) {
    let client = await connectClient();
    return new Promise(function (resolve, reject) {
        client.db(dbName).collection(collectName).update(filter, targetValue, { multi: true }, function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            resolve(result.result.nModified);
        });
    });
}

/**
 * 插入数据
 * dbName: 数据库名
 * collectName : 集合名
 * targetobj : 插入的数据
 */
async function insertCollectionData(dbName, collectName, targetobj) {
    let client = await connectClient();
    return new Promise(function (resolve, reject) {
        client.db(dbName).collection(collectName).insertOne(targetobj, function (err, result) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

module.exports = {
    queryCollectionData,
    updateCollectionData,
    removeCollectionData,
    insertCollectionData
}
