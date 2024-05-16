import * as fs from 'fs';

export interface Employee {
  id: number;
  name: string;
  surname: string;
}
export interface Department {
  id: string;
  name: string;
}

export interface Statement {
  id: string;
  amount: string;
  date: string;
}

export interface Donation {
  id: number;
  date: string;
  amount: number;
}
export interface Rate {
  value: string;
  date: string;
  sign: string;
}
export interface Data {
  Employee: Employee[];
  Department: Department[];
  Statement: Statement[];
  Donation?: Donation[];
}
enum ELines {
  Rates = 'Rates',
}
const isUpperFirstLetter = (line: string): boolean => {
  if (line?.length <= 0) return true;
  return line[0] == line[0].toUpperCase()[0];
};

const isNewEmployer = (line: string): boolean => {
  return line[0] == ' ' && line[1] == ' ' && line[2] !== ' ';
};

const getKeyAndValue = (line: string) => {
  const [key, value] = line.split(':');
  return [key.trim(), value.trim()];
};

const createArrayToStore = (
  data: {},
  currentEmployeer: number,
  lastKey: string,
  line: string,
) => {
  if (!Array.isArray(data[currentEmployeer][lastKey || line])) {
    data[currentEmployeer][lastKey || line] = [];
  }
};
const parseRates = (line: string, rates: Rate[], rate: Rate | {}) => {
  if (isUpperFirstLetter(line)) {
    let ratesRef = { ...rate } as Rate;
    rates.push(ratesRef);
    rate = {};
  } else {
    const [key, value] = getKeyAndValue(line);
    rate[key] = value;
  }
};
export const parseData = (): Promise<{
  data: { [key: number]: Data | {} };
  rates: Rate[];
}> => {
  const fileStream = fs.createReadStream('dump.txt', { encoding: 'utf8' });

  return new Promise((resolve) => {
    let object: Partial<Data> = {};
    let data: { [key: number]: Data | {} } = {};
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
        if (line.length <= 0) continue;
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
          } catch (e) {
            data[currentEmployeer] = {};
            createArrayToStore(data, currentEmployeer, lastKey, line);
          }
          data[currentEmployeer][lastKey || line].push(object);
          lastKey = line;
          object = {};
          if (isNewEmployer(lines[i])) {
            currentEmployeer++;
          }
        } else {
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
