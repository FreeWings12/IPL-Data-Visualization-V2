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
