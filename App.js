import React from 'react';
import { View } from 'react-native';
import Camera from "./screens/Camera";

export default class App extends React.Component {
  render() {
    return (
      <View>
        <Camera />
      </View>
    );
  }
}