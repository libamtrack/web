export function prepareDataToSave(dataSeries, functionName) {
    let result = "#" + functionName + "\n";
    for (let i = 0; i < dataSeries.length; i++) {
        result += prepareSingleDataToSave(dataSeries[i]);
    }

    return result;
}

export function prepareSingleDataToSave(dataSeries) {
    let prepared = "#" + dataSeries.name + "\n";
    prepared += "\"x\"" + ",\"y\"" + "\n";
    for (let i = 0; i < dataSeries.x.length; i++) {
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

    return (
        {
            lin: linspace(start, end, pointsNo),
            log: logspace(Math.log10(start), Math.log10(end), pointsNo)
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