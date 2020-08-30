const inquirer = require("inquirer");
const fs = require("fs");

const main = async () => {
  const questions = [
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
        'GNU AGPLv3',
        'Apache',
        'MIT',
        'Boost Software License'
      ]
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

const createTitleSection = (title) => {
  return stringToMarkdownHeading1(title);
}

const createTableOfContents = () => {
  return [
    stringToMarkdownHeading2("TABLE OF CONTENTS"),
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
    ...createTableOfContents(),
  ].join("\n\n");
}

const markdownToFile = (fileName, data) => {
  fs.writeFileSync(fileName, data, (error, file) => {
    console.error(`could not write to file ${file} because ${error}`)
  });
};

main();