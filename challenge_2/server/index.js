const express = require("express");
const app = express();
const port = 3000;
const store = require('./store/store.js')

app.use(express.static('public'))

app.get("/price", (req, res) => {
    store.store(req.query.symbol, req.query.live, (err, data) => {
        res.send(JSON.stringify(data));
    });
});

app.listen(port, () => {
    console.log("Listening on port 3000.");
});

//Run app, then load http://localhost:port in a browser to see the output.