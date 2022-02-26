try {
	require("module-alias/register");
} catch (e) {
	console.log("module-alias import error !");
}
import * as vscode from "vscode";
import { EXTENSION_CONSTANT } from "constant";
import { LeftPanelWebview } from "providers/left-webview-provider";

export function activate(context: vscode.ExtensionContext) {
	let helloWorldCommand = vscode.commands.registerCommand(
		"vscode-webview-extension-with-react.helloWorld",
		() => {
			vscode.window.showInformationMessage(
				"Hello World from vscode-webview-extension-with-react!"
			);
		}
	);
	context.subscriptions.push(helloWorldCommand);

	// Register view
	const leftPanelWebViewProvider = new LeftPanelWebview(context?.extensionUri, {});
	let view = vscode.window.registerWebviewViewProvider(
		EXTENSION_CONSTANT.LEFT_PANEL_WEBVIEW_ID,
		leftPanelWebViewProvider,
	);
	context.subscriptions.push(view);

};

// this method is called when your extension is deactivated
export function deactivate() {}
