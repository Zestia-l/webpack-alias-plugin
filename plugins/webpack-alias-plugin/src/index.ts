import { Compiler } from 'webpack';
import { WebpackAliasPluginOptions } from '../types/index';
import { loadAllTsConfigs } from './loadAllTsconfigs';
import { mergeAliases } from './MergeAliases';
export class WebpackAliasPlugin {
    rootPath: string;
    packagePatterns: string[];
    tsConfigName: string;
    constructor(options:WebpackAliasPluginOptions = {}) {
      // 配置验证与初始化
      this.rootPath = options.root || process.cwd();
      this.packagePatterns = options.packages || ['packages/*'];
      this.tsConfigName = options.tsConfigName || 'tsconfig.json';
    }
    apply(compiler:Compiler) {
      compiler.hooks.environment.tap('MonorepoAliasPlugin', () => {
        const aliases = loadAllTsConfigs(this.packagePatterns,this.rootPath, this.tsConfigName);
        mergeAliases(compiler, aliases);
        console.log('WebpackAliasPlugin合并的paths配置: ', aliases);
      });
    }
  }