require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const User = require("./models/user");
const Mediacion = require("./models/mediacion");

const PORT = process.env.PORT || 5000;
const app = express();
connectDB();

//middleware to parse JSON bodies
app.use(express.json());



// -- NEW: captura errores de JSON inválido provenientes de express.json()
app.use((err, req, res, next) => {
  if (err && err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      message: "JSON inválido en el cuerpo de la petición",
      error: err.message
    });
  }
  next();
});


app.post("/mediaciones/create", async (req, res) => {//localhost:3000/mediaciones
  try {
 const { name, price } = req.body;
    const newMediacion = await Mediacion.create({ name, price });
    return res.status(201).json({ datos: newMediacion });

  } catch (error) {
    return res.status(500).json({
      message: "Hubo un error al crear la mediación",
      error: error.message,
    });
  }
});

app.put("/mediaciones/update/:id", async (req, res) => {
  //localhost:3000/mediaciones/update/:id
  try {
    //este es el controlador para actualizar una mediacion
    const { id } = req.params;
    const { name, price } = req.body;
    const updatedMediacion = await Mediacion.findByIdAndUpdate(
      id,
      { name, descripcion, price },
      { new: true }
    );
    if (!updatedMediacion) {
      return res.status(404).json({ message: "Mediación no encontrada" });
    }
    return res.status(200).json({ datos: updatedMediacion });
  } catch (error) {
    return res.status(400).json({
      message: "Hubo un error al actualizar la mediación",
      error: error.message,
    });
  }
});

app.delete("/mediaciones/delete/:id", async (req, res) => {//localhost:3000/mediaciones/delete/:id
  try {
    const { id } = req.params;
    const deletedMediacion = await Mediacion.findByIdAndDelete(id);
    if (!deletedMediacion) {
      return res.status(404).json({ message: "Mediación no encontrada" });
    }
    return res.status(200).json({ message: "Mediación eliminada con éxito" });
  } catch (error) {
    return res.status(400).json({
      message: "Hubo un error al eliminar la mediación",
      error: error.message,
    });
  }
});



//creacion de metodos para el modelo user

app.get("/users", async (req, res) => { //localhost:3000/users

  try {
    const user = await User.find({});
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({
      message: "Hubo un error al obtener los usuarios",
      error: error.message,
    });
  }
});

app.post("/user/create/login", async (req, res) => { //localhost:3000/user/create/login 
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });
    return res.status(201).json({ user: newUser });
  } catch (error) {
    return res.status(400).json({
      message: "Hubo un error al crear el usuario",
      error: error.message,
    });
  }
});

app.post("/user/create/register", async (req, res) => { //localhost:3000/user/create/register
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });
    return res.status(201).json({ user: newUser });
  } catch (error) {
    return res.status(400).json({
      message: "Hubo un error al crear el usuario",
      error: error.message,
    });
  }
});

app.put("/user/update/:id", async (req, res) => { //localhost:3000/user/update/:id
  try {
    const { id } = req.params;
    const { username, email, password } = req.body; 
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, password },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    return res.status(400).json({
      message: "Hubo un error al actualizar el usuario",
      error: error.message,
    });
  }
});
app.delete("/user/delete/:id", async (req, res) => { //localhost:3000/user/delete/:id
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    return res.status(400).json({
      message: "Hubo un error al eliminar el usuario",
      error: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
