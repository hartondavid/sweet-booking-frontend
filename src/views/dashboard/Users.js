import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetUsers, apiDeleteUser } from "../../api/user";
import { showErrorToast, showSuccessToast } from "../../utils/utilFunctions";
import { RIGHTS_MAPPING } from "../../utils/utilConstants";
import GenericTable from "../../components/GenericTable";
import dayjs from "dayjs";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Chip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const colorMap = {
    admin: 'blue',
    customer: 'green',

};
const columns = [
    { field: 'id', headerName: 'Nr.', type: 'string' },
    { field: 'name', headerName: 'Nume', type: 'string' },
    { field: 'email', headerName: 'Email', type: 'string' },
    { field: 'phone', headerName: 'Telefon', type: 'string' },
    {
        field: 'right_name', headerName: 'Rol', type: 'string', renderCell: ({ value }) => {
            const statusMap = {
                admin: 'Admin',
                customer: 'Client'
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
    {
        field: 'created_at', headerName: 'Data', type: 'date', renderCell: ({ value }) => {
            return dayjs(value).format('DD.MM.YYYY');
        }
    },

];

const Users = ({ userRights }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const rightCode = userRights[0]?.right_code;


    const [actions, setActions] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    useEffect(() => {
        if (rightCode === RIGHTS_MAPPING.ADMIN) {
            apiGetUsers(
                (response) => {
                    if (response.data) {

                        setData(response.data);
                    }
                },
                showErrorToast
            );

            let actionsTmp = [];

            actionsTmp = [
                { icon: <DeleteIcon />, color: 'red', onClick: handleOpenDialog },

            ];

            setActions(actionsTmp);
        }
    }, [data.length, rightCode]);



    // Function to open the delete confirmation dialog
    const handleOpenDialog = (userId) => {
        setUserToDelete(userId); // Store the seminar ID to be deleted
        setOpenDialog(true); // Open the dialog
    };


    const handleDeleteUserRequest = () => {
        apiDeleteUser((response) => {
            showSuccessToast(response.message);
            const updatedData = data.filter((user) => user.id !== userToDelete);
            setData(updatedData);
            setOpenDialog(false);

        }, showErrorToast, userToDelete);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };



    return (
        <>
            <GenericTable
                title={"Utilizatori"}
                columns={columns}
                data={data}
                buttonText={rightCode === RIGHTS_MAPPING.ADMIN && "Adauga utilizator"}
                buttonAction={() => {
                    if (rightCode === RIGHTS_MAPPING.ADMIN) {
                        navigate('/dashboard/addUser');
                    }
                }}

                actions={actions}

            >

            </GenericTable>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle></DialogTitle>
                <DialogContent>
                    {`Esti sigur ca vrei sa stergi utilizatorul ${data.find((user) => user.id === userToDelete)?.name}?`}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={{ backgroundColor: 'rgb(235, 71, 17)', color: 'white' }}>
                        Anuleaza
                    </Button>
                    <Button onClick={handleDeleteUserRequest} sx={{ backgroundColor: 'red', color: 'white' }}>
                        Sterge
                    </Button>
                </DialogActions>
            </Dialog>


        </>
    );
};

export default Users;