import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GenericTable from "../../components/GenericTable";
import { showErrorToast, showSuccessToast } from "../../utils/utilFunctions";
import { Chip, Dialog, DialogTitle, DialogContent, DialogActions, Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { apiGetReservationsByAdminId, apiGetReservationsByCustomerId, apiUpdateReservationStatus } from "../../api/reservations";
import { RIGHTS_MAPPING } from "../../utils/utilConstants";
import dayjs from 'dayjs';
import { addStyleToTextField } from "../../utils/utilFunctions";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

const colorMap = {
    placed: 'orange',
    cancelled: 'red',
    picked_up: 'green'
};




const Reservations = ({ userRights }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const rightCode = userRights[0]?.right_code;
    const [formData, setFormData] = useState({
        status: '',
    });

    const [openDialog, setOpenDialog] = useState(false);
    const [reservationId, setReservationId] = useState(null);

    useEffect(() => {


        if (rightCode === RIGHTS_MAPPING.ADMIN) {
            apiGetReservationsByAdminId((response) => {
                setData(response.data);
                console.log('ingredients', response.data);
            }, showErrorToast);

        } else {
            apiGetReservationsByCustomerId((response) => {
                setData(response.data);
                console.log('ingredients', response.data);
            }, showErrorToast);
        }
    }, [data.length, rightCode]);


    const handleOpenDialog = (id) => {
        setReservationId(id);
        setOpenDialog(true)

    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleUpdateReservationStatus = () => {
        apiUpdateReservationStatus((response) => {
            showSuccessToast(response.message);
            setOpenDialog(false);
            apiGetReservationsByAdminId((response) => {
                setData(response.data);
                console.log('ingredients', response.data);
            }, showErrorToast);
        }, showErrorToast, reservationId, formData.status);

    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const columns = [
        { field: 'id', headerName: 'Id', type: 'string' },
        { field: 'name', headerName: 'Nume', type: 'string' },
        { field: 'photo', headerName: 'Foto', type: 'filepath' },
        {
            field: 'price', headerName: 'Pret', type: 'string', renderCell: ({ value }) => {
                return value + ' lei';
            }
        },
        {
            field: 'quantity', headerName: 'Cantitate', type: 'string', renderCell: ({ value }) => {
                return value + ' buc';
            }
        },
        {
            field: 'status', headerName: 'Status', type: 'string',
            renderCell: ({ value, row }) => {
                const statusMap = {
                    placed: 'Plasata',
                    cancelled: 'Anulata',
                    picked_up: 'Ridicata'
                };

                const statusLabel = statusMap[value] || value;
                const color = colorMap[value] || 'default';

                return (
                    <Chip
                        label={statusLabel}
                        variant="outlined"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: '14px',
                            color: color,
                            borderColor: color,

                        }}
                        onClick={() => {
                            if (rightCode === RIGHTS_MAPPING.ADMIN) {
                                handleOpenDialog(row.id);
                            }
                        }}

                    />
                );
            }
        },
        { field: 'customer_name', headerName: 'Client', type: 'string' },
        {
            field: 'updated_at', headerName: 'Data', type: 'date', renderCell: ({ value }) => {
                return dayjs(value).format('DD.MM.YYYY');
            }
        },

    ];


    return (
        <>
            <GenericTable

                title={"Prajituri rezervate"}
                columns={columns}
                data={data}
            >

            </GenericTable>

            {/* Add Employee Dialog */}
            <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="xs">

                <DialogTitle>Rezerva prajitura</DialogTitle>
                <DialogContent>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}  >


                        <Box sx={{ position: 'relative', width: '100%' }}>
                            <FormControl fullWidth sx={{ ...addStyleToTextField(formData.status), mt: 1 }}>
                                <InputLabel id="status-label">Status</InputLabel>
                                <Select
                                    label="Status"
                                    labelId="status-label"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}

                                >
                                    <MenuItem value={'placed'}>Plasata</MenuItem>
                                    <MenuItem value={'picked_up'}>Ridicata</MenuItem>
                                    <MenuItem value={'cancelled'}>Anulata</MenuItem>


                                </Select>
                            </FormControl>
                        </Box>


                    </Box>

                </DialogContent>

                <DialogActions>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
                        <Button type="submit" variant="contained" sx={{
                            mr: 1, mb: 1, backgroundColor: 'rgb(235, 71, 17)', color: 'white'
                        }} onClick={handleUpdateReservationStatus}

                        >
                            {'Schimba status'}
                        </Button>
                        <Button variant="contained" color="error" sx={{ mb: 1 }} onClick={() => handleCloseDialog()}>
                            Renunta
                        </Button>
                    </Box>

                </DialogActions>

            </Dialog>


        </>
    );
};
export default Reservations;