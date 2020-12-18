// Provides stats to all the todo's and completed task

const json = require('./json');

module.exports = {
    stats: (todo, done) => {
        var pending = (json.getJSON(todo)).tasks.length;            // get pending tasks
        var marked = (json.getJSON(done)).tasks.length;             // get done tasks
        var date = new Date();                                      // get current date
        var isodate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;           // convert date to iso format
        console.log(`\x1b[34m${isodate} Pending : ${pending} Completed : ${marked}\x1b[0m`)     // print report
    }
}