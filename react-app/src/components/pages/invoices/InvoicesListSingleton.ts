/* eslint-disable */
/* eslint-disable react/jsx-no-undef */
let users = [];
class userListSingleton {
    logList() {
        return users;
    }

    addUser(newUser) {
        const duplicateUser = users.find((user) => {
            if (newUser.username === user.username) {
                console.log('this person was already added to the list!!');
                return true;
            }
        })
        if (duplicateUser) {
            return;
        }
        users.push(newUser);
    }
}

export let singletonUserList = new userListSingleton();
