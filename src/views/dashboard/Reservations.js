import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GenericTable from "../../components/GenericTable";
import { apiGetCakeIngredientsByCakeId } from "../../api/cakeIngredients";
import { showErrorToast, showSuccessToast } from "../../utils/utilFunctions";
import { Chip } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { apiGetReservationsByAdminId, apiGetReservationsByCustomerId } from "../../api/reservations";
import { RIGHTS_MAPPING } from "../../utils/utilConstants";
const colorMap = {
    placed: 'orange',
    cancelled: 'red',
    picked_up: 'green'
};

const columns = [
    { field: 'id', headerName: 'Id', type: 'string' },
    { field: 'name', headerName: 'Nume', type: 'string' },
    { field: 'photo', headerName: 'Foto', type: 'filepath' },
    { field: 'price', headerName: 'Pret', type: 'string' },
    { field: 'quantity', headerName: 'Cantitate', type: 'string' },
    {
        field: 'status', headerName: 'Status', type: 'string',
        renderCell: ({ value }) => {
            const statusMap = {
                placed: 'Plasata',
                cancelled: 'Anulata',
                picked_up: 'Luata'
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

                    }}

                />
            );
        }
    },
    { field: 'customer_name', headerName: 'Client', type: 'string' },
    { field: 'updated_at', headerName: 'Data', type: 'date' },

];


const Reservations = ({ userRights }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const rightCode = userRights[0]?.right_code;


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



    return (
        <>
            <GenericTable

                title={"Prajituri rezervate"}
                columns={columns}
                data={data}
                edit={rightCode === RIGHTS_MAPPING.ADMIN}
                onEdit={(id) => {
                    console.log('reservationId', id);
                    navigate(`/dashboard/updateReservationStatus/${id}`);
                }}

            >

            </GenericTable>



        </>
    );
};
export default Reservations;