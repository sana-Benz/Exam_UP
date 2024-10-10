const router = require("express").Router();
const authorize = require("./authorization");
const pool = require("./db");

router.get("/", authorize, async (req, res) => {
  try {
    const user = await pool.query("SELECT nom FROM utilisateur WHERE id = $1", [
      req.user.id,
    ]);

    console.log(req.user);

    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
