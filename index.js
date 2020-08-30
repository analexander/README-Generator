const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user
const questions = [
  {
    type: "input",
    name: "github",
    message: "What is your GitHub username?"
  },
  {
    type: "input",
    name: "email",
    message: "What is your email?"
  }

];

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {
    console.log("hi")
  try {
    const answers = await promptUser();

    const readMe = generateMarkdown(questions);

    await writeFileAsync("README.md", readMe);

    console.log("Successfully wrote to README.md");
  } catch(err) {
    console.log(err);
  }
}

// function call to initialize program
init();
