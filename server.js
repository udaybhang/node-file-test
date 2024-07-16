const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;


app.use(express.json());

app.post('/number', (req, res) => {
    const files = ['fileA.txt', 'fileB.txt', 'fileC.txt', 'fileD.txt'];

  const number = req.body.number;

  if (number < 1 || number > 25) {
    return res.status(400).json({ error: 'Number must be between 1 and 25' });
  }

  const multipliedNumber = number * 7;
  let fileName = '';
    // Check if process is complete
    if (checkAllFiles()) {
        allNumbersProcessed = true;
        const fileContents = {};
        files.forEach(file => {
            const filePath = path.join(__dirname, file);
            fileContents[file] = fs.readFileSync(filePath, 'utf-8').split('\n').filter(line => line !== '');
        });
    res.json({
        message:'List content of all files.',
        data:fileContents
    });
      }
  if (multipliedNumber > 140) {
    fileName = 'fileA.txt'
    fs.appendFileSync('fileA.txt', multipliedNumber + '\n');
  }
 else if (multipliedNumber > 100) {
    fileName = 'fileB.txt'
    fs.appendFileSync('fileB.txt', multipliedNumber + '\n');
  }
  else if (multipliedNumber > 60) {
    fileName = 'fileC.txt'
    fs.appendFileSync('fileC.txt', multipliedNumber + '\n');
  } else {
    fileName = 'fileD.txt'
    fs.appendFileSync('fileD.txt', multipliedNumber + '\n');
  }

  res.json({ message: `${fileName} got successfully` });
});

function checkAllFiles() {
    try {
        const files = ['fileA.txt', 'fileB.txt', 'fileC.txt', 'fileD.txt'];
        return files.every(file => {
            const stats = fs.statSync(file);
            return stats.isFile() && stats.size > 0;
        });
    } catch (error) {
        return false;  
    }
  }
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});