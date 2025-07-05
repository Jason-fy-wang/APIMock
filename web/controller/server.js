import fs from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.status(200).send('Welcome to the server!');
    }
);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



