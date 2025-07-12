const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({ extended: true })); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

// Main route - Loads home.ejs by default
app.get('/', (req, res) => {
    res.render('index', { content: 'partials/home' }); // Send partial file name
});

// Dynamic routes for each page
app.get('/:page', (req, res) => {
    const page = req.params.page;
    const allowedPages = ['about', 'home', 'reviews', 'services', 'contact', 'interior', 'exterior', 'outdoor']; // List of valid pages

    if (allowedPages.includes(page)) {
        if (req.xhr) {
            res.render(`partials/${page}`); // Serve only the partial for AJAX
        } else {
            res.render('index', { content: `partials/${page}` }); // Send partial file name
        }
    } else {
        res.status(404).send('Page Not Found');
    }
});
  
app.listen(process.env.PORT || 3000);