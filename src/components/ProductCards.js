import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActions,
    Button,
    IconButton,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Pagination,
    TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { apiDeleteCake, apiIncreaseQuantity, apiGetCakes } from '../api/cakes';
import { showErrorToast, showSuccessToast } from '../utils/utilFunctions';
import { apiGetUserRights } from '../api/rights';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddIcon from '@mui/icons-material/Add';
import { addStyleToTextField } from '../utils/utilFunctions';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { apiAddReservation } from '../api/reservations';

const ProductCards = ({ products, setProducts, editButton = false, deleteButton = false, reserveButton = false, addButton = false, title = false, addQuantityButton = false }) => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;

    const [formData, setFormData] = useState({
        quantity: '',
    });


    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleOpenDialog = (productId) => {
        setProductToDelete(productId);
        setOpenDialog(true);

    };

    const handleDeleteProduct = () => {
        apiDeleteCake(
            (response) => {
                showSuccessToast(response.message);
                setProducts(products => products.filter(product => product.id !== productToDelete));
                setOpenDialog(false);
            },
            showErrorToast,
            productToDelete,
        );
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };


    const [rightCode, setRightCode] = useState('');
    const [userId, setUserId] = useState(null);


    useEffect(() => {
        apiGetUserRights(
            (response) => {

                setRightCode(response[0]?.right_code);
                setUserId(response[0]?.user_id);

            },
        )
    }, [userId])

    // Calculate pagination
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);


    function getCardOnClick(product) {


        return () => handleOpenProductDetailsDialog(product);

    }

    const [product, setProduct] = useState(null);
    const [openProductDetailsDialog, setOpenProductDetailsDialog] = useState(false);

    const handleOpenProductDetailsDialog = (product) => {
        setProduct(product);
        setOpenProductDetailsDialog(true);
    };

    const handleCloseProductDetailsDialog = () => {
        setOpenProductDetailsDialog(false);
    };

    const [openAddQuantityDialog, setOpenAddQuantityDialog] = useState(false);
    const [openReserveDialog, setOpenReserveDialog] = useState(false);

    const [cakeId, setCakeId] = useState(null);
    const openAddDialog = (id) => {
        setCakeId(id);
        setOpenAddQuantityDialog(true)
        // apiGetIngredientsWhereNotInCake((response) => {
        //     setQuantities(response.data);
        //     console.log('stock ingredients', response.data);
        // }, showErrorToast, id);
    }


    const handleCloseAddQuantityDialog = () => {
        setOpenAddQuantityDialog(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        apiIncreaseQuantity((response) => {
            showSuccessToast(response.message);
            apiGetCakes((response) => {
                setProducts(response.data);
            }, showErrorToast);
        }, showErrorToast, cakeId, formData.quantity);

        setOpenAddQuantityDialog(false);


    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleOpenReserveDialog = (id) => {
        setCakeId(id);
        setOpenReserveDialog(true)

    }

    const handleCloseReserveDialog = () => {
        setOpenReserveDialog(false);
    };

    const handleAddReservation = () => {
        apiAddReservation((response) => {
            showSuccessToast(response.message);
            setOpenReserveDialog(false);
        }, showErrorToast, cakeId, formData.quantity);
    }

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>

                {title && (
                    <Typography variant="h4">{title}</Typography>
                )}
                {addButton && (
                    <Button
                        variant="contained"
                        onClick={() => navigate('/dashboard/addEditCake/0')}
                        sx={{ backgroundColor: 'rgb(235, 71, 17)', color: 'white' }}
                    >
                        Adauga prajitura
                    </Button>
                )}
            </Box>

            <Grid container spacing={3}>
                {currentItems.map((product) => (
                    <Grid item xs={12} sm={3} md={3} lg={3} key={product.id}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',

                                position: 'relative',
                                '&:hover': {
                                    boxShadow: 6,
                                    cursor: 'pointer'
                                }


                            }}
                            onClick={getCardOnClick(product, editButton, navigate, reserveButton)}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={`${process.env.REACT_APP_API_URL}/${product.photo}`}
                                alt={product.name}

                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        {product.name}
                                    </Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        {product.price + ' lei / buc'}
                                    </Typography>
                                </Box>
                                <Typography variant="body2" color="black" sx={{ mt: 1, mb: 1 }}>

                                    {product.description && product.description.length > 30
                                        ? <>
                                            {product.description.slice(0, 30)}<MoreHorizIcon fontSize="small" sx={{ ml: 0.5 }} />
                                        </>
                                        : product.description}

                                </Typography>
                                <Typography variant="body2" color="black">
                                    {product.grams_per_piece + 'g/buc.'}
                                </Typography>
                                <Typography variant="body2" color="black">
                                    {product.price_per_kg + ' lei/kg'}
                                </Typography>

                                <Typography variant="body2" color="black" sx={{ mt: 1 }}>
                                    {product.total_quantity + ' buc.'}
                                </Typography>


                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                                {addQuantityButton &&
                                    (
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                openAddDialog(product.id);
                                            }}
                                            sx={{ color: 'black' }}
                                        >
                                            <AddCircleOutlineIcon />
                                        </IconButton>
                                    )}
                                {editButton &&
                                    (
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/dashboard/addEditCake/${product.id}`);
                                            }}
                                            sx={{ color: 'black' }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                {deleteButton && (
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenDialog(product.id);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                )}
                                {reserveButton && (

                                    <Button
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenReserveDialog(product.id);
                                        }}
                                        sx={{ fontSize: '15px', fontWeight: 'bold', backgroundColor: 'rgb(235, 71, 17)', color: 'white' }}
                                        variant='contained'

                                    >
                                        {'Rezerva'}
                                    </Button>

                                )}

                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            )}

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Stergere prajitura</DialogTitle>
                <DialogContent>
                    Esti sigur ca vrei sa stergi aceasta prajitura?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={{ backgroundColor: 'rgb(235, 71, 17)', color: 'white' }} variant="contained">
                        Anuleaza
                    </Button>
                    <Button onClick={handleDeleteProduct} color="error" variant="contained" >
                        Sterge
                    </Button>
                </DialogActions>
            </Dialog>



            <Dialog open={openProductDetailsDialog} onClose={handleCloseProductDetailsDialog}>
                <DialogTitle>Detalii produs</DialogTitle>
                <DialogContent sx={{ width: '100%', height: '50%' }}>
                    <Typography variant="body2" color="black" sx={{ fontSize: '25px', fontWeight: 'bold' }}>
                        {product?.name}
                    </Typography>
                    <Typography variant="body2" color="black" sx={{ fontSize: '25px' }}>
                        {product?.description}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseProductDetailsDialog} sx={{ backgroundColor: 'rgb(235, 71, 17)', color: 'white' }}>
                        Inchide
                    </Button>
                </DialogActions>

            </Dialog>



            {/* Add Employee Dialog */}
            <Dialog open={openAddQuantityDialog} onClose={handleCloseAddQuantityDialog} fullWidth maxWidth="xs">
                <form onSubmit={handleSubmit} >
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
                            }}
                            >
                                {'Creste cantitatea'}
                            </Button>
                            <Button variant="contained" color="error" sx={{ mb: 1 }} onClick={() => handleCloseAddQuantityDialog()}>
                                Renunta
                            </Button>
                        </Box>

                    </DialogActions>
                </form>
            </Dialog>


            {/* Add Employee Dialog */}
            <Dialog open={openReserveDialog} onClose={handleCloseReserveDialog} fullWidth maxWidth="xs">

                <DialogTitle>Rezerva prajitura</DialogTitle>
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
                        }} onClick={handleAddReservation}

                        >
                            {'Rezerva'}
                        </Button>
                        <Button variant="contained" color="error" sx={{ mb: 1 }} onClick={() => handleCloseReserveDialog()}>
                            Renunta
                        </Button>
                    </Box>

                </DialogActions>

            </Dialog>


        </Box>
    );
};

export default ProductCards; 