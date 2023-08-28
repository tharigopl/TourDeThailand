import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Button,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import GoalComponent from "../components/GoalComponent";
import { linkStripe } from "../util/stripe";
import { getStripeAccount } from "../util/stripe";
import { getUserLoc } from "../util/auth";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import { StripeContext } from "../store/stripe-context";
import { WebView } from "react-native-webview";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import Constants from "expo-constants";
import { GlobalStyles } from "../constants/styles";

export default function LinkStripeScreen() {
  const [stAccOnBoardingUrl, setStAccOnBoardingUrl] = useState(null);

  const [output, setOutput] = useState(null);
  const [stripeaccount, setStripeAccount] = useState(null);

  const authCtx = useContext(AuthContext);
  const stripeCtx = useContext(StripeContext);
  const token = authCtx.token;
  console.log("Token &&&&&&&", authCtx);
  console.log("Stripe Ctx Account &&&&&&&", stripeCtx);

  useEffect(() => {
    async function linkStripeAcc() {
      try {
        if (authCtx.stripeuserid === "undefined") {
          console.log("*********************1");
          // const stripeDash = await linkStripe(token);
          // //setFetchedAccounts(accounts);
          // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!", stripeDash);
          // stripeCtx.setstripeaccount(JSON.stringify(stripeDash));
          // console.log("############################", stripeCtx.stripeaccount);
          // //setStAccOnBoardingUrl(stripeDash.data.accountLink.accountLink.url);

          // const result = await WebBrowser.openBrowserAsync(stripeDash.accountLink.url);

          // console.log("Linkine", Linking.createURL(""));
          // setOutput(result);
        } else {
          console.log("*********************2", authCtx.stripeuserid);
          const stripeDash = await getStripeAccount(
            token,
            authCtx.stripeuserid
          );
          console.log("************************", stripeDash);
          stripeCtx.setstripeaccount(stripeDash);
          setStripeAccount(stripeDash);
        }
      } catch (error) {
        //setError('Could not fetch dashoard!');
      }
    }

    linkStripeAcc();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        //paddingHorizontal:20,
        //paddingVertical:35,
         paddingTop: 40,
         paddingBottom: 20,
         paddingLeft: 20,
         paddingRight: 20,
        backgroundColor: GlobalStyles.colors.primary800,
      },
  linkstripescreen: {
    backgroundColor: "#F7F7F7",
    flex: 1,
    padding: 10,
    position: "relative",
  },
});
