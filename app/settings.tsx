import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { Button, Text, TextInput } from "react-native";
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
        <SafeAreaView>
            <Text>Servidor</Text>
            <TextInput
                value={serverAddress}
                onChangeText={setServerAddress}
                placeholder="Direccion del Servidor"
            />
            <Button title="Guardar" onPress={handleSave}/>
        </SafeAreaView>
    );

}