// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { resolve as pathResolve } from 'path';

import { executeCommands, formatImportSections } from './utils';
import { Configs, ErrorCode } from './extension.type';
import { TextDecoder } from 'util';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    'es6-import-sorter.sort',
    () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      // vscode.window.showInformationMessage('Hello World from ES6 Import Sorter!');
      sort();
    },
  );

  context.subscriptions.push(disposable);
}

async function sort() {
  const edit = new vscode.WorkspaceEdit();

  if (!vscode.window.activeTextEditor) {
    return;
  }

  const configs: Configs = await getConfigs();
  let preCommands = configs?.preCommands;

  if (preCommands) {
    await executeCommands(preCommands);
  }

  const text = vscode.window.activeTextEditor.document.getText();
  const {
    formattedText,
    firstLineIndex,
    firstCharacterIndex,
    lastLineIndex,
    lastCharacterIndex,
  } = formatImportSections(text, configs, (errorCode) => {
    switch (errorCode) {
      case ErrorCode.NO_SECTION_PREFIX:
        vscode.window.showErrorMessage(
          'Not found (or empty) "sectionPrefix" in .es6importsorterrc.json',
          {
            modal: true,
            detail:
              'You must specify "sectionPrefix" in .es6importsorterrc.json',
          },
        );
        break;
    }
  });

  if (formattedText) {
    edit.replace(
      vscode.window.activeTextEditor.document.uri,
      new vscode.Range(
        new vscode.Position(firstLineIndex, firstCharacterIndex),
        new vscode.Position(lastLineIndex, lastCharacterIndex),
      ),
      formattedText,
    );
    let success = await vscode.workspace.applyEdit(edit);
  }
}

async function getConfigs() {
  const rootUri = vscode.workspace.workspaceFolders?.[0]?.uri;
  let configs: Configs = {};

  if (!rootUri) {
    return configs;
  }

  try {
    const filePath = pathResolve(rootUri.path, '.es6importsorterrc.json');
    const rootPath = vscode.Uri.file(filePath);

    configs =
      (await new Promise<Configs>((resolve) => {
        vscode.workspace.fs.readFile(rootPath).then(
          (data) => {
            const rawConfig = new TextDecoder().decode(data);
            if (!!rawConfig) {
              resolve(JSON.parse(rawConfig));
            }
          },
          (error) => {
            console.log('error_read_config_file', error);
            resolve({});
          },
        );
      })) || {};
  } catch (error) {
    console.log('error_import_formatter_get_configs', error);
  }

  return configs;
}

// This method is called when your extension is deactivated
export function deactivate() {}
