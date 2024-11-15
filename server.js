const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
// Use bodyParser (if not already used)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' folder
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb+srv://scriwu:GaB2QUni0S5LppgF@webpage.a09pq.mongodb.net/?retryWrites=true&w=majority&appName=Webpage', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Error connecting to MongoDB:', err));

// Route to handle form submissions
app.post('/submit', (req, res) => {
  const { name, email, message } = req.body;
  
  const Contact = require('./models/Contact');  // Adjust the model path
  const newContact = new Contact({ name, email, message });

  newContact.save()
      .then(() => res.send('Thank you for contacting me!'))
      .catch(err => res.status(500).send('Error: ' + err));
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

