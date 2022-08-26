// tries to optimize for the best next word

function highFinder(data) {
    let highest = 0;
    let best = "";

    for (let point of data) {
        let count = 0;
        for (let secondaryPoint of data) {
            let used = [];
            for (let tertiaryPoint of point) {
                if (secondaryPoint.includes(tertiaryPoint) && !used.includes(tertiaryPoint)) {
                    count++;
                    used.push(tertiaryPoint);
                }
            }
        }
        if (count > highest) {
            highest = count;
            best = point;
        }
    }
    return best;
}

module.exports = highFinder;