import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { apiAddStockIngredient, apiGetStockIngredientById, apiUpdateStockIngredient } from "../../api/stockIngredients";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/utilFunctions";
import { addStyleToTextField } from "../../utils/utilFunctions";

const AddEditStockIngredient = () => {
    const navigate = useNavigate(); // Initialize navigate function
    const { ingredientId } = useParams();

    const [formData, setFormData] = useState({
        name: '',
        unit: '',
    });


    useEffect(() => {

        if (ingredientId && ingredientId !== "0") {
            apiGetStockIngredientById((response) => {
                parseStockIngredientResponse(response.data);
            }, showErrorToast, ingredientId)

        }
    }, [ingredientId])

    const parseStockIngredientResponse = (data) => {

        setFormData({
            name: data.name,
            unit: data.unit,
        });
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (ingredientId === '0') {
            apiAddStockIngredient((response) => { navigate(-1); showSuccessToast(response.message) }, showErrorToast, formData)
        } else {
            apiUpdateStockIngredient((response) => { navigate(-1) }, showErrorToast, ingredientId, formData)
        }
    };
    return (
        <>
            <Box sx={{ m: 2 }}  >
                <Typography variant="h4">
                    <span className="font-bold text-black">{ingredientId === "0" ? "Adauga ingredient" : "Editeaza ingredient"}</span>
                </Typography>

                <form onSubmit={handleSubmit}>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}  >
                        <TextField
                            label="Nume ingredient"
                            name="name"
                            type='string'
                            value={formData.name || ''}
                            fullWidth
                            onChange={handleChange}
                            sx={{ ...addStyleToTextField(formData.name), mt: 3 }}
                        >
                        </TextField>
                        <TextField
                            label='Unitate'
                            name="unit"
                            type="string"
                            value={formData.unit || ''}
                            onChange={handleChange}
                            fullWidth
                            sx={addStyleToTextField(formData.unit)}
                        />

                        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
                            <Button type="submit" variant="contained" sx={{ mr: 1, mb: 1, backgroundColor: 'rgb(235, 71, 17)', color: 'white' }}>
                                {ingredientId === "0" ? 'Adauga ingredient' : 'Editeaza ingredient'}
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

export default AddEditStockIngredient;