import { getToken } from '../utils/utilFunctions';

export const apiAddCake = async (successCallback, errorCallback, reqData) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {

        console.log('Req data:----------', reqData);
        console.log('Req data types:----------', {
            name: typeof reqData.name,
            price: typeof reqData.price,
            description: typeof reqData.description,
            kcal: typeof reqData.kcal,
            grams_per_piece: typeof reqData.grams_per_piece
        });

        // Try JSON approach first
        const jsonPayload = {
            name: reqData.name,
            price: reqData.price,
            description: reqData.description,
            kcal: reqData.kcal,
            grams_per_piece: reqData.grams_per_piece
        };

        console.log('JSON payload:----------', jsonPayload);

        // Always use FormData approach
        console.log('Using FormData approach for all cases');
        const formData = new FormData();
        formData.append('name', reqData.name);
        formData.append('price', reqData.price);
        formData.append('description', reqData.description);
        formData.append('kcal', reqData.kcal);
        formData.append('grams_per_piece', reqData.grams_per_piece);

        if (reqData.photo) {
            console.log('Adding photo to FormData');
            formData.append('photo', reqData.photo);
        }

        console.log('FormData created');

        const response = await fetch(`${apiUrl}/api/cakes/addCake`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        console.log('FormData request sent, response status:', response.status);
        const data = await response.json();
        console.log('Server response:----------', data);
        if (!data.success) {
            console.log('Error details:----------', data);
            errorCallback(data.message);
        } else {
            console.log('Success response data:----------', data.data);
            if (data.data && data.data.photo) {
                console.log('Photo URL from server:----------', data.data.photo);
            }
            successCallback(data);
        }
    } catch (error) {
        console.error('Error in apiAddCake:', error);
        console.error('Error stack:', error.stack);
        errorCallback("Failed to add cake");
    }
};

export const apiUpdateCake = async (successCallback, errorCallback, cakeId, reqData) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {

        console.log('reqData', reqData);
        const formData = new FormData();
        formData.append('name', reqData.name);
        formData.append('description', reqData.description);
        formData.append('kcal', reqData.kcal);
        formData.append('grams_per_piece', reqData.grams_per_piece);
        formData.append('price', reqData.price);

        if (reqData.photo) {
            formData.append('photo', reqData.photo); // Make sure `reqData.image_path` is a File object
        }
        const response = await fetch(`${apiUrl}/api/cakes/updateCake/${cakeId}`, {
            method: 'PUT',
            headers: {
                // 'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });
        const data = await response.json();
        if (!data.success) {
            errorCallback(data.message);
        } else {
            successCallback(data);
        }
    } catch (error) {
        console.error('Error:', error);
        errorCallback({ success: false, message: "Failed to update cake" });
    }
};

export const apiDeleteCake = async (successCallback, errorCallback, cakeId) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/cakes/deleteCake/${cakeId}`, {
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
        errorCallback({ success: false, message: "Failed to delete cake" });
    }
};


export const apiGetCakeById = async (successCallback, errorCallback, cakeId) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/cakes/getCake/${cakeId}`, {
            method: 'GET',
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
        errorCallback({ success: false, message: "Failed to fetch cake" });
    }
};

export const apiGetCakes = async (successCallback, errorCallback) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/cakes/getCakes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });


        const data = await response.json();
        if (!data.success) {
            // errorCallback(data.message);
        } else {
            console.log('Cakes loaded:----------', data.data);
            if (data.data && data.data.length > 0) {
                data.data.forEach((cake, index) => {
                    if (cake.photo) {
                        console.log(`Cake ${index} photo URL:----------`, cake.photo);
                    }
                });
            }
            successCallback(data);
        }
    } catch (error) {
        console.error('Error:', error);
        errorCallback({ success: false, message: "Failed to fetch orders" });
    }
};

export const apiGetRemainingCakes = async (successCallback, errorCallback) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/cakes/getRemainingCakes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (!data.success) {
            // errorCallback(data.message);
        } else {
            successCallback(data);
        }
    } catch (error) {
        console.error('Error:', error);
        errorCallback({ success: false, message: "Failed to fetch remaining cakes" });
    }
};
export const apiGetBoughtCakesByAdminId = async (successCallback, errorCallback) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/cakes/getBoughtCakesByAdminId`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (!data.success) {
            // errorCallback(data.message);
        } else {
            successCallback(data);
        }
    } catch (error) {
        console.error('Error:', error);
        errorCallback({ success: false, message: "Failed to fetch bought cakes" });
    }
};
export const apiGetBoughtCakesByCustomerId = async (successCallback, errorCallback) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/cakes/getBoughtCakesByCustomerId`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const data = await response.json();
        if (!data.success) {
            // errorCallback(data.message);
        } else {
            successCallback(data);
        }
    } catch (error) {
        console.error('Error:', error);
        errorCallback({ success: false, message: "Failed to fetch bought cakes" });
    }
};

export const apiIncreaseQuantity = async (successCallback, errorCallback, cakeId, quantity) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {

        const response = await fetch(`${apiUrl}/api/cakes/increaseQuantity/${cakeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ quantity })
        });
        const data = await response.json();
        if (!data.success) {
            errorCallback(data.message);
        } else {
            successCallback(data);
        }
    } catch (error) {
        console.error('Error:', error);
        errorCallback({ success: false, message: "Failed to update cake" });
    }
};

export const apiGetCakesByCustomerId = async (successCallback, errorCallback) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = getToken();
    try {
        const response = await fetch(`${apiUrl}/api/cakes/getCakesByCustomerId`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });


        const data = await response.json();
        if (!data.success) {
            // errorCallback(data.message);
        } else {
            successCallback(data);
        }
    } catch (error) {
        console.error('Error:', error);
        errorCallback({ success: false, message: "Failed to fetch orders" });
    }
};