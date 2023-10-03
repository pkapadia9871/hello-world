import { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity} from 'react-native';

const Start = ({ navigation }) => {
  const [name, setName] = useState('');

  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

  return (
    <ImageBackground source={require('../assets/icon.png')} resizeMode="cover" style={styles.image}>
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}></TouchableOpacity>
      <Text>Hello Start!</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder='Type your username here'
      />
      <Button
        title="Go to Chat"
        onPress={() => navigation.navigate('Chat', { name: name})}
      />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  textInput: {
    width: "88%",
    padding: 15,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 15,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    borderRadius: 50/2
  },
});

export default Start;