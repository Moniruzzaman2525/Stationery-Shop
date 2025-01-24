import { Button, Row, Typography } from "antd";
import SPForm from "../components/form/SPForm";
import SPInput from "../components/form/SPInput";
import { FieldValues } from "react-hook-form";

const { Title, Text } = Typography;

const inputStyle = {
    marginBottom: "5px",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #d9d9d9",
}

const formStyle = {
    width: "400px",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
}

const Register = () => {
    const onSubmit = (data: FieldValues) => {
        console.log(data);
    };

    return (
        <Row justify="center" align="middle" style={{ height: "100vh", backgroundColor: "#f9f6f4" }}>
            <SPForm
                onSubmit={onSubmit}
                style={formStyle}
            >
                <Title level={3} style={{ textAlign: "center", marginBottom: "40px" }}>
                    Register
                </Title>
                <SPInput
                    type="text"
                    name="fullName"
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
                    type="password"
                    name="password"
                    placeholder="Password"
                    style={inputStyle}
                />
                <Text type="secondary" style={{ fontSize: "12px", display: "block", marginBottom: "15px" }}>
                    10 Characters: 1 Uppercase, 1 special character, 1 Numeric is a must.
                </Text>
                <SPInput
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
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
                    Register
                </Button>
            </SPForm>
        </Row>
    );
};

export default Register;
