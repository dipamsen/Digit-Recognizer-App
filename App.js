import React from 'react';
import { View } from 'react-native';
import Camera from "./screens/Camera";

export default class App {
  render() {
    return (
      <View>
        <Camera />
      </View>
    );
  }
}