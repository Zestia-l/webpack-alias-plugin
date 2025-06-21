const axios = require('axios');
const { Diff2HtmlUI, Diff2HtmlUIConfig } = require('diff2html/lib/ui/js/diff2html-ui');

// 配置API请求参数
const apiUrl = 'https://git.inshopline.com/api/v4/projects/23273/repository/compare?from=master&to=test';
const headers = {
    'accept': 'application/json, text/plain, */*',
    // 请补充完整实际需要的header，如csrf-token、Cookie等
    // 'x-csrf-token': '实际值',
    // 'Cookie': '实际值'
};

async function verifyDiffRender() {
    try {
        // 发送API请求获取响应
        const response = await axios.get(apiUrl, { headers });
        const data = response.data;

        // 假设diffs数组包含文件差异信息，且diff字段是差异文本
        if (data.diffs && Array.isArray(data.diffs)) {
            data.diffs.forEach((diff, index) => {
                if (diff.diff) {
                    const targetElement = document.createElement('div');
                    targetElement.id = `diff-${index}`;
                    document.body.appendChild(targetElement);

                    const configuration= {
                        drawFileList: false,
                        fileListToggle: false,
                        matching: 'lines',
                        outputFormat: 'side-by-side',
                        synchronisedScroll: true,
                        highlight: true
                    };
                    const diff2htmlUi = new Diff2HtmlUI(targetElement, diff.diff, configuration);
                    diff2htmlUi.draw();
                    diff2htmlUi.highlightCode();
                }
            });
        }
    } catch (error) {
        console.error('请求或渲染过程出错:', error);
    }
}

verifyDiffRender();