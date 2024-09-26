import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import '../styles/styles.css';

import { MyCheckbox, MySelect, MyTextInput} from '../components';

export const FormikAbstractation = () => {
    return (
        <div>
            <h1>Formik Abstractation</h1>

            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    terms: false,
                    jobType: '',
                }}
                onSubmit={(values) => {
                    console.log(values);
                }}
                validationSchema={
                    Yup.object({
                        firstName: Yup.string()
                            .max(15, 'Max 15 chars')
                            .required('Requerido'),
                        lastName: Yup.string()
                            .max(15, 'Max 15 chars')
                            .required('Requerido'),
                        email: Yup.string()
                            .email('Email invalido')
                            .required('Requerido'),
                        terms: Yup.boolean()
                            .oneOf([true], 'Debe aceptar las condiciones'),
                        jobType: Yup.string()
                            .required('Requerido')
                            .notOneOf(['it-jr'], 'Esta opción no es permitida')
                    })
                }
            >
                {(formik) => (
                    <Form>
                        <MyTextInput
                            label="First Name"
                            name="firstName"
                            placeholder='John'
                        />
                        <br />

                        <MyTextInput
                            label="Last Name"
                            name="lastName"
                            placeholder='Doe'
                        />
                        <br />

                        <MyTextInput
                            label="Email"
                            name="email"
                            placeholder='me@my.com'
                            type='email'
                        />
                        <br />

                        <MySelect name="jobType" label={'Job type'}>
                            <option value="">Pick one</option>
                            <option value="developer">Developer</option>
                            <option value="designer">Designer</option>
                            <option value="it-senior">IT sr</option>
                            <option value="it-jr">IT jr</option>
                        </MySelect>
                        <br />

                        <MyCheckbox label="Terms and conditions" name="terms" />
                        <br />

                        <button type='submit'>Submit</button>
                    </Form>
                )
                }
            </Formik>
        </div >
    )
}
