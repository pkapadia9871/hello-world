// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

import { useNetInfo } from '@react-native-community/netinfo';

import { useState, useEffect } from 'react';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);


// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {

    const connectionStatus = useNetInfo();

    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCj_sNlh7Rd44r-xtLVj0pGX5jXc6LKiEE",
      authDomain: "chatapp-e5a0f.firebaseapp.com",
      projectId: "chatapp-e5a0f",
      storageBucket: "chatapp-e5a0f.appspot.com",
      messagingSenderId: "123306425797",
      appId: "1:123306425797:web:5d76fc6d70de2b17e4dfac"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    useEffect(() => {
      if (connectionStatus.isConnected === false) {
        Alert.alert("Connection Lost!!");
        disableNetwork(db);
      } else if (connectionStatus.isConnected === true) {
        enableNetwork(db);
      }
    }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat">
          {props => <Chat db={db} isConnected={connectionStatus.isConnected} {...props} />}
          </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );

}

export default App;
