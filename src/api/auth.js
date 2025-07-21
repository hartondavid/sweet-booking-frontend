import { getToken } from "../utils/utilFunctions";

export const apiCheckLogin = async (errorCallBack, setUser) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    // Check if API URL is configured
    if (!apiUrl) {
        console.error('API URL not configured. Please check your environment variables.');
        errorCallBack && errorCallBack('API URL not configured');
        return;
    }

    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/users/checkLogin`, {
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
            errorCallBack && errorCallBack(data.message || 'Login check failed');
        } else {
            setUser(data)
        }
    } catch (error) {
        console.error('Error in apiCheckLogin:', error);
        errorCallBack && errorCallBack('Failed to check login status');
    }
}