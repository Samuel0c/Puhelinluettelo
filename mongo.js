const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
const url = 'mongodb://samuel:passwordGoesHere@ds233238.mlab.com:33238/puhelinmuistio'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String,
  id: Number
})

if (process.argv[2]) {
  const personToAdd = new Person({
    name: process.argv[2],
    number: process.argv[3],
    id: Math.floor(Math.random() * Math.floor(99999))
  })

  personToAdd
      .save()
      .then(result => {
        console.log('lisätään henkilön ' + personToAdd.name +  ' numero ' + personToAdd.number + ' luetteloon')
        mongoose.connection.close()
      })
} else {
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(person.name + ' ' + person.number);
        mongoose.connection.close()
      })
    })
}
