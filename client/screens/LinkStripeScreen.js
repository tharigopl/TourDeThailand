import { SafeAreaView, StyleSheet, Text, View, FlatList, Pressable, Button } from 'react-native';
import React from 'react';
import { Feather } from "@expo/vector-icons";
import GoalComponent from '../components/GoalComponent';
import { linkStripe } from '../util/stripe';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../store/auth-context';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';


export default function LinkStripeScreen() {

    const [stAccOnBoardingUrl, setStAccOnBoardingUrl] = useState(null);

    const [output, setOutput] = useState(null);

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;
    console.log("Token &&&&&&&", token);
   
      useEffect(() => {
        console.log("Stripe Dashboard UseEffect");
        async function linkStripeAcc() {
            try {
            const stripeDash = await linkStripe(token);
            //setFetchedAccounts(accounts);
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!",stripeDash.data.accountLink.accountLink.url);
            setStAccOnBoardingUrl(stripeDash.data.accountLink.accountLink.url);
            
            const result = await WebBrowser.openBrowserAsync(stripeDash.data.accountLink.accountLink.url);
                console.log("Linkine", Linking.createURL(""));
                setOutput(result);

           // const result = await WebBrowser.openAuthSessionAsync(`${stripeDash.data.accountLink.accountLink.url}?linkingUri=${Linking.createURL('/?')}`);
            //console.log("Result ", result);
            //   let redirectData;
            //   if (result.url) {
            //     redirectData = Linking.parse(result.url);
            //   }
        
            //   setstate({ result, redirectData });

            } catch (error) {
                //setError('Could not fetch dashoard!');
            }
        }

        linkStripeAcc();
        }, []);


  return (
    <SafeAreaView style={styles.linkstripescreen}>
    <Text>{output && JSON.stringify(output)}</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    linkstripescreen: {
        backgroundColor: "#F7F7F7",
        flex: 1,
        padding: 10,
        position: "relative",
    },
    goalstopContainer: {
        backgroundColor: "#F7F7F7",
        height: 70,
        width: "100%",
        padding: 20,
        justifyContent: "center",
        marginBottom: 15,
        elevation: 2,
    },
    goalsheader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    goalsheading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "green",
    },
    goallistContainer: {
        paddingHorizontal: 10,
        flexDirection: "row",
    },
    goalemptyContainer: {
        width: "100%",
        height: "80%",
        alignItems: "center",
        justifyContent: "center",
    },
    goalemptyText: { fontWeight: "bold", fontSize: 24, paddingBottom: 30 },
    messagingscreen: {
        flex: 1,
    },
})