import * as vscode from 'vscode';

import { Command, CommandSystem, CommandWithOptions } from '../extension.type';

const TERMINAL_NAME = 'es6-import-sorter';

export async function executeCommands(commands: Command[]) {
  let lastTerminalCommandIndex = [...commands]
    .reverse()
    .findIndex(
      (command) =>
        (typeof command === 'string' && command) ||
        ((command as CommandWithOptions).command &&
          (command as CommandWithOptions)?.system === CommandSystem.TERMINAL),
    );

  if (lastTerminalCommandIndex !== -1) {
    lastTerminalCommandIndex = commands.length - 1 - lastTerminalCommandIndex;
  }

  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    if (
      (typeof cmd === 'string' && cmd) ||
      ((cmd as CommandWithOptions)?.command &&
        (cmd as CommandWithOptions).system === CommandSystem.TERMINAL)
    ) {
      const isLastTerminalCommand = i === lastTerminalCommandIndex;
      const terminalCommand =
        (cmd as CommandWithOptions)?.command ||
        (cmd as string) + (isLastTerminalCommand ? '; exit 0' : '\\');

      await executeTerminalCommand(terminalCommand, isLastTerminalCommand);
    } else if (
      (cmd as CommandWithOptions)?.command &&
      (cmd as CommandWithOptions).system === CommandSystem.VSCODE
    ) {
      await executeVSCodeExtensionCommand((cmd as CommandWithOptions).command);
    }
  }
}

export async function executeTerminalCommand(
  command: string,
  isListenToFinish = false,
) {
  const terminal =
    vscode.window.terminals.find((t) => t.name === TERMINAL_NAME) ||
    vscode.window.createTerminal(TERMINAL_NAME);

  terminal.show();

  terminal.sendText(command, isListenToFinish);

  if (isListenToFinish) {
    await handleTerminalCommandFinish(terminal);
  }
}

export async function handleTerminalCommandFinish(terminal: vscode.Terminal) {
  await new Promise((resolve) => {
    const disposeToken = vscode.window.onDidCloseTerminal(
      async (closedTerminal) => {
        if (closedTerminal === terminal) {
          disposeToken.dispose();
          if (terminal.exitStatus !== undefined) {
            resolve(terminal.exitStatus);
          } else {
            vscode.window.createTerminal(TERMINAL_NAME).show();
            console.log('error_executeTerminalCommand');
            console.log(terminal.exitStatus);
            console.log('-----------');
            resolve(false);
          }
        }
      },
    );
  });
}

export async function executeVSCodeExtensionCommand(command: string) {
  await new Promise(async (resolve) => {
    vscode.commands.executeCommand(command).then(resolve, (reason) => {
      console.log('error_executeVSCodeExtensionCommand: ', command);
      console.log(reason);
      console.log('-----------');
      resolve(false);
    });
  });
}
