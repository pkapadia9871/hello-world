import { useState, useEffect } from "react";
import { StyleSheet, View, Platform, KeyboardAvoidingView, Text } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { collection, addDoc, onSnapshot, query, where, orderBy } from "firebase/firestore";
import CustomActions from './CustomActions';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const [messages, setMessages] = useState([]);
  const { name, user, color, background } = route.params;

  let unsubMessages;

  useEffect(() => {

    if (isConnected === true) {
    navigation.setOptions({ title: name });
    if (unsubMessages) unsubMessages();
    unsubMessages = null;
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        });
      })
      cacheMessages(newMessages);
      setMessages(newMessages);
    })
  }
  else loadCachedMessages();

    return () => {
      if (unsubMessages) unsubMessages();
    }
   }, [isConnected]);

   const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedMessages));
  }

  const cacheMessages = async (listsToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(listsToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
   }

    const onSend = (newMessages) => {
      addDoc(collection(db, "messages"), newMessages[0])
    }

  const renderBubble = (props) => {
    return <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#000"
        },
        left: {
          backgroundColor: "#FFF"
        }
      }}
    />
  }

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} />
  };

  const renderCustomView = (props) => {
    const { currentMessage} = props;
    if (currentMessage.location) {
      return (
          <MapView
            style={{width: 150,
              height: 100,
              borderRadius: 13,
              margin: 3}}
            region={{
              latitude: currentMessage.location.latitude,
              longitude: currentMessage.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      );
    }
    return null;
  }
  

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.GiftedChatContainer}>
        <GiftedChat
          messages={messages}
          renderInputToolbar={renderInputToolbar}
          renderBubble={renderBubble}
          renderActions={renderCustomActions}
          renderCustomView={renderCustomView}
          onSend={messages => onSend(messages)}
          user={{
            _id: 1,
            name
          }}
        />
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    justifyContent: 'center',
    alignItems: 'center'
  },
  GiftedChatContainer: {
    flex: 1,
    width: '90%',
    paddingBottom: 20,
    justifyContent: 'center'
  }
});

export default Chat;