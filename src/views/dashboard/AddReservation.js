import { Box, Button, TextField, Typography, List, ListItemText, ListItemButton } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/utilFunctions";
import { apiAddReservation } from "../../api/reservations";
import { addStyleToTextField } from "../../utils/utilFunctions";
import { apiGetCakes } from "../../api/cakes";


const AddReservation = ({ userRights }) => {
    const navigate = useNavigate(); // Initialize navigate function

    const rightCode = userRights[0].right_code;


    const [completedForm, setCompletedForm] = useState(false);

    const { cakeId } = useParams();


    const [formData, setFormData] = useState({
        quantity: '',
    });



    useEffect(() => {
        const isFormCompleted =
            formData.quantity;

        setCompletedForm(isFormCompleted);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        apiAddReservation((response) => { navigate(`/dashboard/reservations`); showSuccessToast(response.message) },
            showErrorToast, cakeId, formData.quantity)

    };

    return (
        <>
            <Box sx={{ m: 2 }}  >
                <Typography variant="h4" sx={{ mb: 2 }}>
                    <span className="font-bold text-black">{"Rezerva prajitura"}</span>
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                    sx={{
                        backgroundColor: 'white',
                        width: '100%'
                    }}
                >

                    <Box sx={{ position: 'relative', width: '100%' }}>

                        <TextField
                            label="Cantitate"
                            name="quantity"
                            type='number'
                            value={formData.quantity || ''}
                            fullWidth
                            onChange={handleChange}
                            sx={addStyleToTextField(formData.quantity)}
                        >
                        </TextField>
                    </Box>

                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{
                            backgroundColor: ' rgb(235, 71, 17)',
                            color: 'white',
                            textTransform: 'none',
                            height: '40px',

                            ...(!completedForm && {
                                backgroundColor: ' rgb(235, 71, 17)',
                                opacity: 0.5,
                                color: 'white'
                            })
                        }}
                        disabled={!completedForm}
                    >

                        {'Rezerva'}

                    </Button>
                </Box>


            </Box >
        </>
    )
}

export default AddReservation;