import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as ImageManipulator from "expo-image-manipulator";
import * as FileSystem from "expo-file-system";

export default function ImageResizerScreen({ navigation, route }) {
  const [resizedImageUri, setResizedImageUri] = useState(null);
  const { image: initialImageUri } = route.params;

  const resizeImage = async () => {
    try {
      const resizedImage = await ImageManipulator.manipulateAsync(
        initialImageUri,
        [{ resize: { width: 500, height: 300 } }],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      setResizedImageUri(resizedImage.uri);
    } catch (error) {
      console.error("Error resizing the image: ", error);
    }
  };

  return (
    <LinearGradient
      colors={["#596f62", "#7ea16b"]}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <TouchableOpacity style={styles.button} onPress={resizeImage}>
        <Text style={styles.buttonText}>Resize image</Text>
      </TouchableOpacity>
      {resizedImageUri && (
        <Image
          source={{ uri: resizedImageUri }}
          style={{ width: 200, height: 200 }}
        />
      )}
    </LinearGradient>
  );
}

ImageResizerScreen.navigationOptions = {
  headerTitle: () => (
    <Text style={{ fontSize: 24, color: "#fff", textAlign: "center" }}>
      Resize Image
    </Text>
  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1c3144",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 5
  },
  buttonText: {
    color: "#fff"
  }
});
