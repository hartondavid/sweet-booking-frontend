import { getToken } from "../utils/utilFunctions";

export const apiRegister = async (successCallback, errorCallback, userData) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    // Check if API URL is configured
    if (!apiUrl) {
        console.error('API URL not configured. Please check your environment variables.');
        errorCallback && errorCallback('API URL not configured');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/api/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData),
        });

        // Check if response is ok before parsing JSON
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.success) {
            errorCallback && errorCallback(data.message || 'Registration failed');
        } else {
            successCallback && successCallback(data);
        }
    } catch (error) {
        console.error('Error in apiRegister:', error);
        errorCallback && errorCallback("Registration failed");
    }
};

export const apiLogin = async (successCallback, errorCallback, credentials) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    // Check if API URL is configured
    if (!apiUrl) {
        console.error('API URL not configured. Please check your environment variables.');
        errorCallback && errorCallback('API URL not configured');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}/api/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials),
        });

        // Check if response is ok before parsing JSON
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.success) {
            errorCallback && errorCallback(data.message || 'Login failed');
        } else {
            // Get the token from the custom header
            const token = response.headers.get('X-Auth-Token');
            successCallback && successCallback({ ...data, token });
        }
    } catch (error) {
        console.error('Error in apiLogin:', error);
        errorCallback && errorCallback("Login failed");
    }
};

// export const apiGetProfile = async (successCallback, errorCallback, userId) => {
//     const apiUrl = process.env.REACT_APP_API_URL;
//     const token = getToken();
//     try {
//         const response = await fetch(`${apiUrl}/api/users/profile/${userId}`, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             },
//         });

//         const data = await response.json();
//         if (!data.success) {
//             errorCallback(data.message);
//         } else {
//             successCallback(data);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         errorCallback({ success: false, message: "Failed to fetch user profile" });
//     }
// };

// export const apiUpdatePassword = async (successCallback, errorCallback, userId, newPassword) => {
//     const apiUrl = process.env.REACT_APP_API_URL;
//     const token = getToken();
//     try {
//         const response = await fetch(`${apiUrl}/api/users/updatePassword/${userId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify({ password: newPassword }),
//         });

//         const data = await response.json();
//         if (!data.success) {
//             errorCallback(data.message);
//         } else {
//             successCallback(data);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         errorCallback({ success: false, message: "Failed to update password" });
//     }
// };

export const apiGetUsers = async (successCallback, errorCallback) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    // Check if API URL is configured
    if (!apiUrl) {
        console.error('API URL not configured. Please check your environment variables.');
        errorCallback && errorCallback('API URL not configured');
        return;
    }

    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/users/getUsers`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        // Check if response is ok before parsing JSON
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!data.success) {
            errorCallback && errorCallback(data.message || 'Failed to fetch users');
        } else {
            successCallback && successCallback(data);
        }
    } catch (error) {
        console.error('Error in apiGetUsers:', error);
        errorCallback && errorCallback("Failed to fetch users");
    }
};



export const apiDeleteUser = async (successCallback, errorCallback, userId) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/users/deleteUser/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (!data.success) {
            errorCallback(data.message);
        } else {
            successCallback(data);
        }
    } catch (error) {
        console.error('Error:', error);
        errorCallback({ success: false, message: "Failed to delete user" });
    }
};

export const apiAddUser = async (successCallback, errorCallback, userData) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/users/addUser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        if (!data.success) {
            errorCallback(data.message);
        } else {
            successCallback(data);
        }
    } catch (error) {
        console.error('Error:', error);
        errorCallback({ success: false, message: "Failed to add user" });
    }
};