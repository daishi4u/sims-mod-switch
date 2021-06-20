import { QCheckBox } from "@nodegui/nodegui";
import * as path from "path";
import { FileSystem } from "./../services/fileSystem";

export class Mod {
  private readonly folderPath: string;
  private readonly checkBox: QCheckBox;
  private readonly modName: string;
  private readonly fileSystem: FileSystem;

  constructor(fileSystem: FileSystem, folderPath: string, enabled: boolean) {
    this.folderPath = folderPath;
    this.fileSystem = fileSystem;

    this.checkBox = new QCheckBox();
    this.modName = folderPath.split(path.sep).pop()!;
    this.checkBox.setText(this.modName);
    this.checkBox.setChecked(enabled);
    let self = this;
    this.checkBox.addEventListener("clicked", (checked: boolean) => {
      self.onClick(checked);
    });
  }

  public getCheckBox(): QCheckBox {
    return this.checkBox;
  }

  public isEnabled(): boolean {
    return this.checkBox.isChecked();
  }

  public getPath(): string {
    return this.folderPath;
  }

  public getName(): string {
    return this.modName;
  }

  public onClick(checked: boolean) {
    if (checked) {
      this.fileSystem.createSymlink(this);
    } else {
      this.fileSystem.deleteSymlink(this);
    }
  }
}
