const express = require("express");
const app = express();
const economyJson = require("./public/economicalBowler.json");
const extraRunJson = require("./public/extraRuns.json");


app.use(express.static(__dirname + '/public'));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server statred on ${PORT}`));


app.get("/", (request, response) => {
    response.sendFile('index.html', {
        root: __dirname + "/public"
    })
});

app.get("/economical-bowler", (req, res) => {
    let year = req.query.season;
    let key = Object.keys(economyJson);
    res.json(economyJson[key][year]);
});

app.get("/extra-runs", (req, res) => {
    let year = req.query.season;
    let key = Object.keys(extraRunJson);
    res.json(extraRunJson[key][year]);
});
