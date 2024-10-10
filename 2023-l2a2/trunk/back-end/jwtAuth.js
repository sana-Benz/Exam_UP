const router = require("express").Router();
const { json } = require("express");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("./jwtGenerator");
const validInfo = require("./validInfo");
const authorize = require("./authorization");

//s'inscire

router.post("/register", validInfo, async (req, res) => {
  try {
    //1. recuperer role, prenom, nom, email, password

    const { role, prenom, nom, email, mdp } = req.body;

    //2.verifie si il est deja dans la base

    const user = await pool.query(
      " SELECT * FROM utilisateur WHERE mail = $1",
      [email]
    );

    if (user.rows.length !== 0) {
      res.status(401).send("L'user existe deja");
    }

    //3. Bycript le password

    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);

    const bcryptPassword = await bcrypt.hash(mdp, salt);

    //4. Inserer l'utilisateur au sein de la base

    const newUser = await pool.query(
      " INSERT INTO utilisateur (role, nom, prenom, mail, mdp)VALUES($1,$2,$3,$4,$5) RETURNING *",
      [role, nom, prenom, email, bcryptPassword]
    );

    //5. Generation du token jwt

    const jwtToken = jwtGenerator(newUser.rows[0].id);
    return res.json({ jwtToken });

 
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erreur 500");
  }
});

// se conncecter

router.post("/login", validInfo, async (req, res) => {
  try {
    //1. recuprer name, email, password

    const { email, mdp } = req.body;

    //2.comparer avec ce qui il y a en base

    const user = await pool.query("SELECT * FROM utilisateur WHERE mail = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      res.status(401).send("Le compte n'existe pas créer le");
    }

    //3. Verifier si c'est le bon mdp

    const validPassword = await bcrypt.compare(mdp, user.rows[0].mdp);

    if (!validPassword) {
      res.status(401).send("Le password est mauvais");
    }

    //4. donner le jwt token

    const token = jwtGenerator(user.rows[0].id);

    res.status(200).json({ token ,
         role : user.rows[0].role,
         id : user.rows[0].id});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Erreur 500");
  }
});

// Verification que le token est bien créer

router.post("/verify", authorize, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
