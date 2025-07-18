
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

            const data = await response.json();

            if (data.message === 'Successfully logged in!') {
                const token = response.headers.get('X-Auth-Token');
                if (token) {
                    storeToken(token)
                }
                showSuccessToast(data.message)
                navigate('/dashboard');

            } else {
                showInvalidCredentials()
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
