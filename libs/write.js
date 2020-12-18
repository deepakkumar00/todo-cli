// write 'data' to the file provided by 'filePath'

const fs = require('fs');
const json = require('./json');

module.exports = {
    toFile: (filePath, data) => {
        var todo = json.getJSON(filePath);                  // get JSON format of content
        todo.tasks.push(data);                              // add new content
        fs.writeFileSync(filePath, JSON.stringify(todo));   // write updated content to provided file
    }

}