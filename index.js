const inquirer = require("inquirer");
const fs = require("fs");

// array of objects with prompt questions

const main = async () => {
  const questions = [
    {
      type: "string",
      name: "username",
      message: "What is your GitHub username?",
    },
    {
      type: "string",
      name: "email",
      message: "What is your email?",
    },
    {
      type: "string",
      name: "url",
      message: "What is the URL of your project?",
    },
    {
      type: "string",
      name: "title",
      message: "What is the title of your project?",
    },
    {
      type: "string",
      name: "description",
      message: "What is the description of your project?",
    },
    {
      type: "list",
      name: "license",
      message: "What kind of license should your project have?",
      choices: [
        'MIT',
        'APACHE 2.0',
        'GPL 3.0',
        'BSD 3',
        'None'
      ]
    },
    {
      type: "string",
      name: "command",
      message: "What command should be run to install dependencies?",
    },
    {
      type: "string",
      name: "usage",
      message: "What does the user need to know about using the repo?",
    },
    {
      type: "string",
      name: "contribute",
      message: "What does the user need to know about contributing to the repo?",
    },
    {
      type: "string",
      name: "tests",
      message: "What command should be run to run tests?",
    },
  ];

  const answers = mapToMarkdown(await inquirer.prompt(questions));
  markdownToFile('READMEsample.md', answers);
};

//functions to setup readme markup

const stringToMarkdownHeading1 = (value) => {
  return "# " + value;
};

const stringToMarkdownHeading2 = (value) => {
  return `## ${value}`;
};

const createMarkdownURL = (name, url)  => {
  return `[${name}](${url})`
} 

const createMarkdownListItem = (value) => {
  return `* ${value}`
}

const createMarkdownString = (value) => {
  return `${value}`
}

const badgeMarkup = (name, img, url) => {
  return `[![${name}](${img})](${url})`
}

const createTitleSection = (title) => {
  return stringToMarkdownHeading1(title);
}

const createTableOfContents = () => {
  return [
    stringToMarkdownHeading2("Table of Contents"),
    createMarkdownListItem(createMarkdownURL("Installation", "#Installation")),
    createMarkdownListItem(createMarkdownURL("Usage", "#Usage")),
    createMarkdownListItem(createMarkdownURL("License", "#License")),
    createMarkdownListItem(createMarkdownURL("Contributing", "#Contributing")),
    createMarkdownListItem(createMarkdownURL("Tests", "#Tests")),
    createMarkdownListItem(createMarkdownURL("Questions", "#Questions"))
  ]
}

const createLicenseBadges = (answers) => {
  if (answers.license === "MIT") {
    return badgeMarkup("License: MIT", "https://img.shields.io/badge/License-MIT-yellow.svg", "https://opensource.org/licenses/MIT")
  } else if (answers.license === "APACHE 2.0") {
    return badgeMarkup("License", "https://img.shields.io/badge/License-Apache%202.0-blue.svg", "https://opensource.org/licenses/Apache-2.0")
  } else if (answers.license === "GPL 3.0") {
    return badgeMarkup("License: GPL v3", "https://img.shields.io/badge/License-GPLv3-blue.svg", "https://www.gnu.org/licenses/gpl-3.0")
  } else if (answers.license === "BSD 3") {
    return badgeMarkup("License", "https://img.shields.io/badge/License-BSD%203--Clause-blue.svg", "https://opensource.org/licenses/BSD-3-Clause")
  } else {
    return ("")
  }
}

//function to take in markup functions with user input values

const mapToMarkdown = (answers) => {
  return [
    createTitleSection(answers.title),
    createLicenseBadges(answers),
    stringToMarkdownHeading2("Description"),
    createMarkdownString(answers.description),
    ...createTableOfContents(),
    stringToMarkdownHeading2("Installation"),
    createMarkdownString("To install necessary dependencies, run the following command:" +  "\n" + "````" + "\n" + (answers.command) + "\n" + "````"),
    stringToMarkdownHeading2("Usage"),
    createMarkdownString(answers.usage),
    stringToMarkdownHeading2("License"),
    createMarkdownString(`This project is licensed under the ${answers.license} license.`),
    stringToMarkdownHeading2("Contributing"),
    createMarkdownString(answers.contribute),
    stringToMarkdownHeading2("Tests"),
    createMarkdownString("To run tests, run the following command:" +  "\n" + "````" + "\n" + (answers.tests) + "\n" + "````"),
    stringToMarkdownHeading2("Questions"),
    createMarkdownString(`If you have any questions about the repo, open an issue or contact [${answers.username}] directly at ${answers.email}.`),
  ].join("\n\n");
}

// function that generates .md file

const markdownToFile = (fileName, data) => {
  fs.writeFileSync(fileName, data, (error, file) => {
    console.error(`could not write to file ${file} because ${error}`)
  });
};

main();