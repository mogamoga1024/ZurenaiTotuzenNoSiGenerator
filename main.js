
// UI

const $inputText = $("#input-text");
const $result = $("#result");
const $copyButton = $("#copy-btn");

let result = "";

$inputText.on("blur", function() {
    result = "";

    const inputText = $(this).val();
    if (inputText === "") {
        $result.html("");
        $copyButton.hide();
        return;
    }
    $copyButton.show();

    let hankakuCountMax = 0;
    const textList = inputText.split("\n").map(text => {
        const hankakuCount = calcHankakuCount(text);
        if (hankakuCountMax < hankakuCount) {
            hankakuCountMax = hankakuCount;
        }
        return {text, hankakuCount};
    });
    
    result = `＿人${"人".repeat(Math.floor((hankakuCountMax + 1) / 2))}人＿\n`;
    for (const {text, hankakuCount} of textList) {
        result += createFukidasiCenter(text, hankakuCount, hankakuCountMax);
    }
    result += `￣Ｙ${"Ｙ".repeat(Math.floor((hankakuCountMax + 1) / 2))}Ｙ￣`;

    $result.html(result.replace(/\n/g, "<br>").replace(/ /g, "&nbsp;"));
});

$copyButton.on("click", function() {
    navigator.clipboard.writeText(result);
    $copyButton.text("コピー完了");
    setTimeout(() => {
        $copyButton.text("コピー");
    }, 1000);
});

// ロジック

function calcHankakuCount(text) {
    return [...text].reduce((count, char) => {
        return count + (/^[\u0020-\u007E]$/.test(char) ? 1 : 2);
    }, 0);
}

function createFukidasiCenter(text, hankakuCount, hankakuCountMax) {
    let result = "＞　";

    let dif = hankakuCountMax - hankakuCount;
    if (dif % 2 === 1) {
        result += " ";
        dif -= 1;
    }
    const space = " ".repeat(dif / 2);
    result += space + text + space;
    
    result += "　＜\n";
    return result;
}


