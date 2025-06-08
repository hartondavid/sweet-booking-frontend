import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GenericTable from "../../components/GenericTable";
import { apiGetCakeIngredientsByCakeId } from "../../api/cakeIngredients";
import { showErrorToast, showSuccessToast } from "../../utils/utilFunctions";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, CircularProgress, List, ListItem, ListItemText, IconButton, Box, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { apiGetIngredientsByCakeId } from "../../api/cakeIngredients";

const columns = [
    { field: 'id', headerName: 'Id', type: 'string' },
    { field: 'name', headerName: 'Nume', type: 'string' },
    { field: 'photo', headerName: 'Foto', type: 'filepath' },
    { field: 'price', headerName: 'Pret', type: 'string' },
    { field: 'description', headerName: 'Descriere', type: 'string' },

    { field: 'kcal', headerName: 'Kcal', type: 'string' },
    { field: 'created_at', headerName: 'Data', type: 'date' },

];

const CakeIngredients = ({ user }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    // const rightCode = user?.userRights[0]?.right_code;
    console.log('user', user);


    useEffect(() => {

        apiGetCakeIngredientsByCakeId((response) => {
            setData(response.data);
            console.log('ingredients', response.data);
        }, showErrorToast);



    }, [data.length]);


    const childrenData = data.reduce((acc, cake) => {
        const cakeId = cake.id;

        if (!acc[cakeId]) {
            acc[cakeId] = [];
        }
        if (cake.ingredients && Array.isArray(cake.ingredients)) {
            acc[cakeId].push(
                ...cake.ingredients.map((ingredient, idx) => ({
                    id: ingredient.id || `${cakeId}-${idx}`,
                    name: ingredient.name,
                    quantity: ingredient.quantity
                }))
            );
        }
        return acc;
    }, {});

    const childrenColumns = [
        { field: 'name', headerName: 'Nume' },
        { field: 'quantity', headerName: 'Cantitate' },
    ];



    return (
        <>
            <GenericTable

                title={"Ingrediente"}
                columns={columns}
                data={data}
                childrenColumns={childrenColumns}
                childrenData={childrenData}
                isExtendedTable={true}
            >

            </GenericTable>



        </>
    );
};
export default CakeIngredients;