const express = require("express");

const app = express();
app.use(express.json()); //now automatically when we make a request, it will have a body property containing a object with the request content

let persons = [
  {
    name: "Ayase Chihaya",
    number: "888888888888",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
  {
    name: "Ada Sanae",
    number: "39-44-5323523",
    id: 5,
  },
  {
    name: "Topalov",
    number: "12-43-234345",
    id: 6,
  },
  {
    name: "Alexander Grothendieck",
    number: "39-23-6423122",
    id: 7,
  },
  {
    name: "Alexandorov Oblomov",
    number: "2145811",
    id: 8,
  },
  {
    name: "Anna Karenina",
    number: "128",
    id: 9,
  },
  {
    name: "Sasha Pankratov",
    number: "8419",
    id: 10,
  },
  {
    name: "Lionel Messi",
    number: "0",
    id: 11,
  },
  {
    name: "Ronaldinho",
    number: "1",
    id: 12,
  },
  {
    name: "Dekomori Sanae",
    number: "28",
    id: 13,
  },
  {
    name: "Teste",
    number: "28",
    id: 14,
  },
];

app.get("/api/persons", (req, res) => {
  return res.json(persons);
});

app.get("/info", (req, res) => {
  const date = new Date();
  const nPersons = persons.length;
  return res.send(
    `<p>We have intel on ${nPersons} individuals. You know what to do.</p>Date:${date}<p></p>`
  );
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log("we are looking for id:", id);
  const result = persons.find((x) => x.id === id);

  if (result) return res.json(result);
  else return res.status(404).end();
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  console.log("we are going to delete the entry with id:", id);

  persons = persons.filter((x) => x.id !== id); //person removed
  return res.status(204).end();
});

app.post("/api/persons/", (req, res) => {
  const body = req.body;
  console.log("we are going to add", body);

  if (!body.name || !body.number)
    return res.status(400).json({ error: "name or number missing" });

  const repeatNames = persons.filter((x) => x.name === body.name); //array containing persons whose names are equal to person we are adding
  if (repeatNames.length > 0)
    return res.status(400).json({ error: "name already exists in phonebook" });

  const person = {
    name: body.name,
    number: body.number,
    id: Math.random() * 100000 + 14,
  };

  persons = persons.concat(person);
  return res.json(person);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(
    `Hi, welcome to the server... No, you can't get out MUAHAHAHA.\nWe are listening in ${PORT}`
  );
});
