import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import '../styles/styles.css';
import { MyTextInput } from '../components';

export const RegisterFormikPage = () => {
    return (
        <div>
            <h1>Register Formik page</h1>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password1: '',
                    password2: '',
                }}
                onSubmit={(values) => {
                    console.log(values);
                }}
                validationSchema={
                    Yup.object({
                        name: Yup.string()
                            .min(2, "Min 3")
                            .max(15, "Max 15")
                            .required('Requerido'),
                        email: Yup.string()
                            .email("Formato erroneo")
                            .required('Requerido'),
                        password1: Yup.string()
                            .min(6, "Min 6")
                            .required('Requerido'),
                        password2: Yup.string()
                            .oneOf([Yup.ref('password1')], 'Passwords must match')
                            .required('Requerido'),
                    })
                }
            >
                {
                    ({ handleReset }) => (
                        <Form>
                            <MyTextInput label={'Nombre'} name={'name'} placeholder='John Doe' />
                            <MyTextInput label={'Email'} name={'email'} placeholder='john@example.com' />
                            <MyTextInput label={'Password'} name={'password1'} placeholder='*****' />
                            <MyTextInput label={'Repeat Password'} name={'password2'} placeholder='*****' />

                            <button type='submit'>Create</button>
                            <button type='button' onClick={handleReset}>Reset form</button>
                        </Form>

                    )
                }
            </Formik>

        </div>
    )
}
