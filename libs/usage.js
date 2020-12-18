// Provides help and commands to work with todo cli

module.exports = {
    Usage: () => {
        // usage text with some formatting
        const usage = '\x1b[34mUsage :-\n$ ./todo add "todo item"  # Add a new todo\n$ ./todo ls               # Show remaining todos\n$ ./todo del NUMBER       # Delete a todo\n$ ./todo done NUMBER      # Complete a todo\n$ ./todo help             # Show usage\n$ ./todo report           # Statistics\x1b[0m';
	    console.log(usage);
    }
}
