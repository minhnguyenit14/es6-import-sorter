import { DEFAULT_DATA } from '../../constants';

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
  },
  text:
    DEFAULT_DATA.INPUT +
    `\nif (__DEV__) {
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
