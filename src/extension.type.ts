export enum CommandSystem {
  TERMINAL = 'terminal',
  VSCODE = 'vscode',
}

export type CommandWithOptions = {
  command: string;
  system?: CommandSystem;
};

export type Command = string | CommandWithOptions;

export type Configs = {
  sectionNames?: string[];
  startImportBlockSign?: string;
  endImportBlockSign?: string;
  sectionPrefix?: string;
  statementTerminator?: string;
  sourcePrefixes?: string[];
  preCommands?: Command[];
};

export type ImportSection = {
  key: string;
  value: string;
  order: number;
};

export enum ErrorCode {
  NO_SECTION_PREFIX = 'no_section_prefix',
}
