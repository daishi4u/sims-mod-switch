import { FileSystem } from "./fileSystem";
import { Mod } from "../mod/mod";
import * as path from "path";

export class ModService {
  private fileSystem: FileSystem;
  private mods: Mod[] = [];

  constructor(modPath: string, simsModPath: string) {
    this.fileSystem = new FileSystem(modPath, simsModPath);
    this.mods = this.fileSystem.getAllMods().map((mod: string) => {
      let modName = mod.split(path.sep).pop()!;
      let enabled =
        this.fileSystem
          .getEnabledMods()
          .indexOf(path.join(simsModPath, modName)) !== -1;
      return new Mod(this.fileSystem, mod, enabled);
    });
  }

  public getMods(): Mod[] {
    return this.mods;
  }
}
