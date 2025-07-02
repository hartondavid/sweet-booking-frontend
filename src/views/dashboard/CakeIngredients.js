import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import GenericTable from "../../components/GenericTable";
import { apiGetCakeIngredientsByCakeId } from "../../api/cakeIngredients";
import { showErrorToast, showSuccessToast } from "../../utils/utilFunctions";
import dayjs from 'dayjs';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, List, ListItemButton, ListItemText } from "@mui/material";
import { apiAddCakeIngredientToCake, apiUpdateCakeIngredient, apiDeleteCakeIngredient } from "../../api/cakeIngredients";
import { addStyleToTextField } from "../../utils/utilFunctions";
import { apiGetCakes } from "../../api/cakes";
import { apiGetIngredientsWhereNotInCake, apiGetIngredientsWhereInCake } from "../../api/stockIngredients";
import AddBoxIcon from '@mui/icons-material/AddBox';
import EditSquareIcon from '@mui/icons-material/EditSquare';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
    { field: 'id', headerName: 'Id', type: 'string' },
    { field: 'name', headerName: 'Nume', type: 'string' },
    { field: 'photo', headerName: 'Foto', type: 'filepath' },
    {
        field: 'price', headerName: 'Pret', type: 'string', renderCell: ({ value }) => {
            return value + ' lei';
        }
    },
    { field: 'description', headerName: 'Descriere', type: 'string' },

    { field: 'kcal', headerName: 'Kcal', type: 'string' },
    {
        field: 'created_at', headerName: 'Data', type: 'date', renderCell: ({ value }) => {
            return dayjs(value).format('DD.MM.YYYY');
        }
    },

];

