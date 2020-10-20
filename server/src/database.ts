import oracledb, { outFormat } from 'oracledb';
import keys from './keys';

function dbConnect(){

    var connection = {
        execwocallback : async function(queryEst:string, params:oracledb.BindParameters,callback: Function){
            oracledb.getConnection(keys.database, function(err, connection){
                if(err){
                    console.log('Connection error');
                    console.error(err.message);
                    callback();
                }

                connection.execute(queryEst, params,{
                    outFormat: oracledb.OBJECT,
                    autoCommit: true
                },
                function(err,result){
                    if(err){
                        console.log(err.message);
                        doRelease(connection);
                    }
                    else{
                        doRelease(connection);
                    }
                });

                function doRelease(connection:oracledb.Connection){
                    connection.release(
                        function(err){
                            if(err){
                                console.error(err.message);
                            }
                        }
                    );
                }
            })
        },

        exec : async function(queryEst:string,params:oracledb.BindParameters, callback:Function){
            oracledb.getConnection(keys.database,function(err,connection){
                if(err){
                    console.log('Connection error');
                    console.error(err.message);
                    callback();
                }

                connection.execute(queryEst,params,{
                    outFormat:oracledb.OBJECT,
                    autoCommit:true
                },
                function(err,result){
                    if(err){
                        console.error(err.message);
                        doRelease(connection);
                        callback(err);
                    }
                    else{
                        var res = result.rows;
                        doRelease(connection);
                        callback(res);
                    }
                });
            });

            function doRelease(connection:oracledb.Connection){
                connection.release(
                    function(err){
                        if(err){console.error(err.message);}
                    }
                );
            }
        },

        execMany(statement:string, binds:any[]){
            let options = {
                autoCommit:true,
                batchErrors:true,
                outFormat: oracledb.OBJECT
            };
            var r;
            oracledb.getConnection(keys.database,function(err,connection){
                connection.executeMany(statement,binds,options,function(err,result){
                    if(err){
                        r=-1;
                        console.log(err);                    
                    }
                    else{
                        console.log(result);
                        r= result;
                        return(result);
                    }
                });
            });
            return r;
        },

        execwcursor: function(queryEst:string, params:oracledb.BindParameters, callback:Function){
            var resultCallBack:any = [];
 
            oracledb.getConnection(keys.database,function(err,connection){
                if(err){
                    console.log('Connection Error');
                    console.error(err.message);
                    callback();
                }
                connection.execute(queryEst,params,{
                    outFormat:oracledb.OBJECT,
                    autoCommit: true
                },
                function(err:oracledb.DBError, result:oracledb.Result){
                    if(err){
                        console.error(err.message);
                        doRelease(connection);
                        callback(err);
                    }
                    else{
                        fetchRowsFromRS(connection,result.resultSet,100);
                    }
                });
            });

            function fetchRowsFromRS(connection:oracledb.Connection, resultSet:oracledb.ResultSet, numRows:number){
                resultSet.getRows(
                    numRows,
                    function(err,rows:any){
                        if(err){
                            console.log(err);
                            doClose(connection,resultSet);
                        }
                        else if(rows.length==0){
                            doClose(connection,resultSet);
                            callback(resultCallBack);
                        }
                        else if(rows.length > 0){
                            rows.array.forEach(function(element:any) {
                                resultCallBack.push(element);
                            });
                            fetchRowsFromRS(connection,resultSet,numRows);                        
                        }
                    }
                );
            }

            function doRelease(connection: oracledb.Connection) {
                connection.release(
                     function (err) {
                          if (err) { console.error(err.message); }
                     }
                );
           }

           function doClose(connection:oracledb.Connection, resultSet:any) {
                resultSet.close(
                     function (err:oracledb.DBError) {
                          if (err) { console.error(err.message); }
                          doRelease(connection);
                     }
                );
           }
        }
    }
    return connection;
}

export default {dbConnect:dbConnect};