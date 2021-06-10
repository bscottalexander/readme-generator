import { open } from "fs/promises";
import inquirer from "inquirer";

const questions = [
  {
    type: "input",
    name: "title",
    message: "What's the name of your application?",
  },
  {
    type: "input",
    name: "description",
    message: "Describe your application?",
  },
  {
    type: "input",
    name: "installation",
    message: "What are the installation instructions?",
  },
  {
    type: "input",
    name: "usage",
    message: "Please provide usage information",
  },
  {
    type: "input",
    name: "contribution_guidelines",
    message: "Please provide contribution guidelines",
  },
  {
    type: "input",
    name: "test_instructions",
    message: "Please provide test instructions",
  },
  {
    type: "list",
    name: "license",
    message: "What kind of license should your project have?",
    choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"],
  },
  {
    type: "input",
    name: "username",
    message: "What is your GitHub username?",
  },
  {
    type: "input",
    name: "email_address",
    message: "What is your email address?",
  },
];

const createLicenseBadgeText = (license) => {
  if (license === "MIT") {
    return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
  } else if (license === "GPL 3.0") {
    return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
  } else if (license === "APACHE 2.0") {
    return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
  } else if (license === "BSD 3") {
    return "[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)";
  } else if (license === "None") return "";
};

const createTitleText = (title) => {
  return `# ${title}`;
};

const createDescriptionText = (description) => {
  return `## ${description}`;
};

const createInstallationText = (installation) => {
  return [`## Installation`, installation].join("\n");
};

const createUsageText = (usage) => {
  return [`## Usage`, usage].join("\n");
};

const createContributionText = (contribution_guidelines) => {
  return [`## Contribution Guidelines`, contribution_guidelines].join("\n");
};

const createTestText = (test_instructions) => {
  return [`## Test`, test_instructions].join("\n");
};

const createQuestionText = (username, email) => {
  return [
    `## Questions`,
    `If you have any questions about the repo, open an issue or contact ${username} directly at ${email}.`,
  ].join("\n");
};

const createTableOfContents = () => {
  return [
    `## Table of Contents`,
    `* [Installation](#Installation)`,
    `* [Usage](#Usage)`,
    `* [Contribution](#Contribution)`,
    `* [Test](#Test)`,
    `* [Question](#Question)`,
  ].join("\n");
};

const createMarkDownFile = async (fileHandle, answers) => {
  await fileHandle.appendFile(createLicenseBadgeText(answers.license) + "\n");
  await fileHandle.appendFile(createTitleText(answers.title) + "\n");
  await fileHandle.appendFile(
    createDescriptionText(answers.description) + "\n"
  );
  await fileHandle.appendFile(
    createTableOfContents(answers.createTableOfContents) + "\n"
  );
  await fileHandle.appendFile(
    createInstallationText(answers.installation) + "\n"
  );
  await fileHandle.appendFile(createUsageText(answers.usage) + "\n");
  await fileHandle.appendFile(
    createContributionText(answers.contribution_guidelines) + "\n"
  );
  await fileHandle.appendFile(createTestText(answers.test_instructions) + "\n");
  await fileHandle.appendFile(
    createQuestionText(answers.username, answers.email_address) + "\n"
  );
};

const main = async () => {

  const answers = await inquirer.prompt(questions);
  const fileHandle = await open(process.argv[2], "w");
  await createMarkDownFile(fileHandle, answers);
  await fileHandle.close();
};

main();
