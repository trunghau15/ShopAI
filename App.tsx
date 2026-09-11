import React, { useState } from "react";
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@contexts/ThemeContext";
import LoginScreen from "@screens/LoginScreen";
import RegisterScreen from "@screens/RegisterScreen";
import MainTabNavigator from "@navigation/MainTabNavigator";

const AuthStack = createNativeStackNavigator();

// Cấu hình Deep Linking tối giản (shopai://product/123)
const linking: LinkingOptions<any> = {
  prefixes: ["shopai://"],
  config: {
    screens: {
      HomeTab: {
        screens: {
          ProductDetail: "product/:productId",
        },
      },
    },
  },
};

export default function App() {
  const [userToken, setUserToken] = useState<string | null>(null);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <NavigationContainer linking={linking}>
          {userToken == null ? (
            // CHƯA ĐĂNG NHẬP: Hiển thị AuthStack (Login / Register)
            <AuthStack.Navigator screenOptions={{ headerShown: false }}>
              <AuthStack.Screen name="Login">
                {({ navigation }) => (
                  <LoginScreen
                    onLogin={(token) => setUserToken(token)}
                    onGoRegister={() => navigation.navigate("Register")}
                  />
                )}
              </AuthStack.Screen>
              <AuthStack.Screen name="Register">
                {({ navigation }) => (
                  <RegisterScreen
                    onRegistered={(token) => setUserToken(token)}
                    onGoLogin={() => navigation.navigate("Login")}
                  />
                )}
              </AuthStack.Screen>
            </AuthStack.Navigator>
          ) : (
            // ĐÃ ĐĂNG NHẬP: Cấp thẳng MainTabNavigator (Trang chủ + Giỏ hàng)
            <MainTabNavigator
              onLogout={() => setUserToken(null)}
              cartBadgeCount={0}
            />
          )}
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}