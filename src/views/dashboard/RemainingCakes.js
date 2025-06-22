import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GenericTable from "../../components/GenericTable";
import { showErrorToast, showSuccessToast } from "../../utils/utilFunctions";
import { apiGetRemainingCakes } from "../../api/cakes";
import dayjs from 'dayjs';

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
        field: 'total_quantity', headerName: 'Cantitate', type: 'string', renderCell: ({ value }) => {
            return value + ' buc';
        }
    },
    {
        field: 'updated_at', headerName: 'Data', type: 'date', renderCell: ({ value }) => {
            return dayjs(value).format('DD.MM.YYYY');
        }
    },

];


const RemainingCakes = ({ userRights }) => {
    const [data, setData] = useState([]);
    useEffect(() => {

        apiGetRemainingCakes((response) => {
            setData(response.data);
        }, showErrorToast);

    }, [data.length]);


    return (
        <>
            <GenericTable
                title={"Prajituri ramase"}
                columns={columns}
                data={data}
            >

            </GenericTable>

        </>
    );
};
export default RemainingCakes;