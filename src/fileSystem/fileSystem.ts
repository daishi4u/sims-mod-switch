import * as fs from 'fs-extra';
import { Mod } from '../mod/mod';
import * as path from 'path';

export class FileSystem {
  private readonly simsModPath: string;
  private allMods: string[];
  private enabledMods: string[];

  constructor(modPath: string, simsModPath: string) {
    this.simsModPath = simsModPath;
    this.allMods = [];
    this.enabledMods = [];

    // get the mods in the paths
    if (fs.existsSync(modPath)) {
      this.allMods = fs.readdirSync(modPath);
      this.allMods = this.allMods.map((mod) => path.join(modPath, mod));
    }

    if (fs.existsSync(simsModPath)) {
      this.enabledMods = fs.readdirSync(simsModPath);
      this.enabledMods = this.enabledMods.map((mod) =>
        path.join(simsModPath, mod)
      );
    }
  }

  public getAllMods(): string[] {
    return this.allMods;
  }

  public getEnabledMods(): string[] {
    return this.enabledMods;
  }

  public createSymlink(mod: Mod): void {
    try {
      fs.symlinkSync(
        mod.getPath(),
        path.join(this.simsModPath, mod.getName()),
        'junction'
      );
    } catch (e) {
      console.log('Issue creating symlink', e);
    }
  }

  public deleteSymlink(mod: Mod): void {
    try {
      fs.unlinkSync(path.join(this.simsModPath, mod.getName()));
    } catch (e) {
      console.log('Issue deleting symlink', e);
    }
  }
}
