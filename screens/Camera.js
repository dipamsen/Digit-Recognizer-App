import * as React from "react";
import { Button, Image, View, Platform, Text } from "react-native"
import * as ImagePicker from "expo-image-picker"
import * as Permissions from "expo-permissions"

export default class Camera extends React.Component {
  state = {
    pred: null, image: null
  }
  componentDidMount() {
    this.getPermission()
  }
  render() {
    const { pred, image } = this.state
    return (
      <View style={{ marginTop: 100 }}>
        <Button title="Image" onPress={this.getImage} />
        <Image source={image} />
        <Text>Prediction: {pred}</Text>
      </View>
    )
  }
  getPermission = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
      if (status !== "granted") alert("Please allow Camera Permissions from your Settings.")
    }
  }
  getImage = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 1
      });
      if (!res.cancelled) {
        this.setState({ image: res.data })
        this.uploadImage(res.uri)
      }
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * @param {string} uri
   */
  uploadImage = async (uri) => {
    const data = new FormData();
    const filename = uri.split("/").pop();
    const type = `image/${uri.split(".").pop()}`;
    const fileToUpload = { uri: uri, name: filename, type };
    data.append("digit", fileToUpload);
    fetch("https://516130ba9bf8.ngrok.io/predict-digit", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
      .then((res) => res.json())
      .then(result => {
        console.log("Success!", result)
        this.setState({ pred: result.prediction })
      })
      .catch(err => {
        console.error(err);
      })
  }
}