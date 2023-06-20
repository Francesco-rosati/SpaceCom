'use strict';

const express = require('express');
const { check, body, validationResult } = require('express-validator');
const router = express.Router();
const usersDao = require('../modules/DbManager').users_dao;

/*** Users APIs ***/

/* 
	Example of body:
	[1,2,8,9,11]
*/

//PUT /api/storeSubcategories
router.put('/storeSubcategories',
	async (req, res) => {

		try {
			const result = await usersDao.storeUserSubcategories(JSON.stringify(req.body));

			return res.status(200).json(result);
		} catch (err) {
			console.log(err);
			return res.status(503).json({ error: 'Service Unavailable' });
		}
	}
);

//GET /api/getUserCategories
router.get('/getUserCategories',
    async (req, res) => {

        try {

			let result = await usersDao.getUserSubcategories();
			
			let categories = await usersDao.getUserCategories(result.subcategories);
           
            res.status(200).json(categories);
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

//GET /api/getUserSubCategories
router.get('/getUserSubCategories',
    async (req, res) => {

        try {

			let result = await usersDao.getUserSubcategories();
           
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

module.exports = router;