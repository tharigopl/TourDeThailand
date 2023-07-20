import { useContext, useState } from 'react';
import { Alert, ImageBackground, StyleSheet } from 'react-native';
import { Link } from '@react-navigation/native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { login } from '../util/auth';
import { logintdtserver } from '../util/auth';

function LoginScreen({navigation}) {
  const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    console.log("login")
    setIsAuthenticating(true);
    try {
      const token = await logintdtserver(email, password);
      //const token = await login(email, password);
      authCtx.authenticate(token.data.token);
      console.log("login1", token.data.token)
      if(token.data == 'You entered the wrong password.'){
        console.log("indie if")
        navigation.navigate('Login')
        Alert.alert(
          'Authentication failed!',
          'Could not log you in. Please check your credentials or try again later!'
        );
      }
    } catch (error) {
      console.log("login2")
      Alert.alert(
        'Authentication failed!',
        'Could not log you in. Please check your credentials or try again later!'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging you in..." />;
  }

  return  (
      //<View>
      <ImageBackground source={require("../assets/wordcloud.png")} resizeMode="cover" style={styles.image}>
        <AuthContent isLogin onAuthenticate={loginHandler} />
        </ImageBackground>
      //</View>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});