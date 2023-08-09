import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ImageResizer from '../components/ImageResizer';
import ImagePicker from '../components/ImagePicker';

const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="PickImage">
      <Stack.Screen name="PickImage" component={ImagePicker} />
      <Stack.Screen name="ResizeImage" component={ImageResizer} />
    </Stack.Navigator>
  );
}

export default MainNavigator;
