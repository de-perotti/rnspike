import React from 'react';
import { TextInput, ScrollView, Text } from 'react-native';
import {
  ComponentDidAppearEvent,
  ComponentDidDisappearEvent,
  Navigation,
} from 'react-native-navigation';
import { EventSubscription } from 'react-native-navigation/lib/src/interfaces/EventSubscription';

class App extends React.Component<any, any> {
  state = { value: '' };
  listener?: EventSubscription;

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
          nativeID="slowfadein"
        >
          <TextInput
            value={this.state.value}
            placeholder="placeholderlol"
            onChangeText={(value) => this.setState({ value })}
            testID="rolezao-text"
          />

          <Text testID="rolezao-value" nativeID="rolezaodedestino">
            {this.props.value}
          </Text>

          <Text>
            Read the docs to discover what to do next:
          </Text>

          <Text>
            Read the docs to discover what to do next:
          </Text>

          <Text>
            Read the docs to discover what to do next:
          </Text>

          <Text>
            Read the docs to discover what to do next:
          </Text>

          <Text>
            Read the docs to discover what to do next:
          </Text>

          <Text>
            Read the docs to discover what to do next:
          </Text>

          <Text>
            Read the docs to discover what to do next:
          </Text>
        </ScrollView>
      </>
    );
  }
}

export default App;
