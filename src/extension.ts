import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('vscode-webview-extension-with-react.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from vscode-webview-extension-with-react!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
