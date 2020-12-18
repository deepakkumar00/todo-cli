#!/usr/bin/env node

//  importing all required modules.
// All the local modules are present in "libs" directory

const fs = require('fs');
const touch = require('touch');
const usage = require('./libs/usage');
const add = require('./libs/add');
const list = require('./libs/list');
const del = require('./libs/delete');
const done = require('./libs/done');
const report = require('./libs/report');

const currentDirectory = process.cwd();                 //  get the current working directory
const fileToAdd = currentDirectory + "/todo.txt";       //  creating path to add todo.txt 
const fileDone = currentDirectory + "/done.txt";        //  creating path to add done.txt

const initialData = { tasks: [] };

//  create file in current directory if it isn't present.
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

// get the command line arguments
var command = process.argv[2];
var argument = process.argv[3];

//initialise file creation
init();

//  Driver Code to Pick command line choices
switch(command){

    case undefined:
    case "help":
        usage.Usage();          // Displays usage of todo cli 
        break;

    // to add task
    case "add":
        if(!argument)           // if no task provided to add
        {
            console.log("\x1b[91mError: Missing todo string. Nothing added!\x1b[0m");           
            break;
        }
        add.task(fileToAdd, argument)           // adds task to todo.txt and displays message
        break;

    // to list tasks
    case "ls":
        list.task(fileToAdd);
        break;

    // to delete task
    case "del":
        if(!argument)           // if no task number provided to delete
        {
            console.log("\x1b[91mError: Missing NUMBER for deleting todo.\x1b[0m");
            break;
        }
        del.task(fileToAdd, parseInt(argument));    // deletes provided task
        break;
    
    // mark task as done
    case "done":
        if(!argument)           // if no task provided to mark
        {
            console.log("\x1b[91mError: Missing NUMBER for marking todo as done.\x1b[0m");
            break;
        }
        done.task(fileToAdd, fileDone, parseInt(argument));        // to mark done
        break;

    // generate reports
    case "report":
        report.stats(fileToAdd, fileDone) 
        break;

    // if invalid command proveded
	default:
		console.log("\x1b[91mCommand not found!!\x1b[0m");
		usage();
		break;
}