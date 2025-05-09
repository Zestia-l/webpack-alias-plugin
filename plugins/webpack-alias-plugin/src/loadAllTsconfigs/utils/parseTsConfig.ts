import * as fs from 'fs';
import * as path from 'path';
import {Ref} from '../types';
// 解析tsconfig文件，并解析其中的paths配置项。
// 如果存在引用关系（references），则递归地解析所有引用的tsconfig文件中的paths配置项，并将其合并到原始的tsconfig文件中。
// 最后返回一个包含baseUrl和paths的对象。

export function parseTsConfig(configPath:string) {//接收tsconfig文件所在位置
    try {
      //读取并将tsconfig文件转化为对象
      const AllConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
      //获取tsconfig中的references配置项
      const { TsConfigPaths = [] } = AllConfig;
      //遍历所有references中的路径，找到所有tsconfig文件
      //ref是一个对象，包含path属性，path属性是一个字符串，代表tsconfig文件的相对路径
      TsConfigPaths.forEach((ref:Ref)=> {
        //拼接绝对路径
        //path.dirname(configPath)获取当前tsconfig文件所在目录的绝对路径（上一层）
        const refPath = path.join(path.dirname(configPath), ref.path);
        //fs.existsSync(refPath)判断文件是否存在
        if (fs.existsSync(refPath)) {
          //递归
          const refConfig = parseTsConfig(refPath);
          //将refConfig中的paths配置项合并到原始的tsconfig文件中
          if(refConfig && refConfig.paths)
          {
            Object.assign(AllConfig.compilerOptions.paths, refConfig.paths);
          }
        }
      });
      return {
        baseUrl: AllConfig.compilerOptions?.baseUrl || '.',
        paths: AllConfig.compilerOptions?.paths || {}
      };
    } catch (error) {
      console.error(`Error parsing tsconfig at ${configPath}:`, error);
    }
  }