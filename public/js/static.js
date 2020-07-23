{
    "use strict";

    
    const copyBtn = document.getElementById("copyBtn");

    copyBtn.addEventListener("click", () => {
        let textarea = document.getElementById("textarea");
        navigator.clipboard.writeText(textarea.value)
        .then(() => {
            textarea.select();
            console.log("クリップボードにコピーしました");
            alert("クリップボードにコピーしました");
        })
        .catch(err => {
            console.error("クリップボードへのコピーが失敗しました");
        })

    });

}