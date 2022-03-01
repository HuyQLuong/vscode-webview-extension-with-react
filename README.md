# vscode-webview-extension-with-react README

vscode-webview-extension-with-react is a repo to illustrate how to register a webview using react to side bar of vscode when developing vscode extension
# 1. Create a webview to VScode extension side panel

- In `package.json` we need to register a view container to have a icon in side bar

        ```
            "viewsContainers": {
                "activitybar": [
                    {
                        "id": "webview",
                        "title": "Example for webview",
                        "icon": "./assets/extension-icon.png"
                    }
                ]
            },
            "views": {
                "webview": [
                    {
                        "type": "left-panel-webviews",
                        "id": "left-panel-webview",
                        "name": "Webview",
                        "icon": "src/assets/extension-icon.png"
                    }
                ]
            }
        ```
- Create a webview provider `LeftPanelWebview` which is implemented from `WebviewViewProvider`

    - Note that: 
        - We can assign data from extension to this webview such as `extensionPath` when create `LeftPanelWebview` class
        - `resolveWebviewView` will be the function calling first we open the webview
        - `_getHtmlForWebview` will be the function to render the webview from react
        - The script for the webview can be register in the `body` of webview

            ```
            	<script nonce="${nonce}" type="text/javascript" src="${constantUri}"></script>
				<script nonce="${nonce}" src="${scriptUri}"></script>
            ```

        - For styling, let add CSS file to `link` tag
            ```
                <link href="${styleUri}" rel="stylesheet">
            ```
- Declare `LeftPanelWebview` class and register Webview in `extension.ts`
    ```js
        const leftPanelWebViewProvider = new LeftPanelWebview(context?.extensionUri, {});
        let view = vscode.window.registerWebviewViewProvider(
            EXTENSION_CONSTANT.LEFT_PANEL_WEBVIEW_ID,
            leftPanelWebViewProvider,
        );
        context.subscriptions.push(view);
    ```

- Then you will have a webview in side panel !!

# 2. How to render react component in vscode and handle user action

- When calling Webview for the first time, `resolveWebviewView` will be called and expect to return the html file of the webview. We will use `ReactDOM.renderToString` to concat the react component into `body` tag of the html file. In that case, react component will be rendered.

```
<body>
    ${
        
        ReactDOMServer.renderToString((
            <LeftPanel message={"Tutorial for Left Panel Webview in VSCode extension"}></LeftPanel>
        ))
    }
    <script nonce="${nonce}" type="text/javascript" src="${constantUri}"></script>
    <script nonce="${nonce}" src="${scriptUri}"></script>
</body>
```

- The weakness of this approach is the webview will only be a static html view. Because of this problem, we will need to embedded the script into html so that we can handle user action base on eventListener from DOM

- We can also handle user action in script and callback to our extension by using `vscode.postMessage` in script file and use `_view.webview.onDidReceiveMessage` to receive the message in webview components
    ```
    // Script file: Emit message
    vscode.postMessage({ 
                action: POST_MESSAGE_ACTION.SHOW_WARNING_LOG, 
                data: {
                    message: "You just clicked on the left panel webview button"
            }});
    ```

    ```
    this._view.webview.onDidReceiveMessage((message) => {
                switch (message.action){
                    case 'SHOW_WARNING_LOG':
                        window.showWarningMessage(message.data.message);
                        break;
                    default:
                        break;
                }
    });
    ```
- Using this way of communication between webview and extension, we also can create a message chanel between 2 separated webview in some complicated vscode extension


Reference url: https://medium.com/@luongquochuy1995/create-a-vs-code-left-panel-web-view-extension-using-react-e765fd901f64

**If you have any further question, feel free to contact luongquochuy1995@gmail.com**
