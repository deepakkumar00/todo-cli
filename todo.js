const fs = require('fs');
const touch = require('touch');

//constants to create files
const currentDirectory = process.cwd();
const fileToAdd = currentDirectory + "/todo.txt";
const fileDone = currentDirectory + "/done.txt";

const initialData = {
    tasks: []
}

//create file if it isn't present.
function init(){
	if(!fs.existsSync(fileToAdd)){
        touch('todo.txt');
        fs.writeFileSync(fileToAdd, JSON.stringify(initialData));
    }
    if(!fs.existsSync(fileDone)){
        touch('done.txt');
        fs.writeFileSync(fileDone, JSON.stringify(initialData));
	}
}

function getJSON(fromFile){
    var content = fs.readFileSync(fromFile);
    return JSON.parse(content.toString());
}

function writeToFile(fileName, data) {
    var json = getJSON(fileName);
    json.tasks.push(data);
    fs.writeFileSync(fileName, JSON.stringify(json));
}


//display usage
function usage() {
    var usage =
    `Usage :-
    $ ./todo add "todo item"  # Add a new todo
    $ ./todo ls               # Show remaining todos
    $ ./todo del NUMBER       # Delete a todo
    $ ./todo done NUMBER      # Complete a todo
    $ ./todo help             # Show usage
    $ ./todo report           # Statistics`;

	console.log(usage);
}

function add(file, task){
    writeToFile(file, task);
    console.log(`Added todo: "${task}"`);
}

function list() {
    var taskjson = getJSON(fileToAdd);
    var taskList = taskjson.tasks;
    var i = taskList.length - 1;
    for(;i >= 0; i--)
    {
        console.log(`[${i+1}] ${taskList[i]}`);
    }
    
}

function del(num){
    var delIndex = parseInt(num) - 1;
    var deleteFrom = getJSON(fileToAdd);
    if(parseInt(num) > deleteFrom.tasks.length)
    {
        console.log(`Error: todo #${num} does not exist. Nothing deleted.`);
        return
    }
    deleteFrom.tasks.splice(delIndex,1)
    fs.writeFileSync(fileToAdd, JSON.stringify(deleteFrom));
    console.log(`Deleted todo #${num}`);
}

function done(num){
    var doneIndex = parseInt(num) - 1;
    var taskjson = getJSON(fileToAdd);
    if(parseInt(num) > taskjson.tasks.length)
    {
        console.log(`Error: todo #${num} does not exist.`);
        return;
    }
    var taskdone = taskjson.tasks.splice(doneIndex,1);
    fs.writeFileSync(fileToAdd, JSON.stringify(taskjson));
    var date = new Date();
    var donedata = `x ${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${taskdone}`;
    writeToFile(fileDone, donedata);
    console.log(`Marked todo #${num} as done.`)
}

function report(){
    var pending = getJSON(fileToAdd);
    var done = getJSON(fileDone);
    var date = new Date()

    console.log(`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()} Pending : ${pending.tasks.length} Completed : ${done.tasks.length}`)
}

var command = process.argv[2];
var argument = process.argv[3];

init();

switch(command){
    case undefined:
    case "help":
        usage();
        break;
    case "add":
        if(!argument)
        {
            console.log("Error: No todo provided");
            break;
        }
        add(fileToAdd, argument)
        break;
    case "ls":
        list();
        break;
    case "del":
        if(!argument)
        {
            console.log("Error: No todo provided");
            break;
        }
        del(argument);
        break;
    case "done":
        if(!argument)
        {
            console.log("Error: No todo provided");
            break;
        }
        done(argument);
        break;
    case "report":
        report()
        break;
	default:
		console.log("\x1b[91mCommand not found!!\x1b[0m");
		usage();
		break;
}