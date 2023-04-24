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
  Icon,
  Alert,
  Image,
  AppInput,
  Container,
  ActivityIndicator,
} from '@components';
import {Launch} from '../../../containers/launch';`,
  noConfigFormattedText: `import 'dayjs';
import Reanimated from 'react-native-reanimated';
import React, {memo, useMemo, forwardRef} from 'react';
// packages
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {FlatList as RNGHFlatList} from 'react-native-gesture-handler';
import {Animated, StyleSheet, FlatList as RNFlatList} from 'react-native';
import './project-configuration';
import './../library-configuration';
import {FlatListProps} from './flat-list.type';
// types
import {Ref} from '../base.type';
// configs
import '../../module-configuration';
import '../../../component-configuration';
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
import {appConfig} from '@app/app.config';`,
};
