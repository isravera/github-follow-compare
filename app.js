const TOKEN = 'GITHUB_PERSONAL_TOKEN_ACCESS_KEY_HERE';

const BASE_URL = 'https://api.github.com/';

const HEADERS = {
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `token ${TOKEN}`,
    'User-Agent': 'Koltuz-App'
};

let followersList = [];
let followingList = [];

const getFollowing = async() => {

    try {

        const response = await fetch(`${BASE_URL}user/following?per_page=100`, {
            headers: HEADERS
        });

        if(response.status === 200) {

            const data = await response.json();

            followersList = data.sort((a, b) => a.login.localeCompare(b.login));

            let users = '';

            data.forEach((user, index) => {

                const name = getUserName(user.url, user.login);
                
                users += `
                <tr>
                    <td class="align-middle">
                        <p class="text-xs">${index + 1}</p>
                    </td>
                    <td>
                        <div class="d-flex px-2 py-1">
                            <div>
                                <img src="${user.avatar_url}" class="avatar me-3">
                            </div>
                            <div class="d-flex flex-column justify-content-center">
                                <h6 class="mb-0 text-xs" id="${user.login}">${name}</h6>
                                <p class="text-xs text-secondary mb-0"><a href="${user.html_url}" target="_blank" class="hidden-url">@${user.login}</a></p>
                            </div>
                        </div>
                    </td>
                    <td class="align-middle">
                        <a role="button" href="${user.html_url}" target="_blank" class="btn btn-outline-danger btn-sm">Unfollow</a>
                    </td>
                </tr>`;
            });

            document.querySelectorAll('tbody')[0].innerHTML = users;

        } else if (response.status === 401 || response.status === 403) {
            console.alert('Error getting list of people you are following: Requires authentication');
        } else {
            console.alert(`Error getting list of people you are following with error code ${response.status}`);
        }
        
    } catch (error) {
        console.alert(`Error getting list of people that is following you: ${error}`);
    }

}

const unfollowUser = async(username) => {

    try {

        const response = await fetch(`${BASE_URL}user/following/${username}/`, {
            headers: HEADERS
        });

        if(response.status === 204) {
            alert('no content');
        } else if (response.status === 304) {
            alert('not modified');
        } else if (response.status === 401) {
            alert('requires authentication');
        } else if (response.status === 403) {
            alert('forbidden');
        } else if (response.status === 404) {
            alert('resource not found');
        } else {
            alert(`other code #${response.status}`);
        }
        
    } catch (error) {
        console.alert(`Failed to unfollow user ${username}: ${error}`);
    }
}

const getFollowers = async() => {

    try {

        const response = await fetch(`${BASE_URL}user/followers?per_page=100`, {
            headers: HEADERS
        });

        if(response.status === 200) {

            const data = await response.json();

            followingList = data.sort((a, b) => a.login.localeCompare(b.login));

            let users = '';

            data.forEach((user, index) => {

                const name = getUserName(user.url, user.login + 2);
                
                users += `
                <tr>
                    <td class="align-middle">
                        <p class="text-xs">${index + 1}</p>
                    </td>
                    <td>
                        <div class="d-flex px-2 py-1">
                            <div>
                                <img src="${user.avatar_url}" class="avatar me-3">
                            </div>
                            <div class="d-flex flex-column justify-content-center">
                                <h6 class="mb-0 text-xs" id="${user.login}2">${name}</h6>
                                <p class="text-xs text-secondary mb-0"><a href="${user.html_url}" target="_blank" class="hidden-url">@${user.login}</a></p>
                            </div>
                        </div>
                    </td>
                    <td class="align-middle">
                        <a role="button" href="${user.html_url}" target="_blank" class="btn btn-outline-success btn-sm">Follow</a>
                    </td>
                </tr>`;
            });

            document.querySelectorAll('tbody')[1].innerHTML = users;

        } else if (response.status === 401 || response.status === 403) {
            console.alert('Error getting list of people you are following: Requires authentication');
        } else {
            console.alert(`Error getting list of people you are following with error code ${response.status}`);
        }

    } catch (error) {
        console.alert(`Error getting list of people you are following: ${error}`);
    }
}

const getUserName = (url, id) => {

    try {

        const response = fetch(url, {
            headers: HEADERS
        }).then(response => response.json()).then(userInfo => {
            document.getElementById(id).innerText = userInfo.name;
        });
        
    } catch (error) {
        console.alert(error);
    }
}

const initApp = () => {

    getFollowing();
    getFollowers();
}

initApp();

//TODO List

// # Add Pagination
// ## api end point not working? getting 404 for:
//  # Check if user is following
//  # Unfollow User
//  # Follow User