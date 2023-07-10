const path = require("path");
const { deleteSync } = require("del");

class MyWebpackCleanPlugin {
  constructor() {
    this.initialCleaned = false;

    this.apply = this.apply.bind(this);
  }

  apply(compiler) {
    this.outputPath = compiler.options.output.path;

    // Executed right before emitting assets to output dir. This hook is not copied to child compilers.
    compiler.hooks.emit.tap("MyWebpackCleanPlugin", stats => {
      this.handleEmit(stats);
    });

    compiler.hooks.done.tap("MyWebpackCleanPlugin", stats => {
      this.handleDone(stats);
    });
  }

  handleEmit = compilation => {
    if (this.initialCleaned) {
      return;
    }

    const stats = compilation.getStats();
    if (stats.hasErrors()) {
      return;
    }

    this.initialCleaned = true;
    this.removeFiles();
    console.log("handle emit");
  };

  handleDone = () => {
    console.log("handle done");
  };

  removeFiles = () => {
    try {
      const deleted = deleteSync([], {
        cwd: this.outputPath,
      });

      deleted.forEach(file => {
        const filename = path.relative(process.cwd(), file);
        console.warn(`MyWebpackCleanPlugin : `, filename);
      });
    } catch (error) {
      console.error(`Remove files error: `, error);
    }
  };
}

module.exports = { MyWebpackCleanPlugin };
