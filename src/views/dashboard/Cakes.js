import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiGetCakes } from "../../api/cakes";
import { showErrorToast } from "../../utils/utilFunctions";
import ProductCards from "../../components/ProductCards";
import { useParams } from "react-router-dom";
import { apiGetUserRights } from "../../api/rights";

const Cakes = ({ user, userRights }) => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const { cardId } = useParams();
    const loggedUser = user?.user?.data;
    const [cartId, setCartId] = useState(null);


    useEffect(() => {
        apiGetCakes(
            (response) => {
                if (response.data) {
                    console.log('cakes', response.data);
                    setData(response.data);
                }
            },
            showErrorToast
        );
    }, []);

    const [rightCode, setRightCode] = useState('');

    useEffect(() => {
        apiGetUserRights(
            (response) => {

                setRightCode(response);
                console.log('userrightsssssssssssssssssss', response);

            },
        )
    }, [loggedUser?.id, user?.id])

    return (
        <ProductCards
            data={data}
            products={data}
            title="Prajituri"
            cartId={cartId}
            editButton={true}
            deleteButton={true}
            setProducts={setData}

        />
    );
};

export default Cakes;