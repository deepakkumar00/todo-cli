// Deletes task from 'todo.txt'

const fs = require('fs')
const json = require('./json');

module.exports = {
    task: (file, num) => {
        var delIndex = num - 1;                                                           // get index of task to be deleted
        var deleteFrom = json.getJSON(file);                                              // get data in JSON from which to delete

        if(num > deleteFrom.tasks.length || num <= 0)                                     // if provided data is not present raise error
        {
            console.log(`\x1b[91mError: todo #${num} does not exist. Nothing deleted.\x1b[0m`);
            return
        }
        
        deleteFrom.tasks.splice(delIndex,1)                                               // remove task from file (todo.txt)
        fs.writeFileSync(file, JSON.stringify(deleteFrom));                               // update the file  (todo.txt)
        console.log(`\x1b[32mDeleted todo #${num}\x1b[0m`);
    }
}