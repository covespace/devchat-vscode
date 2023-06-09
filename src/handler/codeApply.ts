import * as vscode from 'vscode';
import { regInMessage, regOutMessage } from '../util/reg_messages';


export async function applyCode(text: string) {
	const validVisibleTextEditors = vscode.window.visibleTextEditors.filter(editor => editor.viewColumn !== undefined);

	if (validVisibleTextEditors.length > 1) {
		vscode.window.showErrorMessage(`There are more then one visible text editors. Please close all but one and try again.`);
		return;
	}

	const editor = validVisibleTextEditors[0];
	if (!editor) {
		return;
	}

	const selection = editor.selection;
	const start = selection.start;
	const end = selection.end;

	await editor.edit((editBuilder: vscode.TextEditorEdit) => {
		editBuilder.replace(new vscode.Range(start, end), text);
	});
}


regInMessage({command: 'code_apply', content: ''});
export async function codeApply(message: any, panel: vscode.WebviewPanel|vscode.WebviewView): Promise<void> {
	await applyCode(message.content);
	return;
}


