const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const PORT = 5000;
const app = express();

app.use(cors());
const corsOptions = {
    origin: "http://localhost:3000"
};

const requestEndpoint = "https://api.shortboxed.com/comics/v1";

// This function runs if the http://localhost:5000/getData endpoint
// is requested with a GET request
app.get('/current', cors(corsOptions), async (req, res) => {
    try {
    const fetchOptions = {
        method: 'GET',
        headers: {
            // accept: '*/*',
            Connection: 'keep-alive'
        },
        referrerPolicy: 'same-origin'
    }
    const response = await fetch(`${requestEndpoint}/new`, fetchOptions);
    const jsonResponse = await response.json();
     res.json(jsonResponse);
    } catch (err) {
        console.log(`Error Message: ${err}`);
    }
});

app.get('/upcoming', cors(corsOptions), async (req, res) => {
    try {
    const fetchOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            accept: 'application/json, text/plain, */*',
            Connection: 'keep-alive'
        },
        referrerPolicy: 'no-referrer'
    }
    const response = await fetch(`${requestEndpoint}/future`, fetchOptions);
    const jsonResponse = await response.json();
     res.json(jsonResponse);
    } catch (err) {
        console.log(`Error Message: ${err}`);
    }
});

app.listen(PORT, () => {
    console.log(`Proxy app listening at http://localhost:${PORT}`);
});
