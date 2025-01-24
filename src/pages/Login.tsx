import { Button, Row } from "antd";
import SPForm from "../components/form/SPForm";
import SPInput from "../components/form/SPInput";
import { FieldValues } from "react-hook-form";

const Login = () => {
    const onSubmit = (data: FieldValues) => {
        console.log(data)
    }
    return (
        <Row justify='center' align='middle' style={{ height: '100vh' }}>

            <SPForm onSubmit={onSubmit}>
                <SPInput type="text" name="id" label="Id" />
                <SPInput type="text" name="password" label="Password" />
                <Button>Login</Button>
            </SPForm>
        </Row>
    );
};

export default Login;