const express = require("express");
const app = express();
const fs = require("fs");
const csv = require("csvtojson");

const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonByTeam = require("./ipl/matchesWonByTeam");
const extraRunsByTeam = require("./ipl/extraRunsByTeam");
const economicalBowlers = require("./ipl/economicalBowlers");
const mostSixes = require("./ipl/mostSixes");
const mostOutByLbw = require("./ipl/mostOutByLbw");

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_OUTPUT_FILE_PATH = "./public/data.json";

/*###########################################################
                Server Set Up
#############################################################*/
app.use(express.static(__dirname + '/public'));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server statred on ${PORT}`));


/*######################################################################
    Converting csv tp json and storing the results of business logics
##########################################################################*/
function main() {
    csv()
        .fromFile(MATCHES_FILE_PATH)
        .then((matches) => {
            csv()
                .fromFile(DELIVERIES_FILE_PATH)
                .then(deleveries => {
                    let result = matchesPlayedPerYear(matches);
                    let matchWonResult = matchesWonByTeam(matches);
                    let mostSixesResult = mostSixes(deleveries);
                    let mostOutByLbwResult = mostOutByLbw(deleveries);

                    saveMatchesResults(result, matchWonResult, mostSixesResult, mostOutByLbwResult);
                });
        });
}

/*#################################################
    Saaving data in data.json file 
###################################################*/
function saveMatchesResults(result, matchWonResult, mostSixesResult, mostOutByLbwResult) {
    const jsonData = {
        matchesPlayedPerYear: result,
        matchesWonByTeam: matchWonResult,
        mostSixes: mostSixesResult,
        mostOutByLbw: mostOutByLbwResult,
    };

    const jsonString = JSON.stringify(jsonData);
    fs.writeFile(JSON_OUTPUT_FILE_PATH, jsonString, "utf8", err => {
        if (err) {
            console.error(err);
        }
    });
}

//Calling the main function
main();


/*#################################################
    Request Route for rendering index.html  
###################################################*/
app.get("/", (request, response) => {
    response.sendFile('index.html', {
        root: __dirname + "/public"
    })
});


/*########################################################################################
    Receiving Request Route for fetch api for economical bowler for a selected year  
###########################################################################################*/
app.get("/economical-bowler", (req, res) => {
    let year = req.query.season;
    csv()
        .fromFile(MATCHES_FILE_PATH)
        .then((matches) => {
            csv()
                .fromFile(DELIVERIES_FILE_PATH)
                .then(deleveries => {
                    let economicalBowlersResult = economicalBowlers(matches, deleveries, year);
                    res.json({
                        economicalBowlersResult
                    });
                });
        });
});


/*########################################################################################
    Receiving Request Route for fetch api for extra runs by teams for a selected year  
###########################################################################################*/
app.get("/extra-runs", (req, res) => {
    let year = req.query.season;
    csv()
        .fromFile(MATCHES_FILE_PATH)
        .then((matches) => {
            csv()
                .fromFile(DELIVERIES_FILE_PATH)
                .then(deleveries => {
                    let extraRunsResult = extraRunsByTeam(matches, deleveries, year);
                    res.json({
                        extraRunsResult
                    });
                });
        });
});
