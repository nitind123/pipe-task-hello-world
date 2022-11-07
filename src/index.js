const tasks = require("jfrog-pipelines-tasks");
const path = require("path");
const fs = require("fs");
const os = require("os");

function main() {
  // Read and validate task input
  const nameInput = tasks.getInput("name");
  if (nameInput == "") {
    tasks.error("name input cannot be empty");
    return process.exit(1);
  }

  // Compute greeting message
  const greeting = "Hello " + nameInput + "!";
  tasks.info(greeting);

  // Create greeting file at current working directory
  const pathToFile = path.join(tasks.getWorkingDir(), "greeting.txt");
  fs.writeFileSync(pathToFile, greeting + os.EOL);

  // Export environment variable containing path to greeting file
  tasks.exportEnvironmentVariable("GREETING_FILE", pathToFile);

  // Save path to file to task state
  tasks.setState("pathToFile", pathToFile);

  // Set greeting message as task output
  tasks.setOutput("greeting", greeting);
}

function cleanup() {
  // Remove greeting file if exists
  const pathToFile = tasks.getState("pathToFile");
  if (pathToFile && fs.existsSync(pathToFile)) {
    tasks.info(`Deleting greetings file at ${pathToFile}`);
    fs.unlinkSync(pathToFile);
  } else {
    tasks.info(`Greetings file not found. Skipping...`);
  }
}

// Parse command arguments
if (process.argv.length !== 3) {
  tasks.error("USAGE: node index.js COMMAND");
  return process.exit(1);
}
const command = process.argv[2];

// Run task command
switch (command) {
  case "main":
    return main();
  case "cleanup":
    return cleanup();
  default:
    tasks.error("Command not supported: " + command);
}

