import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/feathers/auth/authSlice";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const token = useAppSelector(useCurrentToken);
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace={true} />;
    }
    return children;
};
