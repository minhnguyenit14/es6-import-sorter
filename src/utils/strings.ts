import { Configs, ErrorCode, ImportSection } from '../extension.type';

export function formatImportSections(
  text: string,
  configs: Configs,
  callbackError: (code: ErrorCode) => void = () => {},
) {
  const lines = text.split('\n');

  const sectionsPredefinedOrder = configs?.sectionNames;
  const startImportBlockSign = configs?.startImportBlockSign || '';
  const endImportBlockSign = configs?.endImportBlockSign || '';
  const sectionPrefix = configs?.sectionPrefix || '';
  const statementTerminator = configs?.statementTerminator || ';';
  let sourcePrefixes = configs?.sourcePrefixes;
  if (!sourcePrefixes?.length) {
    sourcePrefixes = ['\\w', '\\.'];
  }

  const sections: ImportSection[] = [];
  let sectionKey: string = '';
  let sectionValue: string = '';
  let firstLineIndex = lines.findIndex((line) =>
    line.trim().startsWith(startImportBlockSign),
  );
  if (firstLineIndex < 0) {
    firstLineIndex = 0;
  } else if (firstLineIndex > 0) {
    firstLineIndex++;
  }

  let firstCharacterIndex = 0;
  let lastLineIndex = 0;
  let lastCharacterIndex = 0;

  // if (!sectionPrefix) {
  //   callbackError(ErrorCode.NO_SECTION_PREFIX);
  //   return {};
  // }

  lines.some((line, index) => {
    if (index < firstLineIndex) {
      return false;
    }
    // line starts with sectionPrefix or equal to startImportBlockSign
    const isNewSection =
      !!sectionPrefix && !!line.trim()?.startsWith?.(sectionPrefix);

    const nextLine = lines[index + 1]?.trim?.();
    // next line is equal to endImportBlockSign
    const isEndImport = (nextLine || '') === endImportBlockSign;
    // || (!!sectionPrefix &&
    //   !lines[index + 1]?.trim?.()?.startsWith(sectionPrefix) &&
    //   !lines[index + 1]?.trim?.()?.startsWith('import') &&
    //   !line?.trim?.()?.endsWith('{') &&
    //   !line?.trim?.()?.endsWith(','));

    // next line is new section or the end of import block
    const isEndSection =
      (!!sectionPrefix && lines[index + 1]?.startsWith(sectionPrefix)) ||
      isEndImport;

    if (isNewSection) {
      sectionKey = line;
    } else {
      sectionValue +=
        line +
        (index < lines.length - 1 ? '\n' : nextLine !== undefined ? '' : '\n');
    }

    if (isEndSection) {
      let order = sectionsPredefinedOrder?.length
        ? sectionsPredefinedOrder.findIndex(
            (item) => sectionPrefix + item.trim() === sectionKey.trim(),
          )
        : index;

      if (!!sectionKey && order && order < 0) {
        order = sectionsPredefinedOrder?.length || 0;
      }

      const value = formatImportSectionValue(
        sectionValue,
        statementTerminator,
        sourcePrefixes,
      );

      sections.push({
        key: sectionKey,
        value: !!sectionKey || !sectionPrefix ? value : sectionValue,
        order,
      });
      sectionKey = '';
      sectionValue = '';

      lastLineIndex = index;
      lastCharacterIndex = lines[lastLineIndex].length;
    }

    return isEndImport;
  });

  return {
    formattedText: sectionsToString(sections, statementTerminator),
    firstLineIndex,
    firstCharacterIndex,
    lastLineIndex,
    lastCharacterIndex,
  };
}

export function formatImportSectionValue(
  sectionValue: string,
  statementTerminator = ';',
  sourcePrefixes: string[] = [],
) {
  const separator = statementTerminator + '\n';
  let importStatements = sectionValue
    .split(separator)
    .filter((value) => !!value.trim());

  importStatements = formatImportBySourcePath(
    importStatements,
    statementTerminator,
    sourcePrefixes,
  );

  return importStatements.filter((value) => !!value.trim()).join(separator);
}

export function getMaxLengthFromImportStatement(importValue: string) {
  const lines = importValue.split('\n');

  return Math.max(...lines.map((value) => value.length));
}

export function sectionsToString(
  sections: ImportSection[],
  statementTerminator = ';',
) {
  const separator = statementTerminator + '\n';
  const formattedSections = sections
    .sort((prev, next) => prev.order - next.order)
    .map((section, index) => {
      return section.key
        ? section.key +
            '\n' +
            section.value +
            (index !== sections.length - 1 ? separator : '')
        : section.value;
    })
    .join('');

  return (
    formattedSections.trim() +
    (!formattedSections.trim().endsWith(statementTerminator)
      ? statementTerminator
      : '')
  );
}

