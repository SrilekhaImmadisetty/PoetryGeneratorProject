const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/generatePoem', (req, res) => {
    const mood = req.query.mood;
    const filePath = path.join(__dirname, 'data', 'poems.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading poems data.');
        }
        const poems = JSON.parse(data);
        if (!poems[mood]) {
            return res.status(400).send('Invalid mood selected.');
        }
        const selectedPoems = poems[mood];
        // Select at least three poems
        const randomPoems = [];
        while (randomPoems.length < 3) {
            const randomPoem = selectedPoems[Math.floor(Math.random() * selectedPoems.length)];
            if (!randomPoems.includes(randomPoem)) {
                randomPoems.push(randomPoem);
            }
        }
        res.json(randomPoems);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
