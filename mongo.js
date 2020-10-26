const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const db = 'phonebook';
const password = process.argv[2];
const nam = process.argv[3];
const num = process.argv[4];

const url =
 `mongodb+srv://user1:${password}@cluster0.qu47e.mongodb.net/${db}?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

const person = new Person({
  name: nam,
  number: num,
});

if (process.argv.length === 3){
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person);
    });
    mongoose.connection.close();
  });
}

else if (process.argv.length > 3){
  person.save().then(result => {
    console.log(`added ${nam} number ${num} to ${db}`);
    mongoose.connection.close();
  });
}
