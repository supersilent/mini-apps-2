const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

app.listen(port, () => {
    console.log('listening on port 3000');
});

//Run app, then load http://localhost:port in a browser to see the output.