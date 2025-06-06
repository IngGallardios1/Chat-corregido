import { Link, Stack } from 'expo-router';
import { useState } from 'react';
import { Button, Text, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default () => {
    const [username, setUsername] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <Text>Bienvenido al chat</Text>
            <TextInput
                placeholder="Usuario"
                value={username}
                onChangeText={t => setUsername(t)}
                style={styles.input}
            />
            <Link href={{ pathname: "/chat", params: { user: username } }} asChild>
                <Button title="Entrar" />
            </Link>
            <Link href="/settings">
                <Text style={styles.link}>Configuración</Text>
            </Link>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    },
    input: {
        borderWidth: 1,
        padding: 8,
        width: 200,
        marginBottom: 10
    },
    link: {
        marginTop: 10,
        color: 'blue'
    }
});