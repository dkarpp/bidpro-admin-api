const fs = require("fs");
const path = require("path");

module.exports = {
  getJSON: (filePath) => {
    const fullPath = path.join(__dirname, filePath);

    const json = fs.readFileSync(fullPath);

    return JSON.parse(json);
  },
};
