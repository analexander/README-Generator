const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const generateMarkdown = require("./utils/generateMarkdown");

const writeFileAsync = util.promisify(fs.writeFile);

// array of questions for user
const questions = [

];

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {
    console.log("hi")
  try {
    const answers = await promptUser();

    const readMe = generateMarkdown(answers);

    await writeFileAsync("README.md", readMe);

    console.log("Successfully wrote to README.md");
  } catch(err) {
    console.log(err);
  }
}

// function call to initialize program
init();
