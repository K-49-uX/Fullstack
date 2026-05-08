const mongoose = require('mongoose')
const dns = require('dns')



dns.setServers(['8.8.8.8', '1.1.1.1'])

if (process.argv.length < 3) {
  console.log('Usage:')
  console.log('  node mongo.js <password>                       # list all entries')
  console.log('  node mongo.js <password> <name> <number>       # add an entry')
  process.exit(1)
}

if (process.argv.length === 4) {
  console.log('Missing number. Usage: node mongo.js <password> <name> <number>')
  process.exit(1)
}

if (process.argv.length > 5) {
  console.log('Too many arguments. Quote multi-word names, e.g. "Arto Vihavainen".')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Fullstack:${password}@cluster0.f4cg2l4.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Phonebook%20App`

mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

mongoose
  .connect(url)
  .then(() => {
    if (process.argv.length === 3) {
      return Person.find({}).then(persons => {
        console.log('phonebook:')
        persons.forEach(p => {
          console.log(`${p.name} ${p.number}`)
        })
        return mongoose.connection.close()
      })
    }

    const name = process.argv[3]
    const number = process.argv[4]
    const person = new Person({ name, number })

    return person.save().then(() => {
      console.log(`added ${name} number ${number} to phonebook`)
      return mongoose.connection.close()
    })
  })
  .catch(err => {
    console.error('Error:', err.message)
    process.exit(1)
  })
