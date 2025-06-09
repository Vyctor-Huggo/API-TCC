require('dotenv').config()
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token não fornecido ou mal formatado" });
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const userDecoded = jwt.verify(token, SECRET_KEY);
      req.user = userDecoded;
      next();
    } catch (err) {
      return res.status(403).json({ error: "Token inválido ou expirado" });
    }
  };