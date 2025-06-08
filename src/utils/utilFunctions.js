import { toast } from "react-toastify";
import { menus } from "./menus";

export const NEEDS_UPDATE_STRING = 'needs_update';

export const storeToken = (token) => {
    localStorage.setItem('token', token);
}

export const removeToken = () => {
    localStorage.removeItem('token');
}

export const getToken = () => {
    return localStorage.getItem('token');
}

export const showErrorToast = (message) => {
    toast.error(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
}

export const showSuccessToast = (message) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    });
}


export const shouldShowMenu = (userRights, menu) => {
    let shouldShow = true;

    //    console.log('userRights', userRights);
    if (userRights.length > 0) {
        const right_code = userRights[0].right_code

        if (menu.rights && menu.rights.length !== 0 && !menu.rights.includes(right_code)) {
            shouldShow = false;
        }
    }


    return shouldShow;
}


export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

export const formatDateTime = (date) => {
    const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if necessary
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month, +1 because getMonth() returns 0-based month
    const year = date.getFullYear(); // Get full year
    const hours = String(date.getHours()).padStart(2, '0'); // Get hours and pad with leading zero if necessary
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Get minutes and pad with leading zero if necessary

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}
export const addStyleToTextField = (hasValue) => {
    return {
        '& .MuiInputLabel-root': {

            '&.Mui-focused': {
                color: ' rgb(235, 71, 17)'
            },
            '&.MuiInputLabel-shrink': {
                color: ' rgb(235, 71, 17)'
            },

        },
        '& .MuiInputBase-input': {
            color: 'black'
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
                borderColor: ' rgb(235, 71, 17)',
            },
            '&:hover fieldset': {
                borderColor: ' rgb(235, 71, 17)'
            }

        },
        ...(hasValue && {
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: ' rgb(235, 71, 17)',
            },
            '& .MuiInputLabel-root': {
                color: ' rgb(235, 71, 17)',
            },
        }),
    }
}

