import express from "express";
import products from "./data/products.js";

const app = express();

app.get("/", (req, res) => {
  return res.send("API is running");
});

app.get("/api/products", (req, res) => {
  return res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  return res.json(product);
});

app.listen(5000, console.log("Server running on port 5000"));

export default app;
