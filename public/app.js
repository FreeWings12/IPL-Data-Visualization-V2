function fetchAndVisualizeData() {
    fetch("./data.json")
        .then(r => r.json())
        .then(visualizeData);
}

fetchAndVisualizeData();

function visualizeData(data) {
    visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);
    visualizeMatchesWonByTeam(data.matchesWonByTeam);
    visualizeMostSixesHitters(data.mostSixes);
    visualizeMostOutByLbw(data.mostOutByLbw);
    return;
}


const extraRunsConcededBtn = document.getElementById("extra-runs-conceded-btn");
const extraRunsConcededYear = document.getElementById(
    "extra-runs-conceded-year-input"
);

const economicalBowlerBtn = document.getElementById("economical-bowler-btn");
const economicalBowlerYear = document.getElementById(
    "economical-bowler-year-input"
);

extraRunsEvent(extraRunsConcededBtn, extraRunsConcededYear);
economicalBowlerEvent(economicalBowlerBtn, economicalBowlerYear);

function economicalBowlerEvent(button, year) {
    button.addEventListener("click", () => {
        fetch(`/economical-bowler?season=${year.value}`)
            .then(data => data.json())
            .then(visualizeEconomicalBowlers)
            .catch(err => console.log(err));
    });
}

function extraRunsEvent(button, year) {
    button.addEventListener("click", () => {
        fetch(`/extra-runs?season=${year.value}`)
            .then(data => data.json())
            .then(d => visualizeExtraRunsByTeam(d))
            .catch(err => console.log(err));
    });
}
