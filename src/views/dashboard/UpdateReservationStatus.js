import { Box, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/utilFunctions";
import { apiUpdateReservationStatus } from "../../api/reservations";
import { addStyleToTextField } from "../../utils/utilFunctions";
import { apiGetCakes } from "../../api/cakes";


const UpdateReservationStatus = ({ userRights }) => {
    const navigate = useNavigate(); // Initialize navigate function

    const rightCode = userRights[0].right_code;

    const [completedForm, setCompletedForm] = useState(false);

    const { reservationId } = useParams();

    const [formData, setFormData] = useState({
        status: '',
    });


    useEffect(() => {
        const isFormCompleted =
            formData.status;

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

        console.log('formData', formData);

        apiUpdateReservationStatus((response) => { navigate(-1); showSuccessToast(response.message) },
            showErrorToast, reservationId, formData.status)


    };

    return (
        <>
            <Box sx={{ m: 2 }}  >
                <Typography variant="h4" sx={{ mb: 2 }}>
                    <span className="font-bold text-black">{"Schimba status rezervare"}</span>
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
                    <FormControl fullWidth sx={addStyleToTextField(formData.status)}>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            label="Status"
                            labelId="status-label"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}

                        >
                            <MenuItem value={'placed'}>Plasata</MenuItem>
                            <MenuItem value={'picked_up'}>Luata</MenuItem>
                            <MenuItem value={'cancelled'}>Anulata</MenuItem>


                        </Select>
                    </FormControl>

                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{
                            backgroundColor: ' rgb(235, 71, 17)',
                            color: 'white',
                            borderRadius: '14px',
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

                        {'Schimba status'}

                    </Button>
                </Box>


            </Box >
        </>
    )
}

export default UpdateReservationStatus;