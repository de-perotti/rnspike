import { Navigation } from 'react-native-navigation';
import { Colors } from '../../theme/tokens/colors';

export function registerNavigationTheme() {
  Navigation.setDefaultOptions({
    statusBar: {
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
