document.addEventListener("DOMContentLoaded", function() {
    const API_URL = "https://reqres.in/api/users";
    let userInfo = [];

    async function getUserInfo() {
        try {
            const data = await fetch(API_URL);
            const dataToJSON = await data.json();
            userInfo = dataToJSON.data || [];
            console.log(userInfo);
            generateAllCards(userInfo, userContainer);
        } catch (error) {
            console.log("There was an error", error);
            userInfo = [];
        }
    }

    const userContainer = document.querySelector('.user-container');
    const userClickedInfo = document.getElementById('user-clicked-info');

    function createUserCard(data, container) {
        let userUI = `<div class="card" style="width: 300px; 
        border: 1px solid #ddd;
        border-radius: 10px;
        padding: 20px;
        margin-right: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <img src="${data.avatar}" class="card-img-top" alt="...">
        <div class="card-body">
            <h4>${data.first_name} ${data.last_name}</h4>
            <p class="card-text"  style="white-space: nowrap; max-width: 100%;">${data.email}</p>
        </div>
        <button type="button" class="btn btn-primary get-details-btn">Get Details</button>
        </div>`;

        container.innerHTML += userUI;
    }

    function generateAllCards(userData = [], container) {
        for (let i = 0; i < userData.length; i++) {
            createUserCard(userData[i], container);
        }
        // Add event listeners to the "Get Details" buttons
        const getDetailsButtons = document.querySelectorAll('.get-details-btn');
        getDetailsButtons.forEach((button, index) => {
            button.addEventListener('click', () => displayUserDetails(userData[index]));
        });
    }

    

    async function displayUserDetails(user) {

            const data = await fetch(`${API_URL}/${user.id}`);
            const dataToJSON = await data.json();
            userInfo = dataToJSON.data || [];
            userClickedInfo.innerHTML = `
            <h2>User Details</h2>
            <p>Name: ${userInfo.first_name} ${userInfo.last_name}</p>
            <p>Email: ${userInfo.email}</p>
            <img src="${userInfo.avatar}" alt="User Avatar">
        `;
    }

    getUserInfo();
});