export function formatImportBySourcePath(
  importStatements: string[],
  statementTerminator = ';',
  sourcePrefixes: string[] = [],
) {
  let statements: ImportSection[] = [];
  const separator = statementTerminator + '\n';

  if (sourcePrefixes?.length) {
    statements = getStatementGroupListBySign(
      importStatements,
      statementTerminator,
      sourcePrefixes,
    );

    const others = importStatements.filter((statement) => {
      const sourcePath = getSourcePathWithoutQuote(statement);

      return sourcePrefixes.every(
        (sign) => !isSourcePathStartsWithPrefix(sign, sourcePath),
      );
    });

    if (others.length) {
      statements.push({
        key: '',
        value: others
          .sort((prev: string, next: string) => {
            return (
              getMaxLengthFromImportStatement(prev) -
              getMaxLengthFromImportStatement(next)
            );
          })
          .join(separator),
        order: sourcePrefixes.length,
      });
    }
  }

  statements.sort((prev: ImportSection, next: ImportSection) => {
    return prev.order - next.order;
  });

  return statements.map((stm) => stm.value);
}

export function getStatementGroupListBySign(
  importStatements: string[],
  statementTerminator: string,
  sourcePrefixes: string[],
) {
  const separator = statementTerminator + '\n';
  const statements: ImportSection[] = [];

  function addStatement(sign: string, statementGroup: string[], order: number) {
    statements.push({
      key: sign,
      value: statementGroup
        .sort((prev: string, next: string) => {
          return (
            getMaxLengthFromImportStatement(prev) -
            getMaxLengthFromImportStatement(next)
          );
        })
        .join(separator),
      order,
    });
  }

  sourcePrefixes.forEach((sign, index) => {
    const statementGroup = getSortedStatementGroupBySign(
      importStatements,
      sign,
    );

    if (sign === '\\.') {
      const dotGroups: {
        key: string;
        order: number;
        values: string[];
      }[] = [];

      statementGroup.sort((prev: string, next: string) => {
        return (
          getMaxLengthOfAbsoluteSourcePath(prev) -
          getMaxLengthOfAbsoluteSourcePath(next)
        );
      });

      statementGroup.forEach((stm) => {
        const sourcePath = getSourcePathWithoutQuote(stm);

        const firstWordIndex = sourcePath.split('').findIndex((i) => {
          return new RegExp(/\w+/g).test(i);
        });

        const sourceLeadingDots = sourcePath.slice(
          0,
          firstWordIndex === -1 ? sourcePath.length : firstWordIndex,
        );
        const order = sourceLeadingDots.split('/')[0].length;

        if (!dotGroups.find((item) => item.order === order)) {
          dotGroups.push({
            key: sourceLeadingDots,
            order,
            values: [stm],
          });
        } else {
          dotGroups.some((item) => {
            if (item.order === order) {
              item.values.push(stm);
            }

            return item.key === sourceLeadingDots;
          });
        }
      });

      dotGroups.sort((prev, next) => {
        return prev.order - next.order;
      });

      dotGroups.forEach((group) => {
        addStatement(sign, group.values, index);
      });

      return;
    }

    addStatement(sign, statementGroup, index);
  });

  return statements;
}

export function getSortedStatementGroupBySign(
  importStatements: string[],
  sign: string,
) {
  return importStatements
    .filter((statement) => {
      const sourcePath = getSourcePathWithoutQuote(statement);

      return isSourcePathStartsWithPrefix(sign, sourcePath);
    })
    .map((stm) => sortComponentsInsideStatement(stm));
}

export function sortComponentsInsideStatement(statement: string) {
  const isImportStatement = statement
    .replace(/\n/gm, '')
    .match(/^import .+ from .+/gm);

  if (!isImportStatement) {
    return statement;
  }

  let components = statement.split('\n');
  let importStart = [''],
    importEnd = [''];

  if (components.length > 1) {
    importStart = components.splice(
      components.findIndex((value) => value.includes('import {')),
      1,
    );
    importEnd = components.splice(
      components.findIndex((value) => value.includes('} from')),
      1,
    );

    components.sort((prev, next) => prev.length - next.length);

    statement = importStart.concat(components).concat(importEnd).join('\n');
  } else {
    const startBlockSign = '{';
    const endBlockSign = '}';
    const importIndex = statement.indexOf(startBlockSign);
    const fromIndex = statement.indexOf(endBlockSign);
    importStart = [statement.substring(0, importIndex + startBlockSign.length)];
    importEnd = [statement.substring(fromIndex)];
    components = statement
      .substring(importIndex + startBlockSign.length, fromIndex)
      .split(',');

    components = components
      .sort((prev, next) => prev.length - next.length)
      .map(
        (value, index) => value.trim() + (index !== components.length - 1 ? ', ' : ''),
      );

    statement = importStart.concat(components).concat(importEnd).join('');
  }

  return statement;
}

export function getMaxLengthOfAbsoluteSourcePath(importStatement: string) {
  const sourcePath = getSourcePathWithoutQuote(importStatement);

  const firstWordIndex = sourcePath.split('').findIndex((i) => {
    return new RegExp(/\w+/g).test(i);
  });

  if (firstWordIndex === -1) {
    return sourcePath.length - 1;
  } else {
    return firstWordIndex;
  }
}

export function getSourcePathWithoutQuote(importStatement: string) {
  return importStatement.split(/'|"/g)?.[1]?.trim?.()?.replace?.(/'|"/g, '');
}

export function isSourcePathStartsWithPrefix(
  pattern: string,
  sourcePath: string,
) {
  if (!sourcePath) {
    return false;
  }

  return new RegExp(pattern).test(sourcePath.charAt(0));
}
