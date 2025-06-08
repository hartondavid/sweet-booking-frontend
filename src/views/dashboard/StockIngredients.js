import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GenericTable from "../../components/GenericTable";
import { apiGetStockIngredients } from "../../api/stockIngredients";
import { showErrorToast, showSuccessToast } from "../../utils/utilFunctions";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress, List, ListItem, ListItemText, IconButton, Box, Typography } from "@mui/material";
import { RIGHTS_MAPPING } from "../../utils/utilConstants";
import { apiDeleteStockIngredient } from "../../api/stockIngredients";
import DeleteIcon from '@mui/icons-material/Delete';
const columns = [
    { field: 'id', headerName: 'Id', type: 'string' },
    { field: 'name', headerName: 'Nume', type: 'string' },
    { field: 'stock_quantity', headerName: 'Cantitate', type: 'string' },
    { field: 'created_at', headerName: 'Data', type: 'date' },

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
                console.log('ingredients', response.data);
            }, showErrorToast);

            setActions([
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

    return (
        <>
            <GenericTable

                title={"Stoc ingrediente"}
                columns={columns}
                data={data}
                buttonText={rightCode === RIGHTS_MAPPING.ADMIN && "Adauga comanda"}
                buttonAction={() => {
                    if (rightCode === RIGHTS_MAPPING.ADMIN) {
                        navigate('/dashboard/addEditStockIngredient/0');
                    }
                }}
                edit={true}
                onEdit={(id) => {
                    navigate(`/dashboard/addEditStockIngredient/${id}`);
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
                    <Button onClick={handleCloseDialog} sx={{ backgroundColor: '#009688', color: 'white' }}>
                        Anuleaza
                    </Button>
                    <Button onClick={handleDeleteOrderRequest} sx={{ backgroundColor: 'red', color: 'white' }}>
                        Sterge
                    </Button>
                </DialogActions>
            </Dialog>


        </>
    );
};
export default StockIngredients;