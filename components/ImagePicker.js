import React from "react";
import { Text, Image, View, TouchableOpacity, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

function ImagePickerScreen({ navigation }) {
  const [image, setImage] = React.useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      let selectedImage = result.assets[0];
      console.log("About to navigate with image uri: ", selectedImage.uri);
      setImage(selectedImage.uri);
      navigation.navigate("ResizeImage", { image: selectedImage.uri });
    }
  };

  return (
    <LinearGradient
      colors={["#596f62", "#7ea16b"]}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      {!image && <MaterialIcons name='camera' size={100} color='white' />}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an image from gallery</Text>
      </TouchableOpacity>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </LinearGradient>
  );
}

ImagePickerScreen.navigationOptions = {
  headerTitle: () => (
    <Text style={{ fontSize: 24, color: "#fff", textAlign: "center" }}>
      Pick Image
    </Text>
  )
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#1c3144",
    padding: 10,
    borderRadius: 5,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff"
  }
});

export default ImagePickerScreen;
