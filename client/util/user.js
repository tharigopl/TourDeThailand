import axios from 'axios';

const API_KEY = 'AIzaSyDK6dLf66nFmxkJb58V5YMaZwvQYigadOU';
//const API_DOMAIN = '192.168.0.157';
//const API_DOMAIN = process.env.EXPO_PUBLIC_API_DOMAIN;
const API_DOMAIN = '192.168.0.165';


async function addFriendsAPI(token, friendsemail, uid) {
    console.log("API_DOMAIN",API_DOMAIN);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    
    var url = `http://${API_DOMAIN}:5000/api/users/${uid}/friendsemail`;

    console.log("Add friends  ", token, friendsemail, uid);
    
    console.log(url)
    const name = 'test';
    const response = await axios.patch(url, {"emailids":friendsemail}, config);

    const data = response.data;
    console.log("Add Friends API ", data)
    return data;
}


export function addFriends(token, friends, uid) {
    return addFriendsAPI(token, friends, uid);
}
