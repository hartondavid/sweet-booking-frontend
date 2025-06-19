
import {
    Typography,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Grid
} from '@mui/material';
import { useState } from 'react';

import { toast } from 'react-toastify';
import { storeToken } from '../utils/utilFunctions';

import { useNavigate } from 'react-router-dom';
import { showSuccessToast, showErrorToast } from '../utils/utilFunctions';
import './login.css';
import bgImage from "../../src/assets/login-bg.jpg";
import { addStyleToTextField } from "../utils/utilFunctions";
import { getToken } from '../utils/utilFunctions';

const Register = () => {
    const navigate = useNavigate(); // Initialize navigate function
    // State for form fields and errors
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [rightCode, setRightCode] = useState('');
    const [phone, setPhone] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
    });

    // Validate form fields
    // const validateForm = () => {
    //     let valid = true;
    //     let newErrors = {
    //         name: '',
    //         email: '',
    //         password: '',
    //         confirmPassword: '',
    //         rightCode: '',
    //         phone: '',
    //     };

    //     if (!name) {
    //         newErrors.name = 'name-required';
    //         valid = false;
    //     }

    //     if (!email) {
    //         newErrors.email = 'email-required';
    //         valid = false;
    //     }

    //     if (!password) {
    //         newErrors.password = 'password-required';
    //         valid = false;
    //     }

    //     if (!confirmPassword) {
    //         newErrors.confirmPassword = 'confirmPassword-required';
    //         valid = false;
    //     }

    //     if (!rightCode) {
    //         newErrors.rightCode = 'rightCode-required';
    //         valid = false;
    //     }

    //     if (!phone) {
    //         newErrors.phone = 'phone-required';
    //         valid = false;
    //     }


    //     setErrors(newErrors);
    //     return valid;
    // };


    const register = async () => {
        // if (!validateForm()) {
        //     return
        // }

        console.log('register');

        const apiUrl = process.env.REACT_APP_API_URL;
        // const token = getToken();
        try {
            const response = await fetch(`${apiUrl}/api/users/register`, {
                method: 'POST', // Change to 'POST' for sending data
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    confirm_password: confirmPassword,
                    phone: phone
                }), // Convert your data to a JSON string
            });

            const data = await response.json();

            if (data.message === 'Utilizatorul a fost creat cu succes') {
                const token = response.headers.get('X-Auth-Token');
                if (token) {
                    storeToken(token)
                }
                showSuccessToast(data.message)
                navigate('/auth/login');

            } else {
                showInvalidCredentials()
                showErrorToast(data.message)
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
            confirmPassword: '',
            name: '',
            phone: '',
        };

        if (!email) newErrors.email = 'invalid-credentials';
        if (!password) newErrors.password = 'invalid-credentials';
        if (!confirmPassword) newErrors.confirmPassword = 'invalid-credentials';
        if (!name) newErrors.name = 'invalid-credentials';
        if (!phone) newErrors.phone = 'invalid-credentials';
        setErrors(newErrors);
    }

    const handleKeyPress = (e) => {
        if (e.key == 'Enter') {
            register()
        }
    };

    return (
        <>
            <div
                className="login-bg"
                style={{ backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'top center' }}
            >
                {/* <Navbar /> */}
                <Box component="form" noValidate autoComplete="off"
                    onKeyDown={handleKeyPress} sx={{
                        width: '20%', margin: 'auto',
                        marginTop: '30px', backgroundColor: 'white', padding: '20px', borderRadius: '10px'
                    }}>
                    <Typography variant="h4">Inregistreaza-te</Typography>

                    <TextField
                        fullWidth
                        margin="normal"
                        label="Nume"
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={!!errors.name}
                        helperText={errors.name}
                        sx={addStyleToTextField(email)}
                    />
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


                    <TextField
                        fullWidth
                        margin="normal"
                        label={'Confirmare parola'}
                        variant="outlined"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        sx={{ ...addStyleToTextField(confirmPassword), mb: 1 }}
                    />

                    <TextField
                        fullWidth
                        margin="normal"
                        label={'Telefon'}
                        variant="outlined"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        error={!!errors.phone}
                        helperText={errors.phone}
                        sx={addStyleToTextField(phone)}
                    />

                    <Button variant="contained" sx={{ backgroundColor: 'rgb(235, 71, 17)', color: 'white', mb: 1, mt: 2 }} fullWidth onClick={register}>
                        {'Inregistreaza-te'}
                    </Button>
                    <Button variant="outlined" sx={{ color: 'rgb(235, 71, 17)' }} fullWidth onClick={() => navigate('/auth/login')}>
                        {'Inapoi la login'}
                    </Button>
                </Box>
            </div>

        </>
    );
};

export default Register;
