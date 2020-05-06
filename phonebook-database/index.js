require('dotenv').config();
const express = require("express");
const Entry = require('./models/entry');

const app = express();
app.use(express.json()); //now automatically when we make a request, it will have a body property containing a object with the request content

const entriesArray = [];
app.get("/api/entries", (req, res) => {
  Entry.find({}).then(entries => {
    entries.map(x => entriesArray.concat(x));
    console.log('entries array:', entriesArray);
    res.json(entries);
  })
});
console.log('entries array2:', entriesArray);


app.get("/info", (req, res) => {
  const date = new Date();
  Entry.find({}).then(entries => {
    const nEntries = entries.length;
  })

  return res.send(
    `<p>We have intel on ${nEntries} individuals. You know what to do.</p><p>Date:${date}</p>`
  );
});

app.get("/api/entries/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log("we are looking for id:", id);
  Entry.find({ _id: id }).then(x => res.json(x)).catch(x => res.status(404).end());

});

app.delete("/api/entries/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log("we are going to delete the entry with id:", id);

  persons = persons.filter((x) => x.id !== id); //person removed
  return res.status(204).end();
});

app.post("/api/entries/", (req, res) => {
  const body = req.body;
  console.log("we are going to add", body);

  if (!body.name || !body.number)
    return res.status(400).json({ error: "name or number missing" });

  const entry = {
    name: body.name,
    number: body.number
  };

  entry.save().then(x => res.json(x));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(
    `Hi, welcome to the server... No, you can't get out MUAHAHAHA.\nWe are listening in ${PORT}`
  );
});
