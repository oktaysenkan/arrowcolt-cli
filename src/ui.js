const colors = require("colors");
const figlet = require("figlet");

module.exports = {
  printLogo: () => {
    console.log(colors.cyan(figlet.textSync("ArrowColt")));
    console.log(`Command line helper for React Native. `.cyan);
    console.log();
  }
};
