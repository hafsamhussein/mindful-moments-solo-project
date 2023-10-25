// GET all moments for logged-in user
router.get('/moments', rejectUnauthenticated, (req, res) => {
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
router.post('/moments', rejectUnauthenticated, (req, res) => {
    const { name, date, notes, photo_url } = req.body;
    const queryText = `INSERT INTO "moments" ("name", "date", "notes", "photo_url", "user_id") VALUES ($1, $2, $3, $4, $5);`;
    pool.query(queryText, [name, date, notes, photo_url, req.user.id])
    .then(() => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
});

// DELETE a moment for logged-in user
router.delete('/moments/:id', rejectUnauthenticated, (req, res) => {
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
// GET all reflections for logged-in user
router.get('/reflections', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "reflections" WHERE user_id = $1;`;
    pool.query(queryText, [req.user.id])
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
});

// POST a new reflection for logged-in user
router.post('/reflections', rejectUnauthenticated, (req, res) => {
    const { content, date } = req.body;
    const queryText = `INSERT INTO "reflections" ("content", "date", "user_id") VALUES ($1, $2, $3);`;
    pool.query(queryText, [content, date || null, req.user.id])
    .then(() => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
});

// DELETE a reflection for logged-in user
router.delete('/reflections/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `DELETE FROM "reflections" WHERE "id" = $1 AND "user_id" = $2;`;
    pool.query(queryText, [req.params.id, req.user.id])
    .then(() => {
        res.sendStatus(204);
    })
    .catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
});
