'use strict';

const express = require('express');
const { check, body, validationResult } = require('express-validator');
const router = express.Router();
const eventsDao = require('../modules/DbManager').events_dao;
const usersDao = require('../modules/DbManager').users_dao;

/*** Events APIs ***/

//GET /api/events
router.get('/events',
    async (req, res) => {

        try {

            const result = await usersDao.getUserSubcategories();

            let events = [];

            for (let id of JSON.parse(result.subcategories)) {
                let element = await eventsDao.getEventsBySubcategoryId(id);
                events = events.concat(element);
            }

            res.status(200).json(events);
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

//GET /api/catAndSubcat
router.get('/catAndSubcat',
    async (req, res) => {
        try {

            let categories = await eventsDao.getCategories();
            let subcategories = await eventsDao.getSubcategories();

            res.status(200).json({
                categories: categories,
                subcategories: subcategories
            });
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

/*
    Example of body:
    {
        "id_event": 1,
        "liked": false
    }
*/

//PUT /api/modifyLiked
router.put('/modifyLiked',
    body('id_event').notEmpty().isInt({ min: 1 }),
    body('liked').notEmpty().isBoolean(),
    async (req, res) => {

        if (Object.keys(req.body).length === 0) {
            return res.status(422).json({ error: 'Empty body request' });
        }

        if (Object.keys(req.body).length !== 2) {
            return res.status(422).json({ error: 'Data not formatted properly' });
        }

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }

        try {

            const result = await eventsDao.modifyLiked(req.body.id_event, Number(req.body.liked));

            return res.status(200).json(result);
        } catch (err) {
            console.log(err);
            return res.status(503).json({ error: 'Service Unavailable' });
        }
    }
);

router.put('/modifyAllLiked',
    async (req, res) => {
        try {

            const result = await eventsDao.modifyAllLiked();
            if (result) {
                return res.status(200).json(result);
            }
        } catch (err) {
            console.log(err);
            return res.status(503).json({ error: 'Service Unavailable' });
        }
    }
);

module.exports = router;