import express from 'express';

const app = express();

app.get('/users', (req, res) => {
   return res.send('opa');
});

app.listen(3333);
