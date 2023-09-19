// server.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());


const DATA_FILE_PATH = './data.json';

// Load data from JSON file
let data;
try {
  const jsonData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
  data = JSON.parse(jsonData);
} catch (error) {
  data = [];
}

const saveDataToFile = () => {
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(data, null, 2));
  };


// Function to calculate highest alphabet
const calculateHighestAlphabet = (alphabets) => {
    return alphabets.reduce((highest, current) => {
      return current > highest ? current : highest;
    }, 'A');
  };
  
  // POST endpoint
  app.post('/bfhl', (req, res) => {
    const { data: requestData } = req.body;
  
    const numbers = requestData.filter(item => !isNaN(item));
    const alphabets = requestData.filter(item => /^[a-zA-Z]$/.test(item));
  
    const highest_alphabet = calculateHighestAlphabet(alphabets);
  
    const response = {
      is_success: true,
      user_id: 'riddhishwar_S_11092002',
      email: 'riddhishwar.s2020@vitstudent.ac.in',
      roll_number: '20BDS0001',
      numbers,
      alphabets,
      highest_alphabet: highest_alphabet ? [highest_alphabet] : []
    };
  
    data.push(response);
    saveDataToFile();  // Save the data to the file
  
    res.json(response);
  });

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({
      operation_code: 1
    });
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});