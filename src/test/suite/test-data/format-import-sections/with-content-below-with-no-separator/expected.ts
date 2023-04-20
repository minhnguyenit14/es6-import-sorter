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

export default codePush({checkFrequency: codePush.CheckFrequency.MANUAL})(App);
`,
};
