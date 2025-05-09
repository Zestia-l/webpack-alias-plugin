import path from 'path';
export function normalizeAliasPath(pkgDir:string, baseUrl:string, mapping:string) {
    // 拼接基础路径和映射路径
    let combinedPath = path.join(baseUrl, mapping);
    //path.join和path.resolve的区别
    //path.join会将路径中的分隔符统一为/，path.resolve会将路径中的分隔符统一为\

    // 如果拼接后的路径是相对路径，结合包目录解析成绝对路径
    if (path.isAbsolute(combinedPath) === false) {
        combinedPath = path.resolve(pkgDir, combinedPath);
    }

    // 规范化路径
    // path.normalize会将路径中的分隔符统一为/
    let normalizedPath = path.normalize(combinedPath);
    normalizedPath = normalizedPath.replace(/\\/g, '/'); 
    return normalizedPath;
}