import { Formik, Form, FormikHelpers, FormikValues } from 'formik';
import formJson from '../data/custom-form.json';
import { MySelect, MyTextInput } from '../components';
import * as Yup from 'yup';

const initialValues: { [key: string]: any } = {};
const requiredFields: { [key: string]: any } = {};

for (const input of formJson) {
    initialValues[input.name] = input.value;

    if (!input.validations) continue;

    let schema = Yup.string();

    for (const rule of input.validations) {
        if (rule.type === 'required') {
            schema = schema.required('Required');
        }        
        if (rule.type === 'minLength') {
            schema = schema.min((rule as any).value || 2, `Min de ${(rule as any).value} caracteres`);
        }
        if (rule.type === 'email') {
            schema = schema.email('Email format');
        }

    }

    requiredFields[input.name] = schema;
}

const validationschema = Yup.object({ ...requiredFields });

export const DynamicForm = () => {
    return (
        <div>
            <h1>Dynamic Form</h1>

            <Formik
                initialValues={initialValues}
                validationSchema={validationschema}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {(formik) => (
                    <Form noValidate>
                        {formJson.map(({ type, name, placeholder, label, options }) => {
                            if (type === 'input' || type === 'password' || type === 'email') {
                                return <MyTextInput
                                    key={name}
                                    type={type as any}
                                    label={label}
                                    name={name}
                                    placeholder={placeholder}
                                />
                            } else if (type === 'select') {
                                return (
                                    <MySelect
                                        key={name}
                                        label={label}
                                        name={name}>
                                        <option value="">Select an option</option>
                                        {options?.map((option) => (
                                            <option key={option.id} value={option.id}>{option.label}</option>
                                        ))}
                                    </MySelect>
                                )
                            }

                            throw new Error(`Type "${type}" not supported`);
                        })}
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
