/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, message, Row, Typography } from "antd";
import SPForm from "../components/form/SPForm";
import SPInput from "../components/form/SPInput";
import { FieldValues } from "react-hook-form";
import { formStyle, inputStyle } from "../styles/formStyles";
import { useLoginMutation } from "../redux/feathers/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/feathers/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";

const { Title } = Typography;


const Login = () => {

    const [login] = useLoginMutation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const location = useLocation();

    const onSubmit = async (data: FieldValues) => {
        const hide = message.loading("Logging in...", 0);
        try {
            const res = await login(data).unwrap();
            const user = verifyToken(res.data.token) as TUser;

            dispatch(
                setUser({
                    user: user,
                    token: res.data.token,
                })
            );

            const from =
                localStorage.getItem("redirectAfterLogin") || location.state?.from || "/";
            localStorage.removeItem("redirectAfterLogin");
            navigate(from);
            hide();
            message.success("Login successfully!", 2);
        } catch (err) {
            hide();
            message.error("Failed to login!", 2);
        }
    };

    return (
        <Row justify="center" align="middle" style={{ height: "100vh", backgroundColor: "#f9f6f4" }}>
            <SPForm
                onSubmit={onSubmit}
                style={formStyle}
            >
                <Title level={3} style={{ textAlign: "center", marginBottom: "40px" }}>
                    Login In
                </Title>
                <SPInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    style={inputStyle}
                />
                <SPInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    style={inputStyle}
                />
                <Button
                    htmlType="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        backgroundColor: "#001845",
                        color: "#fff",
                        borderRadius: "5px",
                        border: "none",
                    }}
                >
                    Login In
                </Button>
            </SPForm>
        </Row>
    );
};

export default Login;