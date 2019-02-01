const Axios = require("axios");
let dataStore = {};

function store(symbol, live, callback) {
    console.log('dataStore:', dataStore);
    if (Object.keys(dataStore).length === 0 || live === "true") {
        Axios("https://api.coindesk.com/v1/bpi/historical/close.json")
            .then(res => {

                dataStore = res.data.bpi;
                callback(null, dataStore);
            })
            .catch(err => {
                console.log(err);
                callback(err);
            });
    } else {
        callback(null, dataStore);
    }
}

module.exports = {
    store
}