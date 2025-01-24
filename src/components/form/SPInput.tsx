import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
    type: string;
    name: string;
    label: string;
}

const SPInput = ({ type, name, label }: TInputProps) => {
    return (
        <div>
            <Controller
                name={name} render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label}>
                        <Input type={type} id={name} {...field} size="large" />
                        <div>
                            {
                                error ? (<small>{error.message}</small>) : (<small>&nbsp;</small>)
                            }
                        </div>
                    </Form.Item>
                )} />
        </div>
    );
};

export default SPInput;