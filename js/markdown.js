document.getElementById('convert-button').addEventListener('click', function() {
    const markdownText = document.getElementById('markdown-input').value;
    const htmlContent = marked.parse(markdownText);
    document.getElementById('html-output').innerHTML = htmlContent;
});
