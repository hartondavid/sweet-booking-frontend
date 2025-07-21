import { getToken } from './utilFunctions';

/**
 * Generic API call handler with proper error handling
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @param {Function} successCallback - Success callback
 * @param {Function} errorCallback - Error callback
 * @param {boolean} requireAuth - Whether authentication is required
 */
export const apiCall = async (endpoint, options = {}, successCallback, errorCallback, requireAuth = true) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    // Check if API URL is configured
    if (!apiUrl) {
        console.error('API URL not configured. Please check your environment variables.');
        errorCallback && errorCallback('API URL not configured');
        return;
    }

    try {
        // Prepare headers
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        // Add authentication if required
        if (requireAuth) {
            const token = getToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        // Make the API call
        const response = await fetch(`${apiUrl}${endpoint}`, {
            ...options,
            headers
        });

        // Check if response is ok before parsing JSON
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse JSON response
        const data = await response.json();

        if (!data.success) {
            errorCallback && errorCallback(data.message || 'API call failed');
        } else {
            successCallback && successCallback(data);
        }
    } catch (error) {
        console.error('API call error:', error);
        errorCallback && errorCallback('API call failed');
    }
};

/**
 * Handle FormData API calls (for file uploads)
 * @param {string} endpoint - API endpoint
 * @param {FormData} formData - Form data to send
 * @param {Function} successCallback - Success callback
 * @param {Function} errorCallback - Error callback
 * @param {boolean} requireAuth - Whether authentication is required
 */
export const apiCallFormData = async (endpoint, formData, successCallback, errorCallback, requireAuth = true) => {
    const apiUrl = process.env.REACT_APP_API_URL;

    // Check if API URL is configured
    if (!apiUrl) {
        console.error('API URL not configured. Please check your environment variables.');
        errorCallback && errorCallback('API URL not configured');
        return;
    }

    try {
        // Prepare headers
        const headers = {};

        // Add authentication if required
        if (requireAuth) {
            const token = getToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }

        // Make the API call
        const response = await fetch(`${apiUrl}${endpoint}`, {
            method: 'POST',
            headers,
            body: formData
        });

        // Check if response is ok before parsing JSON
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse JSON response
        const data = await response.json();

        if (!data.success) {
            errorCallback && errorCallback(data.message || 'API call failed');
        } else {
            successCallback && successCallback(data);
        }
    } catch (error) {
        console.error('API call error:', error);
        errorCallback && errorCallback('API call failed');
    }
}; 