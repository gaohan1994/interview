const path = require("path");
const fs = require("fs");
const { getAST, getDependencies, transform } = require("./parser");

class Compiler {

  entry;

  output;
  
  modules = [];

  constructor (packOptions) {
    const {entry, output} = packOptions;

    this.entry = entry;
    this.output = output;
  }

  run () {
    const entryModule = this.buildModule(this.entry, true);
    this.modules.push(entryModule);
    this.modules.forEach((_module) => {
      _module.dependencies.forEach((dependence) => {
        this.modules.push(this.buildModule(dependence))
      })
    });

    this.emitFiles();
  }

  buildModule (filename, isEntry) {
    let ast;

    if (isEntry) {
      ast = getAST(filename);
    } else {
      ast = getAST(path.join(process.cwd(), filename))
    }

    return {
      filename,
      dependencies: getDependencies(ast),
      transformCode: transform(ast)
    }
  }

  emitFiles () {
    const outputPath = path.join(this.output.path, this.output.filename);
    let modules = '';

    this.modules.map((_module) => {
      modules += `'${_module.filename}' : function(require, module, exports) {${_module.transformCode}},`;
    });

    const bundle = `
    (function(modules) {
      function require(fileName) {
        const fn = modules[fileName];
        const module = { exports:{}};
        fn(require, module, module.exports)
        return module.exports
      }
      require('${this.entry}')
    })({${modules}})
    `;
    fs.writeFileSync(outputPath, bundle, "utf-8");
  }
}

module.exports = Compiler