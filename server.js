const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Load existing URLs from JSON file
let urls = {};
try {
    const data = fs.readFileSync('urls.json');
    urls = JSON.parse(data);
} catch (error) {
    console.log('Error reading urls.json:', error.message);
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Endpoint to create short URL
app.post('/shorten', (req, res) => {
    const originalUrl = req.body.url;
    const shortCode = shortid.generate();

    urls[shortCode] = originalUrl;

    // Save updated URLs to JSON file
    fs.writeFile('urls.json', JSON.stringify(urls), (err) => {
        if (err) {
            console.error('Error writing to urls.json:', err.message);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortCode}` });
        }
    });
});

// Redirect short URL to original URL
app.get('/:shortCode', (req, res) => {
    const shortCode = req.params.shortCode;
    const originalUrl = urls[shortCode];

    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).send('Short URL not found');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
