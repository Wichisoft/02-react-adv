import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import '../styles/styles.css';

export const FormikComponentsPage = () => {
    return (
        <div>
            <h1>Formik Components</h1>

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
                        <label htmlFor='firstName'>First Name</label>
                        <Field name="firstName" type="text" />
                        <ErrorMessage name="firstName" component="span" />
                        <br />

                        <label htmlFor='lastName'>Last Name</label>
                        <Field name="lastName" type="text" />
                        <ErrorMessage name="lastName" component="span" />
                        <br />

                        <label htmlFor='email'>Email</label>
                        <Field name="email" type="text" />
                        <ErrorMessage name="email" component="span" />
                        <br />

                        <label htmlFor='jobType'>Job type</label>
                        <Field name="jobType" as="select">
                            <option value="">Pick one</option>
                            <option value="developer">Developer</option>
                            <option value="designer">Designer</option>
                            <option value="it-senior">IT sr</option>
                            <option value="it-jr">IT jr</option>
                        </Field>
                        <ErrorMessage name="jobType" component="span" />
                        <br />

                        <label htmlFor='terms'>
                            <Field name="terms" type="checkbox" />
                            Terms and conditions
                        </label>
                        <ErrorMessage name="terms" component="span" />
                        <br />

                        <button type='submit'>Submit</button>
                    </Form>
                )
                }
            </Formik>
        </div >
    )
}
