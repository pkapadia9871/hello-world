import { useState } from "react";
import { StyleSheet, Text, TextInput, View, Button, ImageBackground, TouchableOpacity, Alert } from "react-native";

import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  const [name, setName] = useState('');

  const [background, setBackground] = useState('');
  const onPress = (color) => setBackground(color);

  const auth = getAuth();

  const signInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("Chat", { userID: result.user.uid /*,
                                    name: name,
                                    color: color,
                                    background: background*/ });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      })
  }


  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/background.png')} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Hello Start!</Text>

        <View style={styles.infoContainer}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Type your username here'
          />
          <Text>Choose your background color:</Text>
          <View style={styles.colorsContainer}>
            <TouchableOpacity
            style={[styles.colorChooser, { backgroundColor: '#090C08'}]}
            onPress={() => onPress('#090C08')}
            />
            <TouchableOpacity
            style={[styles.colorChooser, { backgroundColor: '#474056'}]}
            onPress={() => onPress('#474056')}
            />
            <TouchableOpacity
            style={[styles.colorChooser, { backgroundColor: '#8A95A5'}]}
            onPress={() => onPress('#8A95A5')}
            />
            <TouchableOpacity
            style={[styles.colorChooser, { backgroundColor: '#B9C6AE'}]}
            onPress={() => onPress('#B9C6AE')}
            />
          </View>
        </View>

        <Button
        title="Go to Chat"
        onPress={() => navigation.navigate('Chat', { name: name, background: background })}
        />
      </ImageBackground>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 45,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    margin: 20,
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  colorChooser: {
    borderRadius: 35,
    margin: 10,
    width: 60,
    height: 60,
  },
  colorsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 50/2
  }
});


export default Start;