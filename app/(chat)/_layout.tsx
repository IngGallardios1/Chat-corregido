import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";


export default () => (
    <Tabs screenOptions={{ tabBarActiveTintColor: "#20C020" }}>
        <Tabs.Screen 
            name='chat'
            options={{
                title: 'Chat',
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="comment" color={color} />,
            }} 
        />
        <Tabs.Screen 
            name="users" 
            options={{
                title: "Usuarios",
                tabBarIcon: ({ color }) => <FontAwesome size={28} name="users" color={color} />,
            }}
        />
    </Tabs>
);