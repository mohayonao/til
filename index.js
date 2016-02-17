"use strict";

const fs = require("fs");
const path = require("path");

function directoryOnly(filename) {
  return !/^\.\w+$/.test(filename) && fs.statSync(filename).isDirectory();
}

function markdownOnly(filename) {
  return /\.md$/.test(filename);
}

function getTitle(filepath) {
  return fs.readFileSync(filepath).toString().trim().split("\n")[0].replace(/^#\s*/, "");
}

const ReadMeHeader = `
# Today I Learned

A collection of knowledge that I learn day to day.

---

### Categories

$$CATEGORIES

---

`;

const ReadMeFooter = `
### License
MIT
`;

let categories = [];
let tilCount = 0;
let readMe = "";

readMe += ReadMeHeader;

fs.readdirSync(__dirname).filter(directoryOnly).sort().forEach((category) => {
  categories.push(`* [${ category }](#${ category.toLowerCase() })`);

  readMe += `### ${ category }\n\n`;
  fs.readdirSync(path.join(__dirname, category)).filter(markdownOnly).sort().forEach((filename) => {
    const title = getTitle(path.join(__dirname, category, filename));

    readMe += `  - [${ title }](${ category }/${ filename })\n`;

    tilCount += 1;
  });

  readMe += "\n";
});

readMe += ReadMeFooter;

readMe = readMe.replace("$$TIL_COUNT", tilCount);
readMe = readMe.replace("$$CATEGORIES", categories.join("\n"));
readMe = readMe.trimLeft();

fs.writeFileSync(path.join(__dirname, "README.md"), readMe);
