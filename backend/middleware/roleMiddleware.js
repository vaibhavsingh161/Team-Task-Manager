// backend/middleware/roleMiddleware.js

export const authorize = (...roles) => {
  return (req, res, next) => {
    // check if user role is allowed
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Access denied" });
    }

    next();
  };
};