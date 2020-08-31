const inquirer = require("inquirer");
const fs = require("fs");

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
  markdownToFile('READMETEST.md', answers);
};

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

const mapToMarkdown = (answers) => {
  return [
    createTitleSection(answers.title),
    stringToMarkdownHeading2("Description"),
    createMarkdownString(answers.description),
    ...createTableOfContents(),
    stringToMarkdownHeading2("Installation"),
    createMarkdownString(`To install necessary dependencies, run the following command: \n ${answers.command}`),
    stringToMarkdownHeading2("Usage"),
    createMarkdownString(answers.usage),
    stringToMarkdownHeading2("License"),
    createMarkdownString(`This project is licensed under the ${answers.license} license.`),
    stringToMarkdownHeading2("Contributing"),
    createMarkdownString(answers.contribute),
    stringToMarkdownHeading2("Tests"),
    createMarkdownString(`To run tests, run the following command: \n ${answers.tests}`),
    stringToMarkdownHeading2("Questions"),
    createMarkdownString(`If you have any questions about the repo, open an issue or contact [${answers.username}] directly at ${answers.email}.`),
  ].join("\n\n");
}

const markdownToFile = (fileName, data) => {
  fs.writeFileSync(fileName, data, (error, file) => {
    console.error(`could not write to file ${file} because ${error}`)
  });
};

main();