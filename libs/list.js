// Lists all the incomplete tasks
// Reads task from 'todo.txt' provided as file.

const json = require('./json');

module.exports = {
    task: (file) => {
        var taskjson = json.getJSON(file);          // get JSON format from file
        var taskList = taskjson.tasks;              // gets list of all the tasks

        if(taskList.length === 0)                   // if no task present
        {
            console.log("\x1b[34mThere are no pending todos!\x1b[0m")
            return;
        }

        for(var i = taskList.length - 1; i >= 0; i--)                           // loop through tasks list and print each task
        {
            console.log(`[${i+1}] ${taskList[i]}`);
        }
    }
}