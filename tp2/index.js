const express = require("express");
const app = express();

app.listen(7000, () => {});

app.get("/hello", (req, res) => {
  res.json({ msg: "hello" });
});
let voitures = [
  { id: 1, name: "clio" },
  { id: 2, name: "megane" },
  { id: 3, name: "range" },
];
app.post("/create", (req, res) => {
  const voiture = req.body;
  voitures.push(voiture);
  res.status(201).send("voiture ajoutée avec success").json(voiture);
});
app.get("/voitures", (req, res) => {
  res.status(200).json(voitures);
});

app.get("/voitures/:id", (req, res) => {
  const voiture = voitures.find((v) => v.id === parseInt(req.params.id));
  if (!voiture) return res.status(404).send("Voiture non trouvée");
  res.status(200).json(voiture);
});

app.put("/voitures/:id", (req, res) => {
  const voiture = voitures.find((v) => v.id === parseInt(req.params.id));
  if (!voiture) return res.status(404).send("Voiture non trouvée");
  const updatedVoiture = Object.assign({}, voiture, req.body);
  res.status(200).json(updatedVoiture);
});

app.delete("/voitures/:id", (req, res) => {
  const index = voitures.findIndex((v) => v.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Voiture non trouvée");
  voitures.splice(index, 1);
  res.status(200).json({ message: "Voiture supprimée" });
});
