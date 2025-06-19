
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
import { storeToken } from '../../utils/utilFunctions';

import { useNavigate } from 'react-router-dom';
import { showSuccessToast, showErrorToast } from '../../utils/utilFunctions';

import { addStyleToTextField } from "../../utils/utilFunctions";
import { apiAddUser } from '../../api/user';


const AddUser = () => {
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

        apiAddUser((response) => {
            showSuccessToast(response.message);
            navigate('/dashboard/users');
        }, showErrorToast, { name, email, password, confirm_password: confirmPassword, phone });
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

            <Box noValidate autoComplete="off"
                onKeyDown={handleKeyPress} sx={{
                    m: 2
                }}>
                <Typography variant="h4">Adauga utilizator</Typography>

                <TextField
                    fullWidth
                    margin="normal"
                    label="Nume"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                    sx={addStyleToTextField(name)}
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
                    sx={{ ...addStyleToTextField(phone), mb: 2 }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
                    <Button variant="contained" sx={{ backgroundColor: 'rgb(235, 71, 17)', color: 'white', mb: 1, mr: 1 }} onClick={register}>
                        {'Inregistreaza utilizator'}
                    </Button>

                    <Button variant="contained" color="error" sx={{ mb: 1 }} onClick={() => navigate(-1)}>
                        Renunta
                    </Button>
                </Box>

            </Box>


        </>
    );
};

export default AddUser;
