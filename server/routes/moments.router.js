const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

// GET all moments for logged-in user
router.get('/', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "moments" WHERE user_id = $1;`;
    pool.query(queryText, [req.user.id])
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
});

// POST a new moment for logged-in user
router.post('/', rejectUnauthenticated, (req, res) => {
    const { name, notes, date, photo_url } = req.body;
    const queryText = `INSERT INTO "moments" ("name", "notes", "date", "photo_url", "user_id") VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [name, notes, date, photo_url, req.user.id])
    .then(() => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
});

// UPDATE a moment for logged-in user
router.put('/:id', rejectUnauthenticated, (req, res) => {
    const { name, notes, date, photo_url } = req.body;
    const queryText = `UPDATE "moments" SET "name" = $1, "notes" = $2, "date" = $3, "photo_url" = $4 WHERE "id" = $5 AND "user_id" = $6;`;
    pool.query(queryText, [name, notes, date, photo_url, req.params.id, req.user.id])
    .then(() => {
        res.sendStatus(204);
    })
    .catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
});

// DELETE a moment for logged-in user
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `DELETE FROM "moments" WHERE "id" = $1 AND "user_id" = $2;`;
    pool.query(queryText, [req.params.id, req.user.id])
    .then(() => {
        res.sendStatus(204);
    })
    .catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
});

module.exports = router;
