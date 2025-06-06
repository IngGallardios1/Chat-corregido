import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { Button, Text, TextInput, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default () => {
    const router = useRouter();
    const [serverAddress, setServerAddress] = useState("http://localhost:3000");

    
    useEffect(() => {
        (async () => {
            const localServerAddress = await AsyncStorage.getItem("serverAddress");
            if (localServerAddress){
                setServerAddress(localServerAddress);
            }
        })();
    }, []);

    const handleSave = async () => {
        try{
            await AsyncStorage.setItem("serverAddress",serverAddress);
            router.back();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Configuración del Servidor</Text>
                <TextInput
                    value={serverAddress}
                    onChangeText={setServerAddress}
                    placeholder="Dirección del Servidor"
                    style={styles.input}
                />
                <Button title="Guardar" onPress={handleSave}/>
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
        padding: 20,
        gap: 15
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        backgroundColor: 'white',
        fontSize: 16,
        marginBottom: 20
    }
});