import { Form } from "antd";
import { ReactNode } from "react";
import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";

type TFormConfig = {
    defaultValues?: Record<string, any>,
    resolver?: any
}

type TFormProps = {
    onSubmit: SubmitHandler<FieldValues>,
    children: ReactNode
} & TFormConfig

const SPForm = ({ onSubmit, children, defaultValues, resolver }: TFormProps) => {

    const formConfig: TFormConfig = {}
    if (defaultValues) {
        formConfig['defaultValues'] = defaultValues
    }

    if (resolver) {
        formConfig['resolver'] = resolver
    }

    const methods = useForm(formConfig)
    const onsubmit: SubmitHandler<FieldValues> = (data) => {
        onSubmit(data)
        methods.reset()
    }

    return <FormProvider {...methods}>
        <Form layout='vertical' onFinish={methods.handleSubmit(onsubmit)}>{children}</Form>
    </FormProvider>
};

export default SPForm;