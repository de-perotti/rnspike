import { Screen } from './constants';
import { LayoutRoot } from 'react-native-navigation';

export const DefaultRoot: LayoutRoot = {
  root: {
    sideMenu: {
      right: {
        component: {
          name: Screen.SIDE_MENU,
        },
      },
      left: {
        component: {
          name: Screen.SIDE_MENU,
        },
      },
      center: {
        stack: {
          children: [
            {
              component: {
                id: 'one',
                name: Screen.WELCOME,
                options: {
                  topBar: {
                    title: {
                      text: 'Home',
                    },
                  },
                  bottomTab: {
                    text: 'First',
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
};
