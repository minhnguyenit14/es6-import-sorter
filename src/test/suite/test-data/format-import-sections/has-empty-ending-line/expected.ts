export const expected = {
  firstLineIndex: 0,
  firstCharacterIndex: 0,
  lastLineIndex: 25,
  lastCharacterIndex: 21,
  formattedText: `import React, {forwardRef, memo, useMemo} from 'react';
import {StyleSheet, FlatList as RNFlatList, Animated} from 'react-native';
// packages
import Reanimated from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList as RNGHFlatList} from 'react-native-gesture-handler';
// types
import {FlatListProps} from './flat-list.type';
import {Ref} from '../base.type';
// configs
import {appConfig} from '@app/app.config';
import 'dayjs';
import './project-configuration';
import './../library-configuration';
import '../../module-configuration';
import '../../../component-configuration';
// components
import {
  ActivityIndicator,
  Alert,
  Container,
  Icon,
  Image,
  AppInput,
} from '@components';
import {Launch} from '../../../containers/launch';
`,
};
