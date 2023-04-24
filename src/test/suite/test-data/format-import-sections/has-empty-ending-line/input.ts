import { DEFAULT_DATA } from '../../constants';

export const input = {
  text: DEFAULT_DATA.INPUT + '\n',
  config: {
    sourcePrefixes: ['@', '\\w+', '\\.'],
    sectionPrefix: '// ',
    sectionNames: [
      'packages',
      'types',
      'classes',
      'configs',
      'contexts',
      'stores',
      'helpers',
      'hooks',
      'networks',
      'navigation',
      'constants',
      'components',
      'styles',
      'images',
      'others',
    ],
    startImportBlockSign: '',
    endImportBlockSign: '',
    statementTerminator: ';',
  },
};
