const Compiler = require("pack");
const options = require("../pack.config");

const compiler = new Compiler(options);
compiler.run();
