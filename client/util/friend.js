import axios from 'axios';

const API_KEY = 'AIzaSyDK6dLf66nFmxkJb58V5YMaZwvQYigadOU';
//const API_DOMAIN = '192.168.0.157';
const API_DOMAIN = '192.168.0.165';



async function getAllUsersAPI(token) {
    console.log("API_DOMAIN",API_DOMAIN);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    
    var url = `http://${API_DOMAIN}:5000/api/users`;

    console.log("Get All Users  ", token);
    
    console.log(url)
    const name = 'test';
    const response = await axios.get(url, config);

    const data = response.data;

    return data;
}

async function getAllFriendsForUserAPI(token, uid) {
    console.log("API_DOMAIN",API_DOMAIN);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    
    var url = `http://${API_DOMAIN}:5000/api/users/${uid}/friends`;

    console.log(url)
    const name = 'test';
    const response = await axios.get(url, config);

    const data = response.data;

    console.log("Get All Users As Friends data", data);
    
    const friends = [];

    for (const key in data.friends) {
        console.log("Key ", key, data.friends[key].email);
        const friendsObj = {
        id: data.friends[key].id,
        email: data.friends[key].email
        };
        friends.push(friendsObj);
    }


    return friends;
}

async function deleteFriend(token, friendid) {
    console.log("API_DOMAIN",API_DOMAIN);
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    
    var url = `http://${API_DOMAIN}:5000/api/users/`;

    console.log("Get All Users  ", token);
    
    console.log(url)
    const name = 'test';
    const response = await axios.get(url, config);

    const data = response.data;
    

    return data;
}

export function getAllUsers(token) {
    return getAllUsersAPI(token);
}

export function getAllFriendsForUser(token, uid) {
    console.log("Get All Friends For User ", uid);
    return getAllFriendsForUserAPI(token, uid);
}