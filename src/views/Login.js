
import {
    Typography,
    TextField,
    Button,
    Box,
} from '@mui/material';
import { useState } from 'react';

import { toast } from 'react-toastify';
import { storeToken } from '../utils/utilFunctions';

import { useNavigate } from 'react-router-dom';
import { showSuccessToast } from '../utils/utilFunctions';
import './login.css';
import bgImage from "../../src/assets/login-bg.jpg";
import { addStyleToTextField } from "../utils/utilFunctions";

const Login = () => {
    const navigate = useNavigate(); // Initialize navigate function
    // State for form fields and errors
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    // Validate form fields
    const validateForm = () => {
        let valid = true;
        let newErrors = {
            email: '',
            password: '',
        };

        if (!email) {
            newErrors.email = 'email-required';
            valid = false;
        }

        if (!password) {
            newErrors.password = 'password-required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };


    const login = async () => {
        if (!validateForm()) {
            return
        }

        const apiUrl = process.env.REACT_APP_API_URL;
        console.log('API URL:', apiUrl); // Debug log
        if (!apiUrl) {
            console.error('API URL is not configured');
            toast.error('Configuration error: API URL not set');
            return;
        }
        try {
            const response = await fetch(`${apiUrl}/api/users/login`, {
                method: 'POST', // Change to 'POST' for sending data
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }), // Convert your data to a JSON string
            });

            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                console.error('Failed to parse JSON response:', jsonError);
                console.log('Response status:', response.status);
                console.log('Response text:', await response.text());
                toast.error('Server response error');
                return;
            }

            console.log('Response data:', data);
            console.log('Response headers:', response.headers);

            if (data.message === 'Successfully logged in!') {
                const token = response.headers.get('X-Auth-Token');
                console.log('Token from header:', token);

                // Also check if token is in response body
                if (data.token) {
                    console.log('Token from body:', data.token);
                    storeToken(data.token);
                } else if (token) {
                    storeToken(token);
                } else {
                    console.error('No token found in response');
                }

                showSuccessToast(data.message);
                navigate('/dashboard');
            } else {
                console.log('Login failed:', data);
                showInvalidCredentials();
            }
        } catch (error) {
            console.error('Error:', error);

            toast.error('something-went-wrong', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const showInvalidCredentials = () => {

        let newErrors = {
            email: '',
            password: '',
        };

        newErrors.email = 'invalid-credentials';
        newErrors.password = 'invalid-credentials';

        setErrors(newErrors);
    }

    const handleKeyPress = (e) => {
        if (e.key == 'Enter') {
            login()
        }
    };

    return (
        <>
            <div
                className="login-bg"
                style={{ backgroundImage: `url(${bgImage})` }}
            >
                {/* <Navbar /> */}
                <Box component="form" noValidate autoComplete="off"
                    onKeyDown={handleKeyPress} sx={{
                        width: '20%', margin: 'auto',
                        marginTop: '100px', backgroundColor: 'white', padding: '20px', borderRadius: '10px'
                    }}>
                    <Typography variant="h4">Intra in cont</Typography>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={addStyleToTextField(email)}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label={'Parola'}
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={!!errors.password}
                        helperText={errors.password}
                        sx={addStyleToTextField(password)}
                    />

                    <Button variant="contained" sx={{ backgroundColor: 'rgb(235, 71, 17)', color: 'white', mb: 1, mt: 1 }} fullWidth onClick={login}>
                        {'login'}
                    </Button>
                    <Button variant="outlined" sx={{ color: 'rgb(235, 71, 17)' }} fullWidth onClick={() => navigate('/auth/register')}>
                        {'Inregistreaza-te'}
                    </Button>
                </Box>
            </div>

        </>
    );
};

export default Login;
