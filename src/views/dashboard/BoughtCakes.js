import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GenericTable from "../../components/GenericTable";
import { showErrorToast, showSuccessToast } from "../../utils/utilFunctions";
import { apiGetBoughtCakesByAdminId, apiGetBoughtCakesByCustomerId } from "../../api/cakes";
import { RIGHTS_MAPPING } from "../../utils/utilConstants";

const columns = [
    { field: 'id', headerName: 'Id', type: 'string' },
    { field: 'name', headerName: 'Nume', type: 'string' },
    { field: 'photo', headerName: 'Foto', type: 'filepath' },
    { field: 'price', headerName: 'Pret', type: 'string' },
    { field: 'quantity', headerName: 'Cantitate', type: 'string' },
    { field: 'customer_name', headerName: 'Client', type: 'string' },
    { field: 'updated_at', headerName: 'Data', type: 'date' },

];


const BoughtCakes = ({ userRights }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const rightCode = userRights[0]?.right_code;
    useEffect(() => {


        if (rightCode === RIGHTS_MAPPING.ADMIN) {
            apiGetBoughtCakesByAdminId((response) => {
                setData(response.data);
                console.log('ingredients', response.data);
            }, showErrorToast);
        } else if (rightCode === RIGHTS_MAPPING.CUSTOMER) {
            apiGetBoughtCakesByCustomerId((response) => {
                setData(response.data);
                console.log('ingredients', response.data);
            }, showErrorToast);
        }


    }, [data.length, rightCode]);


    return (
        <>
            <GenericTable
                title={"Prajituri cumparate"}
                columns={columns}
                data={data}
            >

            </GenericTable>

        </>
    );
};
export default BoughtCakes;