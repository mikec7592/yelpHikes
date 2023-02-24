const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Greetings!')
}); 

const PORT = 3000

app.listen(PORT, () => {
    console.log ('running on port ' + PORT)
}); 