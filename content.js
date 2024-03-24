document.querySelectorAll('a').forEach(a => {
    if (a.textContent.includes('pdf')) {
        // 创建[abstract]链接
        const abstractLink = document.createElement('a');
        abstractLink.textContent = 'abstract';
        abstractLink.style.cursor = 'pointer';
        abstractLink.style.marginLeft = '10px';

        let pdf_href = a.href;
        let html_href = pdf_href.replace(".pdf",".html").replace("papers","html");

        // 插入到DOM中
        a.parentNode.insertBefore(abstractLink, a.nextSibling);

        // 创建div来展示abstract内容
        let abstractDiv = document.createElement('div');
        abstractDiv.style.display = 'none';
        abstractLink.parentNode.insertBefore(abstractDiv, abstractLink.nextSibling);

        // 添加点击事件
        abstractLink.addEventListener('click', () => {
            if (!abstractDiv.textContent) { // 如果abstract还没加载
                fetch(html_href).then(response => response.text()).then(text => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(text, 'text/html');
                    let abstractElement = doc.getElementById('abstract');
                    console.log(html_href);
                    console.log(abstractElement.innerText);
                    abstractDiv.innerHTML = abstractElement.innerText; // 假设直接使用抓取到的内容，实际上可能需要解析
                    $(abstractDiv).slideToggle(); // 使用jQuery的slideToggle
                });
            } else {
                $(abstractDiv).slideToggle(); // 如果已经加载过，直接展示/隐藏
            }
        });
    }
});
