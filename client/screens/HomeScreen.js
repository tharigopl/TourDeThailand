import { FlatList, View, Text } from 'react-native';
import HomeGridTile from '../components/HomeGridTile';
import axios from 'axios';

import { HOMECATEGORIES } from '../data/dummy-data';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../store/auth-context';
import { StripeContext } from '../store/stripe-context';
import { fetchUserDetails } from '../util/http';
import { linkStripe } from '../util/stripe';
import { getStripeAccount } from '../util/stripe';
import { UserContext } from '../store/user-context'; 
import * as WebBrowser from 'expo-web-browser';


function HomeScreen({ navigation }) {
  console.log("Home Screen")
    const [fetchedMessage, setFetchedMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();
    const stripeCtx = useContext(StripeContext);

    const authCtx = useContext(AuthContext);
    const usersCtx = useContext(UserContext);
    const token = authCtx.token;
    const uid = authCtx.uid;

    const [editedUserId, setEditedUserId] = useState("");
    const [selectedUser, setSelectedUser] = useState([]);
    console.log("Home Screen Token ", token);

    useEffect(() => {
      async function getUserDetails() {
        // setIsFetching(true);
        // try {
        //   //console.log("Inside User Details "+token);
        //   console.log("Inside UID  1"+uid, token);
        //   const userDetail = await fetchUserDetails(token);
        //   setSelectedUser(userDetail);
        //   console.log("User Detail fetched ", userDetail);
        //   console.log("User Detail fetched 1", userDetail[0]);
        //   console.log("User Detail fetched 2", userDetail[0].id);
        //   setEditedUserId(userDetail[0].id)
        //   usersCtx.setUsers(userDetail);
        //   console.log("User Context", usersCtx.users);
        //  /*  if(userDetail.length > 0){
        //     setIsEditing(true);
        //     console.log("User Detail fetched 1", userDetail);
        //     setEditedUserId(selectedUser.id)
        //   } */
        //   //setFetchedAccounts(accounts);
        // } catch (error) {
        //   setError('Could not fetch accounts!');
        // }
        // setIsFetching(false);
      }
  
      getUserDetails();
    }, []);

  function renderCategoryItem(itemData) {
    async function pressHandler() {

        if(itemData.item.id === 'h2'){
            navigation.navigate('Chat', {
                token:token,
            });
        }
        else if(itemData.item.id === 'h3'){
          navigation.navigate('AllAccountsOverview', {
              token:token,
          });          
        }
        else if(itemData.item.id === 'h1'){
          navigation.navigate('ThaiTrip', {
              editedUserId:editedUserId,
              editedUser:selectedUser,
              token:token,
          });          
        }
        else if(itemData.item.id === 'h8'){
          console.log('WWWWWWWWWWWWWWWWWWWw');
          

          navigation.navigate('LinkStripeAccount', {
              editedUserId:editedUserId,
              editedUser:selectedUser,
              token:token,
          });          
        }
        else if(itemData.item.id === 'h4'){ 
          navigation.navigate('LinkStripeWebViewScreen', {
            token:token,
          });          
        }
        else if(itemData.item.id === 'h6'){ 
          console.log('QQQQQQQQQQQQ');
          await linkStripeAcc();

          navigation.navigate('LinkStripeScreen', {
            token:token,
          });          
        }

    }

    async function linkStripeAcc() {
      try {
console.log("Auth Context Home Screen", authCtx);
          if(authCtx.stripeuserid === 'undefined'){
              console.log("*********************1");
              const stripeDash = await linkStripe(token);
              //setFetchedAccounts(accounts);
              console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!", stripeDash);
              stripeCtx.setstripeaccount(JSON.stringify(stripeDash));
              console.log("############################", stripeCtx.stripeaccount);
              //setStAccOnBoardingUrl(stripeDash.data.accountLink.accountLink.url);
              authCtx.saveStripeUserId(token.data.stripeuser);
              const result = await WebBrowser.openBrowserAsync(stripeDash.accountLink.url);
          
              
              setOutput(result);
          }else{
              // console.log("*********************2",authCtx.stripeuserid);
              // const stripeDash = await getStripeAccount(authCtx.stripeuserid);
              // console.log("************************",stripeDash);
              // stripeCtx.setstripeaccount(stripeDash);
          }                    


      } catch (error) {
          //setError('Could not fetch dashoard!');
      }
  }

    return (
      <HomeGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }

  return (
    <View>
        <Text>{fetchedMessage}</Text>
        <FlatList
        data={HOMECATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={renderCategoryItem}
        numColumns={2}
        />
    </View>
  );
}

export default HomeScreen;
