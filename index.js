const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

morgan('tiny')

app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())
app.use(express.static('build'))

const url = 'mongodb://samuel:mango@ds233238.mlab.com:33238/puhelinmuistio'
mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String,
  id: Number
})


let numerot = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Martti Tienari",
    number: "040-123456",
    id: 2
  },
  {
    name: "Arto Järvinen",
    number: "040-123456",
    id: 3
  },
  {
    name: "Lea Kutvonen",
    number: "040-123456",
    id: 4
}
]

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(people => {
//      response.json(people)
      res.send(JSON.stringify(people))
//      mongoose.connection.close()
    })
})

app.get('/info', (req, res) => {
  Person
    .find({})
    .then(people => {
      let text = 'Puhelinluettelossa ' + people.length + ' henkilön tiedot'
      let time = new Date().toString()
      res.send('<p>' + text + '</p>' + '<br>' + '<p>' + time + '</p>')
//      mongoose.connection.close()
    })
})

app.get('/api/persons/:id', (request, response) => {
  const idToFind = Number(request.params.id)

  Person
  .find({ id: idToFind })
  .then(result => {
    if ( result ) {
      response.send(JSON.stringify(result))
    } else {
      response.status(404).end()
    }
//    mongoose.connection.close()
  })

})

app.delete('/api/persons/:id', (request, response) => {
  const idToDelete = Number(request.params.id)
  persons = numerot.filter(person => person.id !== idToDelete)

  response.status(204).end()
})


app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined || body.number === undefined) {
    return response.status(400).json({error: 'nimi tai numero puuttuu'})
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * Math.floor(99999))
  })

  console.log(person)

  person
    .save()
    .then(savedPerson => {
      response.send(JSON.stringify(savedPerson))
    })

})

app.listen(process.env.PORT || 3001)
