"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const oracledb_1 = __importDefault(require("oracledb"));
const keys_1 = __importDefault(require("./keys"));
function dbConnect() {
    var connection = {
        execwocallback: function (queryEst, params, callback) {
            return __awaiter(this, void 0, void 0, function* () {
                oracledb_1.default.getConnection(keys_1.default.database, function (err, connection) {
                    if (err) {
                        console.log('Connection error');
                        console.error(err.message);
                        callback();
                    }
                    connection.execute(queryEst, params, {
                        outFormat: oracledb_1.default.OBJECT,
                        autoCommit: true
                    }, function (err, result) {
                        if (err) {
                            console.log(err.message);
                            doRelease(connection);
                        }
                        else {
                            doRelease(connection);
                        }
                    });
                    function doRelease(connection) {
                        connection.release(function (err) {
                            if (err) {
                                console.error(err.message);
                            }
                        });
                    }
                });
            });
        },
        exec: function (queryEst, params, callback) {
            return __awaiter(this, void 0, void 0, function* () {
                oracledb_1.default.getConnection(keys_1.default.database, function (err, connection) {
                    if (err) {
                        console.log('Connection error');
                        console.error(err.message);
                        callback();
                    }
                    connection.execute(queryEst, params, {
                        outFormat: oracledb_1.default.OBJECT,
                        autoCommit: true
                    }, function (err, result) {
                        if (err) {
                            console.error(err.message);
                            doRelease(connection);
                            callback(err);
                        }
                        else {
                            var res = result.rows;
                            doRelease(connection);
                            callback(res);
                        }
                    });
                });
                function doRelease(connection) {
                    connection.release(function (err) {
                        if (err) {
                            console.error(err.message);
                        }
                    });
                }
            });
        },
        execMany(statement, binds) {
            let options = {
                autoCommit: true,
                batchErrors: true,
                outFormat: oracledb_1.default.OBJECT
            };
            var r;
            oracledb_1.default.getConnection(keys_1.default.database, function (err, connection) {
                connection.executeMany(statement, binds, options, function (err, result) {
                    if (err) {
                        r = -1;
                        console.log(err);
                    }
                    else {
                        console.log(result);
                        r = result;
                        return (result);
                    }
                });
            });
            return r;
        },
        execwcursor: function (queryEst, params, callback) {
            var resultCallBack = [];
            oracledb_1.default.getConnection(keys_1.default.database, function (err, connection) {
                if (err) {
                    console.log('Connection Error');
                    console.error(err.message);
                    callback();
                }
                connection.execute(queryEst, params, {
                    outFormat: oracledb_1.default.OBJECT,
                    autoCommit: true
                }, function (err, result) {
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        callback(err);
                    }
                    else {
                        fetchRowsFromRS(connection, result.resultSet, 100);
                    }
                });
            });
            function fetchRowsFromRS(connection, resultSet, numRows) {
                resultSet.getRows(numRows, function (err, rows) {
                    if (err) {
                        console.log(err);
                        doClose(connection, resultSet);
                    }
                    else if (rows.length == 0) {
                        doClose(connection, resultSet);
                        callback(resultCallBack);
                    }
                    else if (rows.length > 0) {
                        rows.array.forEach(function (element) {
                            resultCallBack.push(element);
                        });
                        fetchRowsFromRS(connection, resultSet, numRows);
                    }
                });
            }
            function doRelease(connection) {
                connection.release(function (err) {
                    if (err) {
                        console.error(err.message);
                    }
                });
            }
            function doClose(connection, resultSet) {
                resultSet.close(function (err) {
                    if (err) {
                        console.error(err.message);
                    }
                    doRelease(connection);
                });
            }
        }
    };
    return connection;
}
exports.default = { dbConnect: dbConnect };
