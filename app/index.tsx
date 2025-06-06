import { Link, Stack } from 'expo-router';
import { useState } from 'react';
import { Button, Text, StyleSheet, TextInput, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default () => {
    const [username, setUsername] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.content}>
                <Image 
                    source={{ uri: 'https://images.pexels.com/photos/7014924/pexels-photo-7014924.jpeg' }}
                    style={styles.image}
                />
                <Text style={styles.title}>Welcome to ChatApp</Text>
                <Text style={styles.subtitle}>Connect with people around the world</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Enter your username"
                        value={username}
                        onChangeText={t => setUsername(t)}
                        style={styles.input}
                        placeholderTextColor="#666"
                    />
                    <Link href={{ pathname: "/chat", params: { user: username } }} asChild>
                        <Button title="Join Chat" />
                    </Link>
                </View>
                <Link href="/settings" style={styles.settingsLink}>
                    <Text style={styles.link}>Settings</Text>
                </Link>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 30
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333'
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center'
    },
    inputContainer: {
        width: '100%',
        maxWidth: 300,
        gap: 15
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        backgroundColor: 'white',
        fontSize: 16
    },
    settingsLink: {
        marginTop: 20
    },
    link: {
        color: '#007AFF',
        fontSize: 16
    }
});