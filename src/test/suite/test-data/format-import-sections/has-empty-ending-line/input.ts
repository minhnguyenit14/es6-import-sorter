export const input = {
  text: `import React, {forwardRef, memo, useMemo} from 'react';
import {StyleSheet, FlatList as RNFlatList, Animated} from 'react-native';
// packages
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Reanimated from 'react-native-reanimated';
import {FlatList as RNGHFlatList} from 'react-native-gesture-handler';
// configs
import '../../module-configuration';
import './../library-configuration';
import 'dayjs';
import '../../../component-configuration';
import './project-configuration';
import {appConfig} from '@app/app.config';
// types
import {Ref} from '../base.type';
import {FlatListProps} from './flat-list.type';
// components
import {Launch} from '../../../containers/launch';
import {
ActivityIndicator,
  Alert,
  Container,
  Icon,
  Image,
  AppInput,
} from '@components';
`,
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
    preCommands: ['npx prettier --write'],
  },
};
