const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(result => {
      console.log('Connected to phonebook-app DB')
   })
   .catch((error) => {
      console.log('Error connecting to DB:', error.message)
   });


const entrySchema = new mongoose.Schema({
   name: String,
   number: String,
});

module.exports = mongoose.model('Entry', entrySchema)