const CakeIngredients = ({ userRights }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    const [ingredientSearchTerm, setIngredientSearchTerm] = useState('');
    const [ingredientSearchResults, setIngredientSearchResults] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [actions, setActions] = useState([]);
    const rightCode = userRights[0]?.right_code;
    const [cakeId, setCakeId] = useState(null);
    const [openAddIngredientDialog, setOpenAddIngredientDialog] = useState(false);
    const [openEditIngredientDialog, setOpenEditIngredientDialog] = useState(false);
    const [openDeleteIngredientDialog, setOpenDeleteIngredientDialog] = useState(false);


    const [formData, setFormData] = useState({
        ingredient_id: '',
        quantity: '',
    });

    useEffect(() => {

        apiGetCakeIngredientsByCakeId((response) => {
            setData(response.data);

        }, showErrorToast);

        let actionsTmp = [];

        actionsTmp = [
            {
                icon: (<AddBoxIcon />), color: 'black', onClick: openAddDialog
            },

            { icon: (<EditSquareIcon />), color: 'black', onClick: openEditDialog },
            { icon: (<DeleteIcon />), color: 'red', onClick: openDeleteDialog },


        ];

        setActions(actionsTmp);

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
                    quantity: `${ingredient.quantity} ${ingredient.unit}`,

                }))
            );
        }
        return acc;
    }, {});

    const childrenColumns = [
        { field: 'name', headerName: 'Nume' },
        { field: 'quantity', headerName: 'Cantitate' },

    ];


    const openAddDialog = (id) => {
        setCakeId(id);
        setOpenAddIngredientDialog(true)
        apiGetIngredientsWhereNotInCake((response) => {
            setQuantities(response.data);
        }, showErrorToast, id);

        setFormData({
            ingredient_id: '',
            quantity: '',
        });
        setIngredientSearchTerm('');
        setIngredientSearchResults([]);
    }

    const openEditDialog = (id) => {
        setCakeId(id);
        setOpenEditIngredientDialog(true)
        apiGetIngredientsWhereInCake((response) => {
            setQuantities(response.data);
        }, showErrorToast, id);
        setFormData({
            ingredient_id: '',
            quantity: '',
        });
        setIngredientSearchTerm('');
        setIngredientSearchResults([]);
    }

    const openDeleteDialog = (id) => {
        setCakeId(id);
        setOpenDeleteIngredientDialog(true)
        apiGetIngredientsWhereInCake((response) => {
            setQuantities(response.data);

        }, showErrorToast, id);
        setIngredientSearchTerm('');
        setIngredientSearchResults([]);

        setFormData({
            ingredient_id: '',

        });

    }



    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };


    const handleIngredientSearchChange = (event) => {
        const value = event.target.value;
        setIngredientSearchTerm(value);

        if (value.trim()) {
            const searchTermLower = value.trim().toLowerCase();
            const filtered = quantities.filter(quantity => {

                if (quantity && quantity.name) {
                    return quantity.name.toLowerCase().includes(searchTermLower);
                }
                return false;
            });
            setIngredientSearchResults(filtered);
        } else {
            setIngredientSearchResults([]);
        }
    };

    const handleAddIngredient = (ingredient) => {

        setIngredientSearchTerm(ingredient.name);
        setIngredientSearchResults([]);

        formData.ingredient_id = ingredient.id;

    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (openAddIngredientDialog) {

            apiAddCakeIngredientToCake((response) => {
                showSuccessToast(response.message)

                setOpenAddIngredientDialog(false);
            },
                showErrorToast, cakeId, formData.ingredient_id, formData.quantity)


        } else if (openEditIngredientDialog) {

            apiUpdateCakeIngredient((response) => {
                showSuccessToast(response.message)
                setOpenEditIngredientDialog(false);
            },
                showErrorToast, cakeId, formData.ingredient_id, formData.quantity)


        } else if (openDeleteIngredientDialog) {

            apiDeleteCakeIngredient((response) => {
                showSuccessToast(response.message)
                setOpenDeleteIngredientDialog(false);
                apiGetCakeIngredientsByCakeId((response) => {
                    setData(response.data);
                }, showErrorToast);


            },
                showErrorToast, cakeId, formData.ingredient_id)

        }

        apiGetCakeIngredientsByCakeId((response) => {
            setData(response.data);
        }, showErrorToast);

    };


    const handleCloseAddIngredientDialog = () => {
        setOpenAddIngredientDialog(false);
        setIngredientSearchTerm('');
        setIngredientSearchResults([]);
        apiGetCakeIngredientsByCakeId((response) => {
            setData(response.data)
        }, showErrorToast);
        setFormData({
            ingredient_id: '',
            quantity: '',
        });


    };

    const handleCloseEditIngredientDialog = () => {
        setOpenEditIngredientDialog(false);
        setIngredientSearchTerm('');
        setIngredientSearchResults([]);
        apiGetCakeIngredientsByCakeId((response) => {
            setData(response.data)
        }, showErrorToast);

    };

    const handleCloseDeleteIngredientDialog = () => {
        setOpenDeleteIngredientDialog(false);
        setIngredientSearchTerm('');
        setIngredientSearchResults([]);
        apiGetCakeIngredientsByCakeId((response) => {
            setData(response.data)
        }, showErrorToast);

    };

    return (
        <>
            <GenericTable

                title={"Ingrediente"}
                columns={columns}
                data={data}
                childrenColumns={childrenColumns}
                childrenData={childrenData}
                isExtendedTable={true}
                actions={actions}

            >

            </GenericTable>

            {/* Add Employee Dialog */}
            <Dialog open={openAddIngredientDialog} onClose={handleCloseAddIngredientDialog} fullWidth maxWidth="sm">
                <form onSubmit={handleSubmit} >
                    <DialogTitle>Adauga ingredient la prajitura</DialogTitle>
                    <DialogContent>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}  >

                            <Box sx={{ position: 'relative', width: '100%' }}>
                                <TextField
                                    label="Cauta ingredient"
                                    variant="outlined"
                                    fullWidth
                                    value={ingredientSearchTerm}
                                    onChange={handleIngredientSearchChange}
                                    sx={{ ...addStyleToTextField(ingredientSearchTerm), mt: 1 }}

                                />

                                {ingredientSearchResults.length > 0 && (
                                    <List sx={{
                                        position: 'absolute',
                                        width: '100%',
                                        bgcolor: 'background.paper',
                                        boxShadow: 1,
                                        borderRadius: '8px',
                                        zIndex: 1300,
                                        mt: 1
                                    }}>
                                        {ingredientSearchResults.map((ingredient) => (
                                            <ListItemButton
                                                key={ingredient.id}
                                                onClick={() => handleAddIngredient(ingredient)}
                                            >
                                                <ListItemText
                                                    primary={ingredient.name}
                                                />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                )}
                            </Box>

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

                        </Box>

                    </DialogContent>

                    <DialogActions>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
                            <Button type="submit" variant="contained" sx={{
                                mr: 1, mb: 1, backgroundColor: 'rgb(235, 71, 17)', color: 'white',
                            }}


                            >
                                {'Adauga ingredient'}
                            </Button>
                            <Button variant="contained" color="error" sx={{ mb: 1 }} onClick={() => handleCloseAddIngredientDialog()}>
                                Renunta
                            </Button>
                        </Box>

                    </DialogActions>
                </form>
            </Dialog>




            {/* Add Employee Dialog */}
            <Dialog open={openEditIngredientDialog} onClose={handleCloseEditIngredientDialog} fullWidth maxWidth="sm">
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Editeaza ingredient la prajitura</DialogTitle>
                    <DialogContent>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}  >

                            <Box sx={{ position: 'relative', width: '100%' }}>
                                <TextField
                                    label="Cauta ingredient"
                                    variant="outlined"
                                    fullWidth
                                    value={ingredientSearchTerm}
                                    onChange={handleIngredientSearchChange}
                                    sx={{ ...addStyleToTextField(ingredientSearchTerm), mt: 1 }}

                                />

                                {ingredientSearchResults.length > 0 && (
                                    <List sx={{
                                        position: 'absolute',
                                        width: '100%',
                                        bgcolor: 'background.paper',
                                        boxShadow: 1,
                                        borderRadius: '8px',
                                        zIndex: 1300,
                                        mt: 1
                                    }}>
                                        {ingredientSearchResults.map((ingredient) => (
                                            <ListItemButton
                                                key={ingredient.id}
                                                onClick={() => handleAddIngredient(ingredient)}
                                            >
                                                <ListItemText
                                                    primary={ingredient.name}
                                                />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                )}
                            </Box>

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
                        </Box>

                    </DialogContent>

                    <DialogActions>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
                            <Button type="submit" variant="contained" sx={{ mr: 1, mb: 1, backgroundColor: 'rgb(235, 71, 17)', color: 'white' }}>
                                {'Editeaza ingredient'}
                            </Button>
                            <Button variant="contained" color="error" sx={{ mb: 1 }} onClick={() => handleCloseEditIngredientDialog()}>
                                Renunta
                            </Button>
                        </Box>

                    </DialogActions>
                </form>
            </Dialog>



            {/* Add Employee Dialog */}
            <Dialog open={openDeleteIngredientDialog} onClose={handleCloseDeleteIngredientDialog} fullWidth maxWidth="sm">
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Sterge ingredient la prajitura</DialogTitle>
                    <DialogContent>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}  >

                            <Box sx={{ position: 'relative', width: '100%', height: '100px' }}>
                                <TextField
                                    label="Cauta ingredient"
                                    variant="outlined"
                                    fullWidth
                                    value={ingredientSearchTerm}
                                    onChange={handleIngredientSearchChange}
                                    sx={{ ...addStyleToTextField(ingredientSearchTerm), mt: 1 }}

                                />

                                {ingredientSearchResults.length > 0 && (
                                    <List sx={{
                                        position: 'absolute',
                                        width: '100%',
                                        bgcolor: 'background.paper',
                                        boxShadow: 1,
                                        borderRadius: '8px',
                                        zIndex: 1300,
                                        mt: 1
                                    }}>
                                        {ingredientSearchResults.map((ingredient) => (
                                            <ListItemButton
                                                key={ingredient.id}
                                                onClick={() => handleAddIngredient(ingredient)}
                                            >
                                                <ListItemText
                                                    primary={ingredient.name}
                                                />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                )}
                            </Box>
                        </Box>

                    </DialogContent>

                    <DialogActions>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
                            <Button type="submit" variant="contained" sx={{ mr: 1, mb: 1, backgroundColor: 'error.main', color: 'white' }}>
                                {'Sterge ingredient'}
                            </Button>
                            <Button variant="contained" sx={{ mb: 1, backgroundColor: 'rgb(235, 71, 17)', color: 'white' }} onClick={() => handleCloseDeleteIngredientDialog()}>
                                Renunta
                            </Button>
                        </Box>

                    </DialogActions>
                </form>
            </Dialog>

        </>
    );
};
export default CakeIngredients;