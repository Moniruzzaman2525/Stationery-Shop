import { Button, Row, Typography } from "antd";
import SPForm from "../components/form/SPForm";
import SPInput from "../components/form/SPInput";
import { FieldValues } from "react-hook-form";
import { formStyle, inputStyle } from "../styles/formStyles";
import { useLoginMutation } from "../redux/feathers/auth/authApi";
import { verifyToken } from "../utils/verifyToken";
import { useAppDispatch } from "../redux/hooks";
import { setUser, TUser } from "../redux/feathers/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const { Title } = Typography;


const Login = () => {

    const [login] = useLoginMutation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const onSubmit = async (data: FieldValues) => {
        const tostId = toast.loading('Login in')
        try {
            const res = await login(data).unwrap()
            const user = verifyToken(res.data.token) as TUser
            dispatch(setUser({
                user: user,
                token: res.data.accessToken
            }))
            navigate(`/`)
            toast.success('Login successfully!', { id: tostId, duration: 2000 })
        } catch (err) {
            toast.error('Failed login!', { id: tostId, duration: 2000 })

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