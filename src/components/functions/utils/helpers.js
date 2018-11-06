export function prepareDataToSave(dataSeries, functionName){
    let result = "#" + functionName + "\n";
    for(let i=0; i<dataSeries.length; i++){
        result += prepareSingleDataToSave(dataSeries[i]);
    }

    return result;
}

export function prepareSingleDataToSave(dataSeries){
    let prepared = "#" + dataSeries.name + "\n";
    prepared += "\"x\"" + ",\"y\"" + "\n";
    for(let i=0; i<dataSeries.x.length; i++){
        prepared += "\"" + dataSeries.x[i] + "\"" + ",\"" + dataSeries.y[i] + "\"" + "\n";
    }
    return prepared;
}

export function preparePoints(start, end, pointsCount, type) {
    const linspace = require('linspace');
    const logspace = require('logspace');

    let pointsNo;
    if (type === "step") {
        pointsNo = Math.round((end - start) / pointsCount + 1);
    } else {
        pointsNo = pointsCount;
    }

    return(
        {
            lin : linspace(start, end, pointsNo),
            log : logspace(Math.log10(start), Math.log10(end), pointsNo)
        }
    );
}