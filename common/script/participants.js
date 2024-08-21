function getParticipants() {
    // Define the W3C's group ID
    const GROUP_ID = "83726";

    // Define the base URL for the API, using the group ID
    const BASE_URL = `https://api.w3.org/groups/${GROUP_ID}`;

    // Define the ID of the list element where the user information will be inserted
    const LIST_ID = "ack_group";

    async function getUsersInfo() {
        const response = await fetch(`${BASE_URL}/users`);
        const data = await response.json();
        const users = data._links.users;
    
        const usersInfo = await Promise.all(users.map(async (user) => {
            const affiliation = await getAffiliation(user);
            return { title: user.title, affiliation: affiliation };
        }));
    
        return usersInfo;
    }
    
    async function getAffiliation(user) {
        // Send a GET request to the affiliations endpoint of the user
        const response = await fetch(user.href + "/affiliations/");

        // Fetch the JSON data from the response
        const affiliations = await response.json();

        // Extract the title of the first affiliation
        const affiliation = affiliations._links.affiliations[0].title;

        // Return the title of the affiliation
        return affiliation;
    }
    async function insertUsersInfoIntoDocument() {
        const usersInfo = await getUsersInfo();
        const usersList = document.querySelector(`#${LIST_ID} ul`);
        const fragment = document.createDocumentFragment();
    
        usersInfo.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.title} (${user.affiliation})`;
            fragment.appendChild(li);
        });
    
        usersList.appendChild(fragment);
    }

    insertUsersInfoIntoDocument();
}
