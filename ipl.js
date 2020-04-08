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
const EXTRA_RUNS_JSON_FILE_PATH = "./public/extraRuns.json";
const ECONOMICAL_BOWLER_JSON_FILE_PATH = "./public/economicalBowler.json";



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




function getEonomicalBowlers() {
    csv()
        .fromFile(MATCHES_FILE_PATH)
        .then((matches) => {
            csv()
                .fromFile(DELIVERIES_FILE_PATH)
                .then(deleveries => {

                    let economicalBowlersResult = economicalBowlers(matches, deleveries);
                    saveEconomicalBowlerData(economicalBowlersResult);
                });
        });
};


function getExtraRuns() {
    csv()
        .fromFile(MATCHES_FILE_PATH)
        .then(matches => {
            csv()
                .fromFile(DELIVERIES_FILE_PATH)
                .then(deleveries => {
                    let extraRunsResult = extraRunsByTeam(matches, deleveries);
                    saveExtraRuns(extraRunsResult);
                });
        })
}

function saveEconomicalBowlerData(data) {
    const jsonData = {
        "economicalBowlersResult": data
    }
    const jsonString = JSON.stringify(jsonData);
    fs.writeFile(ECONOMICAL_BOWLER_JSON_FILE_PATH, jsonString, "utf8", err => {
        if (err) {
            console.log(err);
        }
    })

}

function saveExtraRuns(data) {
    const jsonData = {
        "extraRunsResult": data
    }
    const jsonString = JSON.stringify(jsonData);
    fs.writeFile(EXTRA_RUNS_JSON_FILE_PATH, jsonString, "utf8", err => {
        if (err) {
            console.log(err);
        }
    })
}
getEonomicalBowlers();
getExtraRuns();
