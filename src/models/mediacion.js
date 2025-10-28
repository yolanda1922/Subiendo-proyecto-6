const mongoose = require("mongoose");

const mediacionSchema = new mongoose.Schema(
  {
    // Define schema fields here
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const Mediacion = mongoose.model("Mediacion", mediacionSchema);
module.exports = Mediacion;
