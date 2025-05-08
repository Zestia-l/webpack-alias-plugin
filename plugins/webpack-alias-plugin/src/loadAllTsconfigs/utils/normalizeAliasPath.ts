import path from 'path';
export function normalizeAliasPath(pkgDir:string, baseUrl:string, mapping:string) {
    // 拼接基础路径和映射路径
    let combinedPath = path.join(baseUrl, mapping);

    // 如果拼接后的路径是相对路径，结合包目录解析成绝对路径
    if (path.isAbsolute(combinedPath) === false) {
        combinedPath = path.resolve(pkgDir, combinedPath);
    }

    // 规范化路径
    const normalizedPath = path.normalize(combinedPath);

    return normalizedPath;
}