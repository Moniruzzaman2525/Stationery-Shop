import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectForm = {
    label: string;
    name: string;
    options: {
        value: string;
        label: string;
        disabled?: boolean
    }[] | undefined
    disabled?: boolean;
    mode?: 'multiple' | undefined
}

export const SPSelect = ({ label, name, options, disabled, mode }: TPHSelectForm) => {


    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Form.Item label={label}>
                    <Select
                        mode={mode}
                        {...field}
                        style={{ width: '100%' }}
                        options={options}
                        size="large"
                        disabled={disabled}
                    />
                    <div style={{ height: "20px", marginTop: "5px" }}>
                        {error ? (
                            <small style={{ color: "red" }}>{error.message}</small>
                        ) : (
                            <small>&nbsp;</small>
                        )}
                    </div>
                </Form.Item>
            )}
        ></Controller>
    )
}
