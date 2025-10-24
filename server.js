const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Contact Form POST Route
app.post('/contact', (req, res) => {
    const message = req.body;
    const filePath = path.join(__dirname, 'data', 'messages.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        let messages = [];
        if (!err && data) {
            messages = JSON.parse(data);
        }
        messages.push({
            name: message.name,
            email: message.email,
            message: message.message,
            date: new Date().toLocaleString()
        });

        fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
            if (err) return res.status(500).send('Error saving message');
            res.send({ success: true });
        });
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
