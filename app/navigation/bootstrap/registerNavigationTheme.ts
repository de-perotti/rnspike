import { Navigation } from 'react-native-navigation';

export function registerNavigationTheme() {
  Navigation.setDefaultOptions({
    statusBar: {
      visible: true,
      backgroundColor: '#ffffff',
    },
    topBar: {
      title: {
        color: '#000000',
      },
      background: {
        color: '#ffffff',
      },
    },
    bottomTab: {
      fontSize: 20,
      selectedFontSize: 20,
    },
  });
}
