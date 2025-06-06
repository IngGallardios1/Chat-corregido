import React, { useState, useEffect } from "react";
import { ActivityIndicator, StyleSheet, TextInput, Text, View, ViewStyle, FlatList, TouchableOpacity } from "react-native";
import { connectSocket } from "../../src/socket";
import { Socket } from "socket.io-client";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChatMessage } from "../../src/models/chatMessage";
import { useLocalSearchParams } from "expo-router";
import { Send } from "lucide-react-native";

type MessageBubbleProps = {
  chatMessage: ChatMessage,
  mySocketId?: string
}

const MessageBubble = ({chatMessage, mySocketId}: MessageBubbleProps) => {
  const ownMessage = chatMessage.socketId === mySocketId;

  return (
    <View style={[styles.messageContainer, ownMessage ? styles.ownMessageContainer : styles.otherMessageContainer]}>
      {!ownMessage && <Text style={styles.username}>{chatMessage.user}</Text>}
      <View style={[
        styles.messageBubble,
        ownMessage ? styles.ownMessage : styles.otherMessage
      ]}>
        <Text style={[styles.messageText, ownMessage ? styles.ownMessageText : styles.otherMessageText]}>
          {chatMessage.message}
        </Text>
      </View>
    </View>
  );
}; 

type lsp = {
  user: string;
};

export default function ChatScreen() {
  const { user } = useLocalSearchParams<lsp>();
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [mySocketId, setMySocketId] = useState<string>();

  useEffect(() => {
    connectSocket(user)
      .then((socketInstance) => {
        setSocket(socketInstance);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error conectando socket:", error));
    return () => {
      socket?.disconnect();
    };
  }, []);

  useEffect(() => {
    socket?.on("connect", () => {
      setMySocketId(socket?.id);
    });
    if (!socket) return;
    const handleMessage = (newMessage: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };
    socket.on("message", handleMessage);
    return () => {
      socket.off("message", handleMessage);
    };
  }, [socket]);

  const sendMessage = () => {
    if (message.trim()) {
      socket?.emit("message", message);
      setMessage("");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sala de Chat</Text>
        <Text style={styles.headerSubtitle}>Conectado como {user}</Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <MessageBubble chatMessage={item} mySocketId={mySocketId}/>
        )}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Escribe un mensaje..."
          style={styles.input}
          onChangeText={setMessage}
          value={message}
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, !message.trim() && styles.sendButtonDisabled]} 
          onPress={sendMessage}
          disabled={!message.trim()}
        >
          <Send size={20} color={message.trim() ? "#fff" : "#A0A0A0"} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333'
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2
  },
  messagesList: {
    flex: 1
  },
  messagesContent: {
    padding: 15,
    gap: 10
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 2
  },
  ownMessageContainer: {
    alignSelf: 'flex-end'
  },
  otherMessageContainer: {
    alignSelf: 'flex-start'
  },
  username: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
    marginLeft: 4
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
    maxWidth: '100%'
  },
  ownMessage: {
    backgroundColor: '#007AFF',
    borderBottomRightRadius: 4
  },
  otherMessage: {
    backgroundColor: '#E8E8E8',
    borderBottomLeftRadius: 4
  },
  messageText: {
    fontSize: 16
  },
  ownMessageText: {
    color: '#fff'
  },
  otherMessageText: {
    color: '#333'
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 10,
    alignItems: 'flex-end'
  },
  input: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16
  },
  sendButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendButtonDisabled: {
    backgroundColor: '#E8E8E8'
  }
} as const);