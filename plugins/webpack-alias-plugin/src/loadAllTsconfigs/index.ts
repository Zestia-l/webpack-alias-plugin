import { globSync } from "glob";
import path from "path";
import * as fs from 'fs';
import { parseTsConfig } from "./utils/parseTsConfig";
import { normalizeAliasPath } from "./utils/normalizeAliasPath";
import { Aliases } from "./types";

export function loadAllTsConfigs(packagePatterns:string[], rootPath:string, tsConfigName:string) {
    const aliases:Aliases= {};//所有提取到的别名信息
    
    packagePatterns.forEach(pattern => {
      globSync(pattern, { cwd: rootPath }).forEach(pkgDir => {
        const tsConfigPath = path.join(rootPath, pkgDir, tsConfigName);
        if (fs.existsSync(tsConfigPath)) {
          const AliasesAndPaths = parseTsConfig(tsConfigPath);
          if(AliasesAndPaths?.baseUrl&&AliasesAndPaths?.paths)
          {
            const { baseUrl, paths } = AliasesAndPaths;
            Object.entries(paths).forEach(([alias, mappings]) => {
            const normalizedPath = normalizeAliasPath(
              pkgDir, baseUrl, (Array.isArray(mappings) ? mappings[0] : '')
            );
            aliases[alias.replace('/*', '')] = normalizedPath;
          });
          }
        }
      });
    });
    return aliases;
  }