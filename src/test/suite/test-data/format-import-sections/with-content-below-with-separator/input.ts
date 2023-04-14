export const input = {
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

if (__DEV__) {
  import('./reactotron.config').then(() => {
    console.log('Reactotron Configured');
  });
}

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flashMessageTitle: {
    fontSize: fontScale(14),
    lineHeight: fontScale(18),
  },
});

const App = () => {
  const handleOpeningNotification = useCallback((notification: OpenedEvent) => {
    console.log(notification);
  }, []);

  const handleAddPushToken = useCallback((device: DeviceState | null) => {
    console.log(device);
  }, []);

  useOneSignal(
    appConfig.oneSignalAppId,
    handleOpeningNotification,
    handleAddPushToken,
  );

  useBranch(() => {});

  return (
    <Provider store={store}>
      <ThemeProvider initial={BASE_LIGHT_THEME}>
        <AlertContextProvider>
          <ImagePickerContextProvider>
            <SafeAreaProvider>
              <StatusBar />
              <GestureHandlerRootView style={styles.container}>
                <RootNavigator />

                <CustomImagePicker />
                <CodePushModal />
                <CustomAlert />
                <SafeAreaInsetsContext.Consumer>
                  {(insets) => (
                    <FlashMessage
                      style={{
                        paddingTop: insets?.top,
                      }}
                      titleStyle={styles.flashMessageTitle}
                    />
                  )}
                </SafeAreaInsetsContext.Consumer>
              </GestureHandlerRootView>
            </SafeAreaProvider>
          </ImagePickerContextProvider>
        </AlertContextProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default codePush({checkFrequency: codePush.CheckFrequency.MANUAL})(App);`,
};
