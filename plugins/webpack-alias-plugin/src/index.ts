import { WebpackAliasPluginOptions } from '../types/index';
class WebpackAliasPlugin {
    rootPath: string;
    packagePatterns: string[];
    tsConfigName: string;
    constructor(options:WebpackAliasPluginOptions = {}) {
      // 配置验证与初始化
      this.rootPath = options.root || process.cwd();
      this.packagePatterns = options.packages || ['packages/*'];
      this.tsConfigName = options.tsConfigName || 'tsconfig.json';
    }
    apply(compiler) {
      // 核心逻辑
    }
  }