import * as vscode from 'vscode';
import { TextProcessor } from './utils/text-processor';

export function activate(context: vscode.ExtensionContext) {
    console.log('Non-Breaking Space Inserter extension is now active!');

    const textProcessor = new TextProcessor();

    // Register command for inserting &nbsp; in selection
    let insertInSelection = vscode.commands.registerCommand('nbsp.insertInSelection', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active text editor found');
            return;
        }

        const selection = editor.selection;
        if (selection.isEmpty) {
            vscode.window.showInformationMessage('Please select text first');
            return;
        }

        const selectedText = editor.document.getText(selection);
        const processedText = textProcessor.processText(selectedText);
        
        editor.edit(editBuilder => {
            editBuilder.replace(selection, processedText);
        }).then(() => {
            vscode.window.showInformationMessage('Non-breaking spaces inserted successfully!');
        });
    });

    // Register command for inserting &nbsp; in entire document
    let insertInDocument = vscode.commands.registerCommand('nbsp.insertInDocument', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active text editor found');
            return;
        }

        const document = editor.document;
        const fullText = document.getText();
        const processedText = textProcessor.processText(fullText);
        
        const fullRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(fullText.length)
        );

        editor.edit(editBuilder => {
            editBuilder.replace(fullRange, processedText);
        }).then(() => {
            vscode.window.showInformationMessage('Non-breaking spaces inserted in entire document!');
        });
    });

    // Register command for inserting &nbsp; in current line
    let insertInLine = vscode.commands.registerCommand('nbsp.insertInLine', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No active text editor found');
            return;
        }

        const position = editor.selection.active;
        const line = editor.document.lineAt(position.line);
        const lineText = line.text;
        const processedText = textProcessor.processText(lineText);
        
        editor.edit(editBuilder => {
            editBuilder.replace(line.range, processedText);
        }).then(() => {
            vscode.window.showInformationMessage('Non-breaking spaces inserted in current line!');
        });
    });

    context.subscriptions.push(insertInSelection);
    context.subscriptions.push(insertInDocument);
    context.subscriptions.push(insertInLine);
}

export function deactivate() {
    console.log('Non-Breaking Space Inserter extension is now deactivated');
}
