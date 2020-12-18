// Extracts JSON from given file

const fs = require('fs')

module.exports = {
    getJSON: (filePath) => {
        var content = fs.readFileSync(filePath);
        return JSON.parse(content.toString());
    }
}