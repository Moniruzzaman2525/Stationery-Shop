/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, message, Row, Typography } from "antd";
import SPForm from "../components/form/SPForm";
import SPInput from "../components/form/SPInput";
import { FieldValues } from "react-hook-form";
import { formStyle, inputStyle } from "../styles/formStyles";
import { useRegistrationMutation } from "../redux/feathers/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";
import { setUser, TUser } from "../redux/feathers/auth/authSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../schema/login.schema";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const { Title, Text } = Typography;

const Register = () => {
    const [registration] = useRegistrationMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const onSubmit = async (data: FieldValues) => {
        const hide = message.loading("Registering...", 0);

        try {
            const res = await registration(data).unwrap();
            const user = verifyToken(res.data.token) as TUser;
            dispatch(
                setUser({
                    user: user,
                    token: res.data.token,
                })
            );
            const from = location.state?.from?.pathname || "/";
            navigate(from);
            hide();
            message.success("Registration successful!", 2);
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
                resolver={zodResolver(registrationSchema)}
                onSubmit={onSubmit}
                style={formStyle}
            >
                <Title
                    level={3}
                    style={{ textAlign: "center", marginBottom: "40px" }}
                >
                    Register
                </Title>
                <SPInput
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    style={inputStyle}
                />
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
                    suffix={
                        passwordVisible ? (
                            <EyeTwoTone onClick={() => setPasswordVisible(false)} />
                        ) : (
                            <EyeInvisibleOutlined onClick={() => setPasswordVisible(true)} />
                        )
                    }
                    style={inputStyle}
                />
                <SPInput
                    type={confirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    suffix={
                        confirmPasswordVisible ? (
                            <EyeTwoTone
                                onClick={() => setConfirmPasswordVisible(false)}
                            />
                        ) : (
                            <EyeInvisibleOutlined
                                onClick={() => setConfirmPasswordVisible(true)}
                            />
                        )
                    }
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
                        marginBottom: "20px",
                    }}
                >
                    Register
                </Button>
                <div style={{ textAlign: "center" }}>
                    <Text type="secondary">
                        Have an account?{" "}
                        <Link
                            to="/login"
                            style={{ color: "#001845", fontWeight: "bold" }}
                        >
                            Login
                        </Link>
                    </Text>
                </div>
            </SPForm>
        </Row>
    );
};

export default Register;
