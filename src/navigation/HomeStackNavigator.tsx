import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "@screens/HomeScreen";
import ProductDetailScreen from "@screens/ProductDetailScreen";

export type HomeStackParamList = {
    Home: undefined;
    ProductDetail: { productId: string };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

interface Props {
    onLogout: () => void;
}

const HomeStackNavigator = ({ onLogout }: Props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" options={{ headerShown: false }}>
                {/* Truyền trực tiếp props vào HomeScreen, TypeScript sẽ nhận diện chính xác */}
                {(props) => <HomeScreen {...props} onLogout={onLogout} />}
            </Stack.Screen>
            <Stack.Screen
                name="ProductDetail"
                component={ProductDetailScreen}
                options={{ title: "Chi tiết sản phẩm" }}
            />
        </Stack.Navigator>
    );
};

export default HomeStackNavigator;