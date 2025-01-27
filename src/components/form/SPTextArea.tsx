import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

const { TextArea } = Input;

type TTextareaProps = {
    name: string;
    label?: string;
    placeholder?: string;
    style?: React.CSSProperties;
    rows?: number;
};

const SPTextarea = ({ name, label, placeholder, style }: TTextareaProps) => {
    return (
        <div>
            <Controller
                name={name}
                render={({ field, fieldState: { error } }) => (
                    <Form.Item label={label}>
                        <TextArea
                            style={{ ...style, height: "100px", resize: "none" }} 
                            id={name}
                            placeholder={placeholder}
                            {...field}
                        />
                        <div>
                            {error ? <small>{error.message}</small> : <small>&nbsp;</small>}
                        </div>
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default SPTextarea;
