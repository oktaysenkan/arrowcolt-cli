#!/usr/bin/env node

const inquirer = require("inquirer");

const prompts = require("./src/prompts");
const { printLogo } = require("./src/ui");
const { createFiles } = require("./src/file-creator");

const result = {};

const main = async () => {
  printLogo();

  const { fileType } = await inquirer.prompt(prompts.fileType);
  result.fileType = fileType;

  const { fileName } = await inquirer.prompt(prompts.fileName(fileType));
  result.fileName = fileName;

  if (fileType === "Screen") {
    const { navigationName } = await inquirer.prompt(prompts.navigationName);
    result.navigationName = navigationName;
  }

  // const { fileExtension } = await inquirer.prompt(prompts.fileExtension);
  // result.fileExtension = fileExtension ? "ts" : "js";

  createFiles(result.fileType, result.fileName, "ts", result.navigationName);
};

main();
