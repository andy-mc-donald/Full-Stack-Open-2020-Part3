require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('build'));

morgan.token('data', (req, res) => {
  if(req.method === "POST"){
    return JSON.stringify(req.body)
  }
  else{
    return
  }
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
// app.use(morgan('tiny'));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  }
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/info", (request, response) => {
  response.send(`
  <p>Phone book has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  `);
});

app.get("/api/persons", (request, response) => {
  // response.json(persons);
  Person.find({}).then(persons => {
    response.json(persons)
  })
});

app.get("/api/persons/:id", (request, response) => {
  // const id = Number(request.params.id);
  // const person = persons.find((person) => person.id === id);
  // if (person) {
  //   response.json(person);
  // } else {
  //   response.status(404).end();
  // }
  Person.findById(request.params.id).then(person=> {
    response.json(person)
  })
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

// const generateId = () => {
//   let id = Math.floor(Math.random() * 100) + 1;
//   while (persons.find((x) => x.id === id)) {
//     id = Math.floor(Math.random() * 100) + 1;
//   }
//   return id;
// };

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }

  // if (persons.find(x => x.name.toUpperCase() === body.name.toUpperCase())) {
  //   return response.status(400).json({
  //     error: "name must be unique",
  //   });
  // }

  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    // id: generateId(),
  });
  // console.log(person);
  // persons = persons.concat(person);
  // response.json(person);
  
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
