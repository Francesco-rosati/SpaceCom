class UsersDAO {

    sqlite = require('sqlite3');

    constructor(db) {
        this.db = db;
    }

    // close the connection to database
    closeTables = () => {
        return new Promise((resolve, reject) => {
            this.db.close();
            resolve(true);
        });
    };

    getUserCategories = (subcategories) => {

        let sub_array = JSON.parse(subcategories);

        let sql = 'SELECT DISTINCT category_name FROM SUBCATEGORIES';

        if (sub_array.length>0) {
            for (let i = 0; i < sub_array.length; i++) {
                if (i === 0) {
                    sql = sql + ' WHERE id_subcategory = ' + sub_array[i];
                } else {
                    sql = sql + ' OR id_subcategory = ' + sub_array[i]; 
                }
            }
        }

        return new Promise((resolve, reject) => {
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    console.log('Error running sql: ' + sql);
                    console.log(err);
                    reject(err);
                } else {
                    const categories = rows.map((el) => el.category_name);
                    resolve(categories);
                }
            });
        });
    };

    getUserSubcategories = () => {
        let sql = 'SELECT subcategories FROM USER WHERE id_user = 1;';
        return new Promise((resolve, reject) => {
            this.db.get(sql, [], (err, row) => {
                if (err) {
                    console.log('Error running sql: ' + sql);
                    console.log(err);
                    reject(err);
                } else {
                    const subcategories = {
                        subcategories: row.subcategories
                    };
                    resolve(subcategories);
                }
            });
        });
    };

    storeUserSubcategories = (subcategories) => {
        let sql = 'UPDATE USER SET subcategories = ? WHERE id_user = 1;';
        return new Promise((resolve, reject) => {
            this.db.run(sql, [subcategories], (err, row) => {
                if (err) {
                    console.log('Error running sql: ' + sql);
                    console.log(err);
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    };

}

module.exports = UsersDAO;