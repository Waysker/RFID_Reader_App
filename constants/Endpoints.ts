const GET_USERS = "/getUsers";
const GET_ENTRIES = "/getEntries/"

export var SERVER_ADDRESS= "http://192.168.0.199:8081"
global.ip = SERVER_ADDRESS;

//export var GET_USERS_ENDPOINT = global.ip+GET_USERS;
//export var GET_ENTRIES_ENDPOINT = global.ip+GET_ENTRIES;

export const GET_USERS_ENDPOINT = () =>{
    return global.ip +GET_USERS;
}

export const GET_ENTRIES_ENDPOINT = () =>{
    return global.ip +GET_ENTRIES;
}