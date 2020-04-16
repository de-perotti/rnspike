import { Navigation } from 'react-native-navigation';
import { Colors } from '../../theme/tokens/colors';

export function registerNavigationTheme() {
  Navigation.setDefaultOptions({
    statusBar: {
      visible: true,
      backgroundColor: Colors.primary,
    },
    topBar: {
      title: {
        color: Colors.white,
      },
      background: {
        color: Colors.primary,
      },
    },
    bottomTab: {
      fontSize: 20,
      selectedFontSize: 20,
    },
  });
}
