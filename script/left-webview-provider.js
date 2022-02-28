(function () {
    const vscode = acquireVsCodeApi();
    document.getElementById(ELEMENT_IDS.TRIGGER_MESSAGE_BUTTON).addEventListener('click', ()=> {
        vscode.postMessage({ 
            action: POST_MESSAGE_ACTION.SHOW_WARNING_LOG, 
            data: {
                message: "You just clicked on the left panel webview button"
        }});
    });
}());