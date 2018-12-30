const annotation = "# Provided by Libamtrack \n";

export function prepareDataToSave(dataSeries, functionName) {
    let result = annotation + getCurrentData();
    result += "# " + functionName + "\n";
    result += getAxisLabels(dataSeries);

    const forEndCond = getMaxDataSeriesLength(dataSeries);

    for (let i = 0; i < forEndCond; i++) {
        for (let j = 0; j < dataSeries.length; j++) {
            if (dataSeries[j].x.length > i) {
                result += dataSeries[j].x[i] + "," + dataSeries[j].y[i];
            } else {
                result += ",";
            }

            if (j === (dataSeries.length - 1)) {
                result += "\n";
            } else {
                result += ",";
            }
        }
    }

    return result;
}

function getAxisLabels(dataSeries) {
    let labels = "";

    for (let i = 0; i < dataSeries.length; i++) {
        labels += "\"" + dataSeries[i].name + "_x\",";
        labels += "\"" + dataSeries[i].name + "_y\"";

        if (i === (dataSeries.length - 1)) {
            labels += "\n";
        } else {
            labels += ",";
        }
    }

    return labels;
}

function getMaxDataSeriesLength(dataSeries) {
    let maxLength = 0;

    for (let i = 0; i < dataSeries.length; i++) {
        if (dataSeries[i].x.length > maxLength) {
            maxLength = dataSeries[i].x.length;
        }
    }

    return maxLength;
}

function getCurrentData() {
    var currentDate = new Date();

    return "# Generated: " + currentDate.getDate() + "/"
        + (currentDate.getMonth() + 1) + "/"
        + currentDate.getFullYear() + " @ "
        + currentDate.getHours() + ":"
        + currentDate.getMinutes() + ":"
        + currentDate.getSeconds() + "\n";
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

    let logStart = start;

    if (logStart === 0) {
        logStart = end / 10000;
    }

    return (
        {
            lin: linspace(start, end, pointsNo),
            log: logspace(Math.log10(logStart), Math.log10(end), pointsNo)
        }
    );
}

export function getDataToImport(formItems) {
    let dataJSONs = [];

    for (let i = 0; i < formItems.length; i++) {
        if (formItems[i].type === "select" && formItems[i].name && formItems[i].jsonPath) {
            dataJSONs.push({ name: formItems[i].name, path: 'static/json/' + formItems[i].jsonPath })
        }
    }
    return dataJSONs;
}

export function prepareDataToCalculate(entryName, data, formItems, parametersRules) {
    let dataToCalculate = { n: data.length };
    dataToCalculate[entryName] = data;

    for (const key in formItems) {
        if (parametersRules[key]) {
            let arr = [];
            for (let i = 0; i < data.length; i++) {
                arr.push(formItems[key]);
            }

            dataToCalculate[key] = arr;
        } else {
            dataToCalculate[key] = formItems[key];
        }
    }

    return dataToCalculate;
}

export function getDataSeriesName(dataSeriesNames, parameterName) {
    const name = parameterName;

    let counter = dataSeriesNames.length;

    return counter === 0 ? name : name + "_" + counter;
}