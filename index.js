const fs = require('fs');

const data = fs.readFileSync('./countries.txt', {encoding:'utf8', flag:'r'});

let separateCountriesListByLines = data.split(/\r?\n/);
separateCountriesListByLines.shift();

let  separateCountryData = separateCountriesListByLines.map(function (country) { return country.split(" "); });

const regex = /^([^0-9]*)$/;

let calculateDensity = separateCountryData.map(function (country) {
    let name = "";
    let data = [];
    let density;
    for (var i = 0; i < country.length; i++) {
        if (regex.test(country[i])) {
          name = name.concat(country[i] + " ");
        }
        else if (!regex.test(country[i])) {
          data.push(parseFloat(country[i].replace(/,/g, "")));
        }
    }
    for (let i = 0; i < data.length; i++) {
      if (data[1] != undefined || data[1] != 0 || data[2] == undefined)
      density = (data[0] / data [1]).toFixed(2);
    }
    return {
        name: name.trim(),
        population: data[0],
        area: data[1],
        density: density
    };
});
let sortByDensity = calculateDensity.sort(function (a, b) { return b.density - a.density; });

const createCSV = "Countrt, Population, Area, Density" +
    "\r\n" +
    sortByDensity.map(function (c) {
        return "\r\n".concat(c.name, ", ").concat(c.population, ", ").concat(c.area, ", ").concat(c.density);
    });
fs.writeFileSync("countries.csv", createCSV);