'use strict';

const sqlite = require('sqlite3');

const db = new sqlite.Database('SpaceCom.db', (err) => {
	if (err) throw err;
});

const eventsDAO = require('./events-dao');
const UsersDAO = require('./users-dao');

const events_dao = new eventsDAO(db);
const users_dao = new UsersDAO(db);

module.exports = { events_dao, users_dao };