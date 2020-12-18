/*
    Marks task as done.
    Removes task from 'todo.txt'
    Add same task to 'done.txt'
*/

const fs = require('fs')
const json = require('./json');
const write = require('./write')

module.exports = {
    task: (todo, done, num) => {
        var doneIndex = num - 1;                                                    // get index of task to be marked
        var taskjson = json.getJSON(todo);                                          // get data in JSON format

        if(num > taskjson.tasks.length || num <= 0)                                // if provided data is not present raise error
        {
            console.log(`\x1b[91mError: todo #${num} does not exist.\x1b[0m`);
            return;
        }

        var taskdone = taskjson.tasks.splice(doneIndex,1);                          // remove task from file (todo.txt)
        fs.writeFileSync(todo, JSON.stringify(taskjson));                           // update file (todo.txt)

        var date = new Date();                                                      // Get current Date
        var donedata = `x ${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${taskdone}`;        // prepare data to write to file (done.txt)
        write.toFile(done, donedata);                                                                  // write to file (done.txt)
        console.log(`\x1b[32mMarked todo #${num} as done.\x1b[0m`)
    }
}
