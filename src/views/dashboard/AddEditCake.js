import { Box, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { apiAddCake, apiGetCakeById, apiUpdateCake } from "../../api/cakes";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/utilFunctions";
import EditIcon from '@mui/icons-material/Edit';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { addStyleToTextField } from "../../utils/utilFunctions";

const CreateEditCake = ({
}) => {
    const navigate = useNavigate(); // Initialize navigate function
    const { cakeId } = useParams();
    //Dialog for image path
    const [dialogContent, setDialogContent] = useState('');
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);  // For the modal
    const [fileForImagePath, setFileForImagePath] = useState(null);

    const [confirm, setConfirm] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        photo: null,
        kcal: '',
        grams_per_piece: '',

    });

    useEffect(() => {
        if (cakeId && cakeId !== "0") {
            apiGetCakeById((response) => {
                parseCakeResponse(response.data);
                setConfirm(true);
            }, showErrorToast, cakeId)
        }
    }, [cakeId])

    const parseCakeResponse = (data) => {
        setFormData({
            name: data.name || '',
            price: data.price || 0,
            description: data.description || '',
            photo: data.photo ? `${process.env.REACT_APP_API_URL}/${data.photo}` : null,
            kcal: data.kcal || 0,
            grams_per_piece: data.grams_per_piece || 0,
        });
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // Open the dialog
    const handleOpenDialog = (dialogTitle, dialogContent) => {
        setDialogContent(dialogContent)
        setDialogTitle(dialogTitle)
        setDialogOpen(true);
    };

    // Close the dialog
    const handleCloseDialog = () => {
        setDialogContent('')
        setDialogTitle('')
        setDialogOpen(false);
        //setFile(null);
    };



    // Handle file change
    const handleFileForImagePathChange = (e) => {
        const selectedFile = e.target.files[0];
        setFileForImagePath(selectedFile);
        setFormData({ ...formData, photo: URL.createObjectURL(selectedFile) }); // Update the state to show the preview

    };

    // Handle confirmation for photo upload
    const handleConfirmForImagePath = () => {
        if (fileForImagePath) {
            setFormData({ ...formData, photo: URL.createObjectURL(fileForImagePath) });
            handleCloseDialog();
            setConfirm(true);
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();


        const payload = {
            name: formData.name,
            price: formData.price,
            description: formData.description,
            kcal: formData.kcal,
            grams_per_piece: formData.grams_per_piece,

        }

        if (fileForImagePath) {
            payload.photo = fileForImagePath;
        }

        if (cakeId === '0') {
            apiAddCake((response) => {
                console.log('Cake added successfully:', response);
                navigate(-1);
                showSuccessToast('Prăjitura a fost adăugată cu succes!')
            }, showErrorToast, payload)
        } else {
            apiUpdateCake((response) => { navigate(-1) }, showErrorToast, cakeId, payload)
        }
    };
    return (
        <>
            <Box sx={{ marginLeft: '20px', marginRight: '20px', marginTop: '20px' }}  >
                <Typography variant="h4">
                    <span className="font-bold text-black">{cakeId === "0" ? "Adauga produs" : "Editeaza produs"}</span>
                </Typography>

                <form onSubmit={handleSubmit}>

                    {/* Display photo or add photo button */}
                    <Box sx={{
                        position: 'relative',
                        display: 'inline-block',
                        marginTop: '20px',
                        marginBottom: '20px',
                    }}>

                        {formData.photo && confirm ? (
                            <>
                                <img
                                    src={formData.photo}
                                    alt=""
                                    style={{
                                        maxHeight: '300px',
                                        maxWidth: '300px',
                                        objectFit: 'contain',
                                        borderRadius: '8px',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}
                                />
                                {(
                                    <Button
                                        variant="contained"
                                        onClick={() => handleOpenDialog("Schimba poza", "Va rugam selectati o noua poza pentru produs", "photo")}
                                        sx={{
                                            position: 'absolute',
                                            bottom: '30px',
                                            right: '10px',
                                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                                            },
                                            borderRadius: '20px',
                                            padding: '8px 16px',
                                            fontSize: '0.875rem',
                                            textTransform: 'none',
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                                            backdropFilter: 'blur(4px)'
                                        }}
                                        startIcon={<EditIcon sx={{ fontSize: '1rem' }} />}
                                    >
                                        Schimba poza
                                    </Button>
                                )}
                            </>
                        ) : (
                            <Button
                                variant="outlined"
                                onClick={() => handleOpenDialog("Adauga poza", "Va rugam adaugati o poza pentru produs", "photo")}
                                sx={{
                                    width: '300px',
                                    height: '200px',
                                    border: '2px dashed #ccc',
                                    borderRadius: '8px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.02)',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                        border: '2px dashed #666',
                                    },
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    textTransform: 'none'
                                }}
                            >
                                <AddPhotoAlternateIcon sx={{ fontSize: '2.5rem', color: '#666' }} />
                                <Typography variant="body1" sx={{ color: '#666' }}>
                                    Adauga poza
                                </Typography>
                                <Typography variant="caption" sx={{ color: '#999' }}>
                                    Click pentru a selecta o imagine
                                </Typography>
                            </Button>
                        )}
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}  >
                        <TextField
                            label="Nume"
                            name="name"
                            type='string'
                            value={formData.name || ''}
                            fullWidth
                            onChange={handleChange}
                            sx={addStyleToTextField(formData.name)}
                        >
                        </TextField>
                        <TextField
                            label='Pret'
                            name="price"
                            type="string"
                            value={formData.price || ''}
                            onChange={handleChange}
                            fullWidth
                            sx={addStyleToTextField(formData.price)}
                        />
                        <TextField
                            label='Descriere'
                            name="description"
                            type="string"
                            value={formData.description || ''}
                            onChange={handleChange}
                            fullWidth
                            sx={addStyleToTextField(formData.description)}
                        />
                        <TextField
                            label='Kcal'
                            name="kcal"
                            type="number"
                            value={formData.kcal || ''}
                            onChange={handleChange}
                            fullWidth
                            sx={addStyleToTextField(formData.kcal)}
                        />
                        <TextField
                            label='Gramaj/buc'
                            name="grams_per_piece"
                            type="number"
                            value={formData.grams_per_piece || ''}
                            onChange={handleChange}
                            fullWidth
                            sx={addStyleToTextField(formData.grams_per_piece)}
                        />


                        {/* Dialog for confirmation and file upload */}
                        {dialogOpen && (
                            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                                <DialogTitle>{dialogTitle}</DialogTitle>
                                <DialogContent>
                                    <Box>
                                        <input
                                            type="file"
                                            name="photo"
                                            accept="image/*,.pdf"
                                            onChange={handleFileForImagePathChange}
                                        />
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleCloseDialog} color="error" variant="contained" >Anuleaza</Button>
                                    <Button onClick={handleConfirmForImagePath} sx={{ backgroundColor: 'rgb(235, 71, 17)', color: 'white' }} variant="contained" >Confirma</Button>

                                </DialogActions>
                            </Dialog>
                        )}


                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1, mb: 1 }}>
                            <Button type="submit" variant="contained" sx={{ mr: 1, mb: 1, backgroundColor: 'rgb(235, 71, 17)', color: 'white' }}>
                                {cakeId === "0" ? 'Adauga prajitura' : 'Editeaza prajitura'}
                            </Button>
                            <Button variant="contained" color="error" sx={{ mb: 1 }} onClick={() => navigate(-1)}>
                                Renunta
                            </Button>
                        </Box>
                    </Box>
                </form>
            </Box>
        </>
    )
}

export default CreateEditCake;