import * as fs from 'fs-extra';
import * as path from 'path';
import { QFileDialog, FileMode } from '@nodegui/nodegui';

const CONFIG_FILE_NAME = 'simsModSwitcherConfig.json';
interface Config {
  modPath: string;
  simsModPath: string;
}
export class Configuration {
  private config: Config;
  private readonly fileDialog: QFileDialog = new QFileDialog();

  constructor() {
    this.fileDialog.setFileMode(FileMode.Directory);
    if (fs.existsSync(path.join(__dirname, CONFIG_FILE_NAME))) {
      this.config = fs.readJSONSync(path.join(__dirname, CONFIG_FILE_NAME));
    } else {
      this.config = {
        simsModPath: '',
        modPath: '',
      };
      // ask for each path then create the file
      let modFolders: string[] = [];
      while (modFolders.length == 0) {
        modFolders = this.getModsFolder();
      }
      this.config.modPath = modFolders[0];

      modFolders = [];
      while (modFolders.length == 0) {
        modFolders = this.getSimsModFolder();
      }
      this.config.simsModPath = modFolders[0];

      fs.writeJSONSync(path.join(__dirname, CONFIG_FILE_NAME), this.config);
    }
  }

  public getConfig(): Config {
    return this.config;
  }

  private getSimsModFolder(): string[] {
    return this.getFolder(
      'Please choose the folder where ths Sims mods are located.'
    );
  }

  private getModsFolder(): string[] {
    return this.getFolder(
      'Please choose the folder where YOUR mods are located.'
    );
  }

  private getFolder(text: string): string[] {
    // TODO figure out a way to only select one dir
    this.fileDialog.setWindowTitle(text);
    this.fileDialog.exec();

    return this.fileDialog.selectedFiles();
  }
}
