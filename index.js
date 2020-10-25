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

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/info", (request, response) => {
  response.send(`
  <p>Phone book has info for people</p>
  <p>${new Date()}</p>
  `);
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then(person=> {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
  })
    .catch(error => next(error))
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  // if (!body.name) {
  //   return response.status(400).json({
  //     error: "name missing",
  //   });
  // }

  // if (!body.number) {
  //   return response.status(400).json({
  //     error: "number missing",
  //   });
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
  .save()
  .then(savedPerson => savedPerson.toJSON())
  .then(savedAndFormattedPerson => response.json(savedAndFormattedPerson))
  .catch(error => next(error))
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, {new: true})
  .then(updatedPerson => {
    response.json(updatedPerson.toJSON())
  })
  .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError'){
    return response.status(400).send({error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)
 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
