/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, message, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import SPForm from "../components/form/SPForm";
import SPInput from "../components/form/SPInput";
import { FieldValues } from "react-hook-form";
import { formStyle, inputStyle } from "../styles/formStyles";
import { useLoginMutation } from "../redux/feathers/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/feathers/auth/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/login.schema";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const { Title, Text } = Typography;

const Login = () => {
    const [login] = useLoginMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation();
    const [passwordVisible, setPasswordVisible] = useState(false);

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
        } catch (err: any) {
            hide();
            const errorMessage =
                err?.data?.message || err?.message || "An unexpected error occurred.";
            message.error(errorMessage, 2);
        }
    };

    return (
        <Row
            justify="center"
            align="middle"
            style={{ height: "100vh", backgroundColor: "#f9f6f4" }}
        >
            <SPForm
                resolver={zodResolver(loginSchema)}
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
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    style={inputStyle}
                    suffix={
                        passwordVisible ? (
                            <EyeTwoTone onClick={() => setPasswordVisible(false)} />
                        ) : (
                            <EyeInvisibleOutlined onClick={() => setPasswordVisible(true)} />
                        )
                    }
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
                        marginBottom: "20px",
                    }}
                >
                    Login In
                </Button>
                <div style={{ textAlign: "center" }}>
                    <Text type="secondary">
                        Don't have an account?{" "}
                        <Link to="/register" style={{ color: "#001845", fontWeight: "bold" }}>
                            Register
                        </Link>
                    </Text>
                </div>
            </SPForm>
        </Row>
    );
};

export default Login;
