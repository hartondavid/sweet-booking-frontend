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
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { apiDeleteCake } from '../api/cakes';
import { showErrorToast, showSuccessToast } from '../utils/utilFunctions';
import { apiGetUserRights } from '../api/rights';
import { RIGHTS_MAPPING } from '../utils/utilConstants';

const ProductCards = ({ products, setProducts, editButton = false, deleteButton = false, reserveButton = false,
    showAddButton = false, title = false }) => {
    const navigate = useNavigate();
    const [openDialog, setOpenDialog] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 8;
    const [openLoginDialog, setOpenLoginDialog] = useState(false);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleOpenDialog = (productId) => {
        setProductToDelete(productId);
        setOpenDialog(true);
        console.log('rightCode', rightCode);

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


    console.log('rightCode', rightCode);


    // Calculate pagination
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
    const totalItems = products.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);


    function getCardOnClick(product, editButton, navigate) {
        if (editButton) {
            return () => navigate(`/dashboard/addEditCake/${product.id}`);
        }

    }



    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>

                {title && (
                    <Typography variant="h4">{title}</Typography>
                )}
                {rightCode === RIGHTS_MAPPING.ADMIN && (
                    <Button
                        variant="contained"
                        onClick={() => navigate('/dashboard/addEditCake/0')}
                        sx={{ backgroundColor: '#1976d2', color: 'white' }}
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
                                    boxShadow: product.status === 'inactive' ? 1 : 6,
                                    cursor: product.status === 'inactive' ? 'not-allowed' : 'pointer'
                                }

                            }}
                            onClick={getCardOnClick(product, editButton, navigate)}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={`${process.env.REACT_APP_API_URL}/${product.photo}`}
                                alt={product.name}
                                sx={{
                                    objectFit: 'cover',
                                    // filter: product.status === 'inactive' ? 'grayscale(50%)' : 'none'
                                }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="black" sx={{ mb: 1, fontSize: '20px' }}>
                                    {product.description}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '20px' }}>
                                    {product.price + ' lei'}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '20px' }}>
                                    {product.total_quantity + ' buc'}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div" sx={{ fontSize: '20px' }}>
                                    {product.kcal + ' kcal'}
                                </Typography>


                            </CardContent>
                            <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
                                {editButton && rightCode === RIGHTS_MAPPING.ADMIN &&
                                    (
                                        <IconButton
                                            size="small"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/dashboard/addEditCake/${product.id}`);
                                            }}
                                            sx={{ color: '#1976d2' }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                {deleteButton && rightCode === RIGHTS_MAPPING.ADMIN && (
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
                                {rightCode === RIGHTS_MAPPING.CUSTOMER && (

                                    <Button
                                        size="small"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/dashboard/addReservation/${product.id}`);
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
                    <Button onClick={handleCloseDialog} color="primary" variant="contained">
                        Anuleaza
                    </Button>
                    <Button onClick={handleDeleteProduct} color="error" variant="contained" startIcon={<DeleteIcon />}>
                        Sterge
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default ProductCards; 