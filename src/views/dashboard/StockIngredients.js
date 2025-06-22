import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GenericTable from "../../components/GenericTable";
import { apiGetStockIngredients, apiIncreaseQuantity } from "../../api/stockIngredients";
import { showErrorToast, showSuccessToast } from "../../utils/utilFunctions";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, } from "@mui/material";
import { RIGHTS_MAPPING } from "../../utils/utilConstants";
import { apiDeleteStockIngredient } from "../../api/stockIngredients";
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';
import { addStyleToTextField } from "../../utils/utilFunctions";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const columns = [
    { field: 'id', headerName: 'Id', type: 'string' },
    { field: 'name', headerName: 'Nume', type: 'string' },
    {
        field: 'stock_quantity', headerName: 'Cantitate', type: 'string', renderCell: ({ value, row }) => {
            return value + ' ' + row.unit;
        }
    },
    {
        field: 'created_at', headerName: 'Data', type: 'date', renderCell: ({ value }) => {
            return dayjs(value).format('DD.MM.YYYY');
        }
    },

];

const StockIngredients = ({ userRights }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const rightCode = userRights[0]?.right_code;


    const [actions, setActions] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);
    useEffect(() => {

        if (rightCode === RIGHTS_MAPPING.ADMIN) {

            apiGetStockIngredients((response) => {
                setData(response.data);
            }, showErrorToast);

            setActions([
                {
                    icon: <AddCircleOutlineIcon />,
                    onClick: handleOpenIncreaseQuantityDialog

                },
                {
                    icon: <DeleteIcon />, color: 'red', onClick: handleOpenDialog
                }
            ]);

        }

    }, [data.length, rightCode]);


    // Function to open the delete confirmation dialog
    const handleOpenDialog = (orderId) => {
        setOrderToDelete(orderId); // Store the seminar ID to be deleted
        setOpenDialog(true); // Open the dialog
    };


    const handleDeleteOrderRequest = () => {
        apiDeleteStockIngredient((response) => {
            showSuccessToast(response.message);
            const updatedData = data.filter((order) => order.id !== orderToDelete);
            setData(updatedData);
            setOpenDialog(false);

        }, showErrorToast, orderToDelete);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };



    const [formData, setFormData] = useState({
        quantity: ''
    });

    const [openIncreaseQuantityDialog, setOpenIncreaseQuantityDialog] = useState(false);
    const [ingredientId, setIngredientId] = useState(null);


    const handleOpenIncreaseQuantityDialog = (id) => {
        setIngredientId(id);
        setOpenIncreaseQuantityDialog(true)
        setFormData({
            quantity: ''
        })

    }

    const handleCloseIncreaseQuantityDialog = () => {
        setOpenIncreaseQuantityDialog(false);
    };

    const handleIncreaseQuantity = () => {

        apiIncreaseQuantity((response) => {
            showSuccessToast(response.message);
            setOpenIncreaseQuantityDialog(false);
            apiGetStockIngredients((response) => {
                setData(response.data);
            }, showErrorToast);
        }, showErrorToast, ingredientId, formData.quantity);

    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <>
            <GenericTable

                title={"Stoc ingrediente"}
                columns={columns}
                data={data}
                buttonText={rightCode === RIGHTS_MAPPING.ADMIN && "Adauga ingredient"}
                buttonAction={() => {
                    if (rightCode === RIGHTS_MAPPING.ADMIN) {
                        navigate('/dashboard/AddEditStockIngredient/0');
                    }
                }}
                edit={true}
                onEdit={(id) => {
                    navigate(`/dashboard/AddEditStockIngredient/${id}`);
                }}
                actions={actions}
            >

            </GenericTable>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle></DialogTitle>
                <DialogContent>
                    Esti sigur ca vrei sa stergi ingredientul?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={{ backgroundColor: 'rgb(235, 71, 17)', color: 'white' }}>
                        Anuleaza
                    </Button>
                    <Button onClick={handleDeleteOrderRequest} sx={{ backgroundColor: 'red', color: 'white' }}>
                        Sterge
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Employee Dialog */}
            <Dialog open={openIncreaseQuantityDialog} onClose={handleCloseIncreaseQuantityDialog} fullWidth maxWidth="xs">

                <DialogTitle>Creste cantitatea</DialogTitle>
                <DialogContent>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}  >


                        <Box sx={{ position: 'relative', width: '100%' }}>
                            <TextField
                                label="Cantitate"
                                name="quantity"
                                type='number'
                                value={formData.quantity || ''}
                                fullWidth
                                onChange={handleChange}
                                sx={{ ...addStyleToTextField(formData.quantity), mt: 1 }}
                            >
                            </TextField>


                        </Box>


                    </Box>

                </DialogContent>

                <DialogActions>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
                        <Button type="submit" variant="contained" sx={{
                            mr: 1, mb: 1, backgroundColor: 'rgb(235, 71, 17)', color: 'white'
                        }} onClick={handleIncreaseQuantity}

                        >
                            {'Creste cantitatea'}
                        </Button>
                        <Button variant="contained" color="error" sx={{ mb: 1 }} onClick={handleCloseIncreaseQuantityDialog}>
                            Renunta
                        </Button>
                    </Box>

                </DialogActions>

            </Dialog>


        </>
    );
};
export default StockIngredients;