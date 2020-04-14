import React from 'react';
import { TextInput, StyleSheet, ScrollView, View, Text, NativeEventSubscription } from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Button } from '../components/button';
import {
  ComponentDidAppearEvent,
  ComponentDidDisappearEvent,
  Navigation,
} from 'react-native-navigation';
import { Screen } from '../navigation/constants';

declare var global: { HermesInternal: null | {} };

class App extends React.Component<any, any> {
  state = { value: '' };
  listener?: NativeEventSubscription;

  componentDidMount(): void {
    this.listener = Navigation.events().bindComponent(this);
  }

  componentWillUnmount(): void {
    this.listener?.remove();
  }

  componentDidDisappear(e: ComponentDidDisappearEvent) {
    console.log(e);
  }

  componentDidAppear(e: ComponentDidAppearEvent) {
    console.log(e);
  }

  render() {
    return (
      <>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <TextInput
            value={this.state.value}
            placeholder="placeholderlol"
            onChangeText={(value) => this.setState({ value })}
            testID="rolezao-text"
          />
          <Button
            title="Rolezao"
            onPress={() =>
              Navigation.push(this.props.componentId, {
                component: {
                  name: Screen.WELCOME_2,
                  passProps: {
                    value: this.state.value,
                  },
                  options: {
                    animations: {
                      push: {
                        elementTransitions: [
                          {
                            id: 'slowfadein',
                            alpha: {
                              from: 0, // We don't declare 'to' value as that is the element's current alpha value, here we're essentially animating from 0 to 1
                              duration: 2000,
                              interpolation: 'decelerateAccelerate',
                            },
                            translationY: {
                              from: 16, // Animate translationY from 16dp to 0dp
                              duration: 2000,
                              interpolation: 'decelerateAccelerate',
                            },
                          },
                        ],
                        sharedElementTransitions: [
                          {
                            fromId: 'rolezaodeorigem',
                            toId: 'rolezaodedestino',
                            interpolation: 'accelerateDecelerate',
                            duration: 2000,
                          },
                        ],
                      },
                    },
                    topBar: {
                      title: {
                        text: 'ROLEZAO de destino',
                      },
                    },
                  },
                },
              })
            }
          />
          <Text testID="rolezao-value" nativeID="rolezaodeorigem">
            {this.state.value}
          </Text>
          <View style={styles.body}>
            <View style={styles.sectionContainer} testID="rolezao">
              <Text style={styles.sectionTitle}>Step One</Text>
              <Text style={styles.sectionDescription}>
                Edit <Text style={styles.highlight}>App.tsx</Text> to change
                this screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>See Your Changes</Text>
              <Text style={styles.sectionDescription}>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Debug</Text>
              <Text style={styles.sectionDescription}>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Learn More</Text>
              <Text style={styles.sectionDescription}>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
