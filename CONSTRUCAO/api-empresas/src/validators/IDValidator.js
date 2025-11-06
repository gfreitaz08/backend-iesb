const mongoose = require("mongoose");

function validateId(paramName = "id") {
  return (req, res, next) => {
    const id = req.params[paramName];
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }
    next();
  };
}

module.exports = validateId;