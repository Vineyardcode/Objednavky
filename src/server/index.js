import express from 'express';
import axios from 'axios';
import cors from 'cors';

const index = express();
const port = process.env.PORT || 3000;

const config = {
  host: 'https://demo.flexibee.eu',
  firma: 'demo',
  username: 'winstrom',
  password: 'winstrom'
};

index.use(

  cors({
    origin: 'http://localhost:5173', 
    methods: 'GET', 
  })
);

index.get('/', async (req, res) => {

  try {
    const flexibeeURL = `${config.host}/c/${config.firma}/faktura-vydana.json?detail=full`;

    const response = await axios.get(flexibeeURL, {
      auth: {
        username: config.username,
        password: config.password,
      },
    });

    const jsonData = response.data;
    res.json(jsonData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

index.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
