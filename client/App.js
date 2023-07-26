import { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import Chat from './screens/Chat';
import { Colors } from './constants/styles';
import AuthContextProvider, { AuthContext } from './store/auth-context';
import IconButton from './components/ui/IconButton';
import HomeScreen from './screens/HomeScreen';
import ThaiTripScreen from './screens/ThaiTripScreen';
import GroupChatScreen from './screens/GroupChatScreen';
import LinkStripeScreen from './screens/LinkStripeScreen';
import LinkStripeWebViewScreen from './screens/LinkStripeWebViewScreen';
import StripeContextProvider from './store/stripe-context';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
function DrawerNavig(){
  const authCtx = useContext(AuthContext);
  return(
  <Drawer.Navigator initialRouteName="TourDeThailandD">
      <Drawer.Screen name="TourDeThailandD" component={HomeScreen} 
        options = {{
          drawerIcon: ({focused, size}) => (
            <IconButton
              icon="exit"
              size={24}
              onPress={authCtx.logout}
            />
         )
        }}
      />
      <Drawer.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Drawer.Screen name="Chat" component={Chat} />
      <Drawer.Screen name="ThaiTrip" component={ThaiTripScreen} />
    </Drawer.Navigator>
    );
}

function StackNavig(){
  const authCtx = useContext(AuthContext);
  return(
  <Stack.Navigator initialRouteName="TourDeThailand">
      <Stack.Screen name="TourDeThailand" component={HomeScreen} 
        options = {{
          
        //   headerRight: ({focused, size}) => (
        //     <IconButton
        //       icon="exit"
        //       size={24}
        //       onPress={authCtx.logout}
        //     />
        //  )
        }}
      />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="Chat" component={Chat} />
      <Stack.Screen name="ThaiTrip" component={ThaiTripScreen} />
      <Stack.Screen name="GroupChatScreen" component={GroupChatScreen} />
      <Stack.Screen name="LinkStripeScreen" component={LinkStripeScreen} />
      <Stack.Screen name="LinkStripeWebViewScreen" component={LinkStripeWebViewScreen} />
    </Stack.Navigator>
    );
}
function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Drawer.Navigator screenOptions={{ headerStyle: { backgroundColor: 'papayawhip' }, headerRight: ({tintColor}) => <IconButton icon="exit" color={tintColor} size={24} onPress={authCtx.logout}/>}}>
      {/* <Stack.Screen name="TourDeThailand" component={DrawerNavig} 
        options={{
          headerRight: ({tintColor}) => <IconButton icon="exit" color={tintColor} size={24} onPress={authCtx.logout}/>,
        }}
      /> */}
      <Drawer.Screen name="TDT" component={StackNavig} /> 
      <Drawer.Screen name="Chat1" component={Chat} />
      <Drawer.Screen name="ThaiTrip" component={ThaiTripScreen} />
    </Drawer.Navigator>    
  );
}
function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}
function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        authCtx.authenticate(storedToken);
      }
      setIsTryingLogin(false);
    }
    fetchToken();
  }, []);
  if (isTryingLogin) {
    return <AppLoading />;
  }
  return <Navigation />;
}
export default function App() {
  
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <StripeContextProvider>
          <Root />
        </StripeContextProvider>
      </AuthContextProvider>
    </>
  );
}
