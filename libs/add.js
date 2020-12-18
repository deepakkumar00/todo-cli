// Adds task to 'todo.txt'

const write = require('./write')

module.exports = {
    task: (toFile, tasks) => {
        write.toFile(toFile, tasks);
        console.log(`\x1b[32mAdded todo: "${tasks}"\x1b[0m`);
    }
}