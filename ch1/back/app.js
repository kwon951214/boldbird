const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('안녕 백앤드');
});

app.listen(3085, () => {
    console.log();
});
