import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
    type: string;
    name: string;
    label?: string;
    placeholder?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
}

const SPInput = ({ type, name, label, placeholder, style, disabled }: TInputProps) => {
    return (
        <div>
            <Controller
                name={name} render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label}>
                        <Input type={type} style={style} id={name} placeholder={placeholder} {...field} size="large" disabled={disabled} />
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