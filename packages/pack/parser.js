const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("babel-core");

function getAST (path) {
  const source = fs.readFileSync(path, 'utf-8');
  return parser.parse(source, {sourceType: "module"})
}

function getDependencies (ast) {
  const dependencies = [];
  traverse(ast, {
    ImportDeclaration: ({node}) => {
      dependencies.push(node.source.value)
    }
  })

  return dependencies;
}

function transform (ast) {
  const { code } = transformFromAst(ast, null, {
    presets: ["env"],
  });
  return code;
}

module.exports = {
  getAST,
  getDependencies,
  transform,
}