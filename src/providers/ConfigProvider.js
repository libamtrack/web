import readData from "./DataProvider.js";

async function parseJSON(jsonFile) {
    const json = await readData(jsonFile);

    return JSON.parse(json);
}

export default async function getConfigurationFromJSON(jsonPath) {
    return parseJSON((window.location.href.includes("localhost") ? "/" : "/LibamtrackWeb/") + jsonPath)
        .catch(e => e.console.error(e));
}