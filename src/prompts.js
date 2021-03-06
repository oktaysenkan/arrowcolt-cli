module.exports = {
  fileType: [
    {
      type: "list",
      name: "fileType",
      message: "What do you want to create?",
      choices: ["Component", "Screen", "Config", "Style", "Util"]
    }
  ],
  fileName: fileType => [
    {
      name: "fileName",
      message: `${fileType} name?`,
      validate: input =>
        (input = !input.length > 0 ? `${fileType} name cannot be empty!` : true)
    }
  ],
  fileExtension: [
    {
      type: "list",
      name: "fileExtension",
      message: "Are you using TypeScript?",
      choices: ["Yes", "No"]
    }
  ],
  navigationName: [
    {
      name: "navigationName",
      message: `Is this depended any navigation screen? (Optional)`
    }
  ]
};
