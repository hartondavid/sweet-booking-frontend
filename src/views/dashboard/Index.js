import { Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { RIGHTS_MAPPING } from "../../utils/utilConstants";
const Dashboard = ({ userRights }) => {

    const rightCode = userRights[0]?.right_code;

    return (
        <>
            <Typography variant="h4">
                {/* <span className="font-bold text-black">{'dashboard'}</span> */}
                {/* <Navigate to="/dashboard/orders" /> */}
                {rightCode === RIGHTS_MAPPING.ADMIN && (
                    <Navigate to="/dashboard/cakes" />
                )}
                {rightCode === RIGHTS_MAPPING.CUSTOMER && (
                    <Navigate to="/dashboard/cakes" />
                )}

            </Typography>
        </>
    )
}
export default Dashboard;