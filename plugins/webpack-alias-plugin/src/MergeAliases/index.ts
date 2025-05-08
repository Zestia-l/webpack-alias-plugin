import { Aliases } from "../loadAllTsconfigs/types";
import { Compiler } from "webpack";

export function mergeAliases(compiler: Compiler, newAliases: Aliases) {
    const existingAlias = compiler.options.resolve.alias || {};
    compiler.options.resolve.alias = {
      ...existingAlias,
      ...newAliases
    };
  }