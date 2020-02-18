const inquirer = require("inquirer");
const { createFiles } = require("./src/file-creator");

const result = {};

const fileExtension = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "fileExtension",
        message: "Are you using TypeScript?",
        choices: ["Yes", "No"]
      }
    ])
    .then(answers => {
      result.fileExtension = answers.fileExtension ? "ts" : "js";
      createFiles(result.fileType, result.fileName, result.fileExtension);
    });
};

const fileName = fileType => {
  inquirer
    .prompt([
      {
        name: "fileName",
        message: `${fileType} name?`,
        validate: input =>
          (input =
            !input.length > 0 ? `${fileType} name cannot be empty!` : true)
      }
    ])
    .then(answers => {
      result.fileName = answers.fileName;
      fileExtension(answers.fileName);
    });
};

const fileType = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "fileType",
        message: "What do you want to create?",
        choices: [
          "Component",
          {
            name: "Config",
            disabled: "Unavailable right now!"
          },
          {
            name: "Screen",
            disabled: "Unavailable right now!"
          },
          {
            name: "Style",
            disabled: "Unavailable right now!"
          },
          {
            name: "Util",
            disabled: "Unavailable right now!"
          }
        ]
      }
    ])
    .then(answers => {
      result.fileType = answers.fileType;
      fileName(answers.fileType);
    });
};

fileType();
