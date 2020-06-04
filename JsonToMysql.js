const fs = require('fs');
const mysql = require('mysql');

module.exports = function translateJSONtoMysql(filePath, realName) {   
    var filePath = './save/' + jsonFileName;
    fs.readFile(filePath, 'utf-8', (err, data) => {
        var sqlconnection = mysql.createConnection({
            //輸入MySQL的相關訊息
            host: '127.0.0.1',
            user: 'xxx',
            password: 'xxx',
            database: 'xxx'
        });
        sqlconnection.connect();
        //創建資料庫
        var sql = `create table ${realName}(`;
        if (err) { console.log(err); }
        else {
            var dataObj = JSON.parse(data);
            var keys = Object.keys(dataObj[0]);
            for (var k = 0; k < keys.length; k++) {
                sql = sql + keys[k] + ' varchar(32),'
            }
            sql = sql.substring(0, sql.length - 1);
            sql = sql + ');';
            sqlconnection.query(sql, function (err, result) {
                if (err) {
                    console.log('[SELECT ERROR] - ', err.message);
                    return;
                }
            });
            //寫入數據
            for (var i = 0; i < dataObj.length; i++) {
                var insertSql = `insert into ${realName} values(`;
                for (var j = 0; j < keys.length; j++) {
                    insertSql = insertSql + "'" + Object.values(dataObj[i])[j] + "',";
                }
                insertSql = insertSql.substring(0, insertSql.length - 1);
                insertSql = insertSql + ');';
                sqlconnection.query(insertSql, function (err, result) {
                    if (err) {
                        console.log('[SELECT ERROR] - ', err.message);
                        return;
                    }
                });
            }
        }
    })
}
