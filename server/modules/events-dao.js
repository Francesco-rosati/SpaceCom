class EventsDAO {

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
    }

    getEventsBySubcategoryId = (subcategory_id) => {
        let sql = 'SELECT E.id_event, E.picture, E.title, E.content, E.date, E.price, E.city, E.address, E.time, E.details, S.category_name AS CATEGORY, S.name AS SUBCATEGORY_NAME, E.notes, E.website, E.liked FROM EVENTS E, SUBCATEGORIES S WHERE E.id_subcategory = S.id_subcategory AND E.id_subcategory = ?';
        return new Promise((resolve, reject) => {
            this.db.all(sql, [subcategory_id], (err, rows) => {
                if (err) {
                    console.log('Error running sql: ' + sql);
                    console.log(err);
                    reject(err);
                } else {
                    const events = rows.map((el) => {
                        return {
                            id: el.id_event,
                            photo: el.picture,
                            title: el.title,
                            content: el.content,
                            date: el.date,
                            price: el.price,
                            city: el.city,
                            address: el.address,
                            time: el.time,
                            details: el.details,
                            category: el.CATEGORY,
                            subcategory_name: el.SUBCATEGORY_NAME,
                            notes: el.notes,
                            website: el.website,
                            liked: el.liked,
                        }
                    });
                    resolve(events);
                }
            });
        });
    };

    getSubcategories = () => {
        let sql = 'SELECT * FROM SUBCATEGORIES;';
        return new Promise((resolve, reject) => {
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    console.log('Error running sql: ' + sql);
                    console.log(err);
                    reject(err);
                } else {
                    const events = rows.map((el) => {
                        return {
                            id: el.id_subcategory,
                            name: el.name,
                            icon: el.subcategory_icon,
                            category: el.category_name
                        }
                    });
                    resolve(events);
                }
            });
        });
    };

    getCategories = () => {
        let sql = 'SELECT DISTINCT category_name, category_icon FROM SUBCATEGORIES;';
        return new Promise((resolve, reject) => {
            this.db.all(sql, [], (err, rows) => {
                if (err) {
                    console.log('Error running sql: ' + sql);
                    console.log(err);
                    reject(err);
                } else {
                    const events = rows.map((el) => {
                        return {
                            name: el.category_name,
                            icon: el.category_icon
                        }
                    });
                    resolve(events);
                }
            });
        });
    };

    modifyLiked = (id_event, liked) => {
        let sql = 'UPDATE EVENTS SET liked = ? WHERE id_event = ?;';
        return new Promise((resolve, reject) => {
            this.db.run(sql, [liked, id_event], (err, row) => {
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

    modifyAllLiked = () => {
        let sql = 'UPDATE EVENTS SET liked = 0;';
        return new Promise((resolve, reject) => {
            this.db.run(sql, [], (err, row) => {
                if (err) {
                    console.log('Error running sql: ' + sql);
                    console.log(err);
                    reject(err);
                } else {
                    resolve(true);
                }
            });
        });
    }
}



module.exports = EventsDAO;