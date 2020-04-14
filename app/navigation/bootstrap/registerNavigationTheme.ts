import { Navigation } from 'react-native-navigation';
import { Colors } from '../../theme/tokens/colors';

export function registerNavigationTheme() {
  Navigation.setDefaultOptions({
    // animations: {
    //   push: {
    //     content: {
    //       translationX: {
    //         from: require('react-native').Dimensions.get('window').width,
    //         to: 0,
    //         duration: 2000,
    //         interpolation: 'decelerate',
    //       },
    //       translationY: {
    //         from: require('react-native').Dimensions.get('window').width,
    //         to: 0,
    //         duration: 2000,
    //         interpolation: 'accelerate',
    //       },
    //       alpha: {
    //         from: 0,
    //         to: 1,
    //         duration: 2000,
    //         interpolation: 'accelerate',
    //       },
    //     },
    //   },
    //   pop: {
    //     content: {
    //       translationX: {
    //         to: require('react-native').Dimensions.get('window').width,
    //         from: 0,
    //         duration: 2000,
    //         interpolation: 'accelerate',
    //       },
    //       translationY: {
    //         to: require('react-native').Dimensions.get('window').width,
    //         from: 0,
    //         duration: 2000,
    //         interpolation: 'decelerate',
    //       },
    //       alpha: {
    //         from: 1,
    //         to: 0,
    //         duration: 2000,
    //         interpolation: 'decelerate',
    //       },
    //     },
    //   },
    // },
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
