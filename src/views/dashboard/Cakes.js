import React, { useState, useEffect } from "react";
import { apiGetCakesByCustomerId, apiGetCakes } from "../../api/cakes";
import { showErrorToast } from "../../utils/utilFunctions";
import ProductCards from "../../components/ProductCards";
import { RIGHTS_MAPPING } from '../../utils/utilConstants';

const Cakes = ({ userRights }) => {

    const [data, setData] = useState([]);

    const rightCode = userRights[0]?.right_code;

    useEffect(() => {
        if (rightCode === RIGHTS_MAPPING.CUSTOMER) {
            apiGetCakesByCustomerId(
                (response) => {
                    if (response.data) {
                        setData(response.data);
                    }
                },
                showErrorToast
            );
        } else if (rightCode === RIGHTS_MAPPING.ADMIN) {
            apiGetCakes(
                (response) => {
                    if (response.data) {
                        setData(response.data);
                    }
                },
                showErrorToast
            );
        }
    }, [data.length, rightCode]);


    return (
        <ProductCards
            data={data}
            products={data}
            title="Prajituri"
            editButton={rightCode === RIGHTS_MAPPING.ADMIN}
            deleteButton={rightCode === RIGHTS_MAPPING.ADMIN}
            setProducts={setData}
            addButton={rightCode === RIGHTS_MAPPING.ADMIN}
            reserveButton={rightCode === RIGHTS_MAPPING.CUSTOMER}
            addQuantityButton={rightCode === RIGHTS_MAPPING.ADMIN}

        />
    );
};

export default Cakes;