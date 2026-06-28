const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
      return res.status(401).json({
        error: "Access Denied",
      });
    }

    // REMOVE "Bearer "
    const token = authHeader.replace("Bearer ", "");

    const verified = jwt.verify(
      token,

      process.env.JWT_SECRET,
    );

    req.admin = verified;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      error: "Invalid or Expired Token",
    });
  }
};

module.exports = authMiddleware;
