import * as React from "react";
import { Button, Image, View, Platform } from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"

export default class Camera extends React.Component {
  state = {
    image: null
  }
  render() {
    const { image } = this.state
    return (
      <View>
        <Button title="Image" />
      </View>
    )
  }
}