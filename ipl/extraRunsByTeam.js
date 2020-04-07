// ###################################################################
//     Function to calculate the extra runs given by teams in 2016
// #####################################################################
function extraRunsByTeam(matches, deliveries, year) {
    let result = {};
    for (let match of matches) {
        for (let delivery of deliveries) {
            let team = delivery.bowling_team;
            if (match.id === delivery.match_id && match.season === year.toString()) {
                result[team] = (result[team] || 0) + parseInt(delivery.extra_runs);
            }
        }
    }
    return result;
}

module.exports = extraRunsByTeam;
