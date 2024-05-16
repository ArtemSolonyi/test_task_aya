"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseData = void 0;
const fs = require("fs");
var ELines;
(function (ELines) {
    ELines["Rates"] = "Rates";
})(ELines || (ELines = {}));
const isUpperFirstLetter = (line) => {
    if (line?.length <= 0)
        return true;
    return line[0] == line[0].toUpperCase()[0];
};
const isNewEmployer = (line) => {
    return line[0] == ' ' && line[1] == ' ' && line[2] !== ' ';
};
const getKeyAndValue = (line) => {
    const [key, value] = line.split(':');
    return [key.trim(), value.trim()];
};
const createArrayToStore = (data, currentEmployeer, lastKey, line) => {
    if (!Array.isArray(data[currentEmployeer][lastKey || line])) {
        data[currentEmployeer][lastKey || line] = [];
    }
};
const parseRates = (line, rates, rate) => {
    if (isUpperFirstLetter(line)) {
        let ratesRef = { ...rate };
        rates.push(ratesRef);
        rate = {};
    }
    else {
        const [key, value] = getKeyAndValue(line);
        rate[key] = value;
    }
};
const parseData = () => {
    const fileStream = fs.createReadStream('dump.txt', { encoding: 'utf8' });
    return new Promise((resolve) => {
        let object = {};
        let data = {};
        let lastKey = null;
        let currentEmployeer = 0;
        let currentLine = '';
        let rate = {};
        let rates = [];
        let wasSplitOnRates = false;
        fileStream.on('data', (chunk) => {
            const lines = (currentLine + chunk).split('\n');
            currentLine = lines[lines.length - 1];
            let linesLength = lines.length;
            for (let i = 0; i < linesLength; i++) {
                const line = lines[i].trim();
                if (line.length <= 0)
                    continue;
                if (wasSplitOnRates) {
                    parseRates(line, rates, rate);
                    continue;
                }
                if (isUpperFirstLetter(line)) {
                    if (line == ELines.Rates) {
                        wasSplitOnRates = true;
                        continue;
                    }
                    try {
                        createArrayToStore(data, currentEmployeer, lastKey, line);
                    }
                    catch (e) {
                        data[currentEmployeer] = {};
                        createArrayToStore(data, currentEmployeer, lastKey, line);
                    }
                    data[currentEmployeer][lastKey || line].push(object);
                    lastKey = line;
                    object = {};
                    if (isNewEmployer(lines[i])) {
                        currentEmployeer++;
                    }
                }
                else {
                    const [key, value] = getKeyAndValue(line);
                    object[key] = value;
                }
            }
            data[currentEmployeer][lastKey].push(object);
        });
        fileStream.on('end', () => {
            rates[0] = rate;
            return resolve({ data, rates });
        });
    });
};
exports.parseData = parseData;
//# sourceMappingURL=parse.data.js.map