/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
let users = [];
class userListSingleton {
    logList() {
        return users;
    }

    addUser(user) {
        users.push(user);
    }
}

export let singletonUserList = new userListSingleton();
