// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

function removeAllComments() {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
	return; // Если редактор не активен, ничего не делаем
	}
	console.debug('removeAllComments');
	const document = editor.document;

	if (document.languageId !== 'cpp') {
	vscode.window.showErrorMessage('Эта команда работает только с C++ файлами.');
	return;
	}

	const fullText = document.getText();
	const singleLineComment = /\/\/.*$/gm;
	const multiLineComment = /\/\*[\s\S]*?\*\//g;

	// Удаляем однострочные комментарии
	let textWithoutComments = fullText.replace(singleLineComment, '');

	// Удаляем многострочные комментарии
	textWithoutComments = textWithoutComments.replace(multiLineComment, '');

	const fullRange = new vscode.Range(
	document.positionAt(0),
	document.positionAt(fullText.length)
	);

	editor.edit(editBuilder => {
	editBuilder.replace(fullRange, textWithoutComments);
	});
}
  
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.debug('Congratulations, your extension "nocomments" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('nocomments.removeAllComments', () => {
		removeAllComments();
	});
	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
