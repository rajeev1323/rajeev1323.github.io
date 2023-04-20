import express from 'express';
import path, { dirname } from 'path';

const app = express();

app.use(express.static('public'));

app.use('/scan', (req, res) => {
    res.sendFile(path.join(path.resolve(), '/index.html'));
});

app.use('/redeem', (req, res) => {
    res.sendFile(path.join(path.resolve(), '/redeem.html'));
});

app.use('/thankyou', (req, res) => {
    res.sendFile(path.join(path.resolve(), '/thankyou.html'));
});

let port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Started on port: ${port}`);
});
