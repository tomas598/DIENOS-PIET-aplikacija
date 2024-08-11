const role = (roles) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      return res.status(403).json({ msg: "Access deniedffff" });
    }
    next();
  };
};

module.exports = role;
