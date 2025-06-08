import { Box, Button, TextField, Typography, List, ListItemText, ListItemButton } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/utilFunctions";
import { apiDeleteCakeIngredient } from "../../api/cakeIngredients";
import { addStyleToTextField } from "../../utils/utilFunctions";
import { apiGetCakes } from "../../api/cakes";
import { apiGetStockIngredients } from "../../api/stockIngredients";

const DeleteIngredient = ({ userRights }) => {
    const navigate = useNavigate(); // Initialize navigate function

    const rightCode = userRights[0].right_code;

    const [cakeSearchTerm, setCakeSearchTerm] = useState('');
    const [cakeSearchResults, setCakeSearchResults] = useState([]);

    const [ingredientSearchTerm, setIngredientSearchTerm] = useState('');
    const [ingredientSearchResults, setIngredientSearchResults] = useState([]);
    const [cakes, setCakes] = useState([]);
    const [quantities, setQuantities] = useState([]);
    const [selectedCake, setSelectedCake] = useState({});
    const [selectedIngredient, setSelectedIngredient] = useState({});
    const [completedForm, setCompletedForm] = useState(true);

    const [formData, setFormData] = useState({
        cake_id: '',
        ingredient_id: '',
    });


    useEffect(() => {
        apiGetCakes((response) => {
            setCakes(response.data);
        }, showErrorToast);

        apiGetStockIngredients((response) => {
            setQuantities(response.data);
        }, showErrorToast);
    }, [rightCode]);


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleCakeSearchChange = (event) => {
        const value = event.target.value;
        setCakeSearchTerm(value);

        console.log('cakes', cakes);
        if (value.trim()) {
            const searchTermLower = value.trim().toLowerCase();
            const filtered = cakes.filter(cake => {

                if (cake && cake.name) {
                    return cake.name.toLowerCase().includes(searchTermLower);
                }
                return false;
            });
            setCakeSearchResults(filtered);
        } else {
            setCakeSearchResults([]);
        }

    };


    const handleIngredientSearchChange = (event) => {
        const value = event.target.value;
        setIngredientSearchTerm(value);

        console.log('quantities', quantities);

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


    const handleAddCake = (cake) => {
        setSelectedCake(cake);

        console.log('cake', cake.name);

        setCakeSearchTerm(cake.name);
        setCakeSearchResults([]);

        formData.cake_id = cake.id;

        setCakeSearchResults([]);

    };


    const handleAddIngredient = (ingredient) => {

        setSelectedIngredient(ingredient);

        console.log('ingredient', ingredient.name);

        setIngredientSearchTerm(ingredient.name);
        setIngredientSearchResults([]);

        formData.ingredient_id = ingredient.id;

    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        apiDeleteCakeIngredient((response) => { showSuccessToast(response.message) },
            showErrorToast, formData.cake_id, formData.ingredient_id)

        setIngredientSearchResults([]);
        setIngredientSearchTerm('');
        setCakeSearchResults([]);
        setCakeSearchTerm('');
        setFormData({
            cake_id: '',
            ingredient_id: '',
        });

    };

    return (
        <>
            <Box sx={{ m: 2 }}  >
                <Typography variant="h4" sx={{ mb: 2 }}>
                    <span className="font-bold text-black">{"Sterge ingredient"}</span>
                </Typography>


                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={2}
                    sx={{
                        backgroundColor: 'white',
                        width: '100%'
                    }}
                >

                    <Box sx={{ position: 'relative', width: '100%' }}>
                        <TextField
                            label="Cauta prajitura"
                            variant="outlined"
                            fullWidth
                            value={cakeSearchTerm}
                            onChange={handleCakeSearchChange}
                            sx={addStyleToTextField(cakeSearchTerm)}

                        />


                        {cakeSearchResults.length > 0 && (
                            <List sx={{
                                position: 'absolute',
                                width: '100%',
                                bgcolor: 'background.paper',
                                boxShadow: 1,
                                borderRadius: '8px',
                                zIndex: 1300,
                                mt: 1,

                            }}>
                                {cakeSearchResults.map((cake) => (
                                    <ListItemButton
                                        key={cake.id}
                                        onClick={() => handleAddCake(cake)}
                                    >
                                        <ListItemText
                                            primary={cake.name}
                                        />
                                    </ListItemButton>
                                ))}
                            </List>
                        )}
                    </Box>



                    <Box sx={{ position: 'relative', width: '100%' }}>
                        <TextField
                            label="Cauta ingredient"
                            variant="outlined"
                            fullWidth
                            value={ingredientSearchTerm}
                            onChange={handleIngredientSearchChange}
                            sx={addStyleToTextField(ingredientSearchTerm)}

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

                    <Button
                        onClick={handleSubmit}
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{
                            backgroundColor: ' rgb(235, 71, 17)',
                            color: 'white',
                            borderRadius: '14px',
                            textTransform: 'none',
                            height: '40px',

                            ...(!completedForm && {
                                backgroundColor: ' rgb(235, 71, 17)',
                                opacity: 0.5,
                                color: 'white'
                            })
                        }}
                        disabled={!completedForm}
                    >

                        {'Sterge ingredient'}

                    </Button>
                </Box>


            </Box >
        </>
    )
}

export default DeleteIngredient;