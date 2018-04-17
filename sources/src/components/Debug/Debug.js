import React, { Component } from 'react';
import { Button, Text, TouchableWithoutFeedback, View } from 'react-native';
import { withNavigation } from 'react-navigation';

class Debug extends Component {
  constructor(props) {
    super(props);
    this.threshold = 5;
    this.onTap = this.onTap.bind(this);
    this.onHide = this.onHide.bind(this);
    this.state = {
      tapCount: 0,
    };
  }

  onTap() {
    this.setState(({ tapCount }) => ({
      tapCount: tapCount + 1,
    }));
  }

  onHide() {
    this.setState({
      tapCount: 0,
    });
  }

  render() {
    const { tapCount } = this.state;
    if (tapCount < this.threshold) {
      return (
        <TouchableWithoutFeedback onPress={this.onTap}>
          <View>
            <Text>I'm just a text, don't tap me</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
    return (
      <View>
        <Button
          onPress={() => this.props.navigation.navigate('EnvVars')}
          title="Variables"
        />
        <Button onPress={this.onHide} title="Hide Debug" />
      </View>
    );
  }
}

export default withNavigation(Debug);
