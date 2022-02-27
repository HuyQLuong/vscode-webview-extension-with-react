(function () {
    const vscode = acquireVsCodeApi();
    document.getElementById(ELEMENT_IDS.TRIGGER_MESSAGE_BUTTON).addEventListener('click', ()=> {
        console.log("Trigger Button")
    });
}());