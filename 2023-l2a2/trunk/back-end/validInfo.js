module.exports = function (req, res, next) {
  const { role, prenom, nom, email, mdp } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    console.log(!email.length);
    if (![role, prenom, nom, email, mdp].every(Boolean)) {
      return res.status(401).json("Manque un élement");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![email, mdp].every(Boolean)) {
      return res.status(401).json("Manque un élement");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  }

  next();
};
