const express = require('express')
const app = express()

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
  res.json(numerot)
})

app.get('/info', (req, res) => {
  let text = 'Puhelinluettelossa ' + numerot.length + ' henkilön tiedot'
  let time = new Date().toString()
  res.send('<p>' + text + '</p>' + '<br>' + '<p>' + time + '</p>')
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = numerot.find(person => person.id === id)

  if ( person ) {
    response.json(person)
  } else {
    response.status(404).end()
  }

})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = numerot.filter(person => person.id !== id)

  response.status(204).end()
})

app.listen(process.env.PORT || 3001)
