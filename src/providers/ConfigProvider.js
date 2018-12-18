import readData from "./DataProvider.js";
import packageJson from '../../package.json';

async function parseJSON(jsonFile) {
    const json = await readData(jsonFile);

    return JSON.parse(json);
}

export default async function getConfigurationFromJSON(jsonPath) {
    return parseJSON((window.location.href.includes("localhost") ? "/" : packageJson.homepage) + "/" + jsonPath)
        .catch(e => e.console.error(e));
}