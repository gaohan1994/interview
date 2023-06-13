class MacroCommand {
  constructor() {
    this.commandList = [];
  }

  /**
   * 添加指令
   *
   * @author Ghan
   * @param {*} command
   * @memberof MacroCommand
   */
  add(command) {
    this.commandList.push(command);
  }

  /**
   * 执行命令
   *
   * @author Ghan
   * @memberof MacroCommand
   */
  execute() {
    for (let i = 0; i < this.commandList.length; i++) {
      const command = this.commandList[i];
      command.execute();
    }
  }
}

const openKTCommand = {
  execute: function () {
    console.log('打开空调');
  },
};

const openTVCommand = {
  execute: function () {
    console.log('打开TV');
  },
};

const openYXCommand = {
  execute: function () {
    console.log('打开音响');
  },
};

const closeDoorCommand = {
  execute: function () {
    console.log('关门');
  },
};

const openComputerCommand = {
  execute: function () {
    console.log('打开电脑');
  },
};

const openQQCommand = {
  execute: function () {
    console.log('打开QQ');
  },
};

{
  /**
   * 打开空调
   * 打开电视 音响
   * 关门 开电脑 打开qq
   */
  const macroCommand1 = new MacroCommand();
  macroCommand1.add(openKTCommand);

  const macroCommand2 = new MacroCommand();
  macroCommand2.add(openTVCommand);
  macroCommand2.add(openYXCommand);

  const macroCommand3 = new MacroCommand();
  macroCommand3.add(closeDoorCommand);
  macroCommand3.add(openComputerCommand);
  macroCommand3.add(openQQCommand);

  /**
   * 合成
   */
  const macroCommand = new MacroCommand();
  macroCommand.add(macroCommand1);
  macroCommand.add(macroCommand2);
  macroCommand.add(macroCommand3);

  // macroCommand.execute();
}

class Folder {
  constructor(name) {
    this.name = name;

    this.parent = null;
    this.files = [];
  }

  add(file) {
    // 建立父子关系
    file.parent = this;
    this.files.push(file);
  }

  remove() {
    // 如果当前已经是根节点
    if (!this.parent) {
      return;
    }
    for (let i = 0; i < this.parent.files.length; i++) {
      const parentFiles = this.parent.files[i];
      if (parentFiles === this) {
        this.parent.files.splice(i, 1);
        return;
      }
    }
  }

  scan() {
    console.log('开始扫描文件夹：', this.name);
    for (let i = 0; i < this.files.length; i++) {
      const currentFile = this.files[i];
      currentFile.scan();
    }
  }
}

class File {
  constructor(name) {
    this.name = name;
    this.parent = null;
  }

  add() {
    throw new Error('文件无法添加');
  }

  remove() {
    if (!this.parent) {
      return;
    }
    for (let i = 0; i < this.parent.files.length; i++) {
      const parentFiles = this.parent.files[i];
      if (parentFiles === this) {
        this.parent.files.splice(i, 1);
        return;
      }
    }
  }

  scan() {
    console.log('开始扫描文件：', this.name);
  }
}

{
  const folder = new Folder('学习资料');
  const file1 = new File('javascript犀牛书');
  folder.add(file1);

  const folderNode = new Folder('Node');
  const file2 = new File('NodeJs从入门到精通');
  folderNode.add(file2);

  folder.add(folderNode);
  // folderNode.remove();
  file2.remove();
  folder.scan();
}
