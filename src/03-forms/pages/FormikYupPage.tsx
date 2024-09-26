import { useFormik } from 'formik';
import * as Yup from 'yup';

import '../styles/styles.css';

export const FormikYupPage = () => {
    const { handleSubmit, errors, touched, getFieldProps } = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        onSubmit: values => {
            console.log(values);
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, 'Max 15 chars')
                .required('Requerido'),
            lastName: Yup.string()
                .max(15, 'Max 15 chars')
                .required('Requerido'),
            email: Yup.string()
                .email('Email invalido')
                .required('Requerido'),
        })
    });

    return (
        <div>
            <h1>Formik Yup Tutorial</h1>

            <form onSubmit={handleSubmit} noValidate>
                <label htmlFor='firstName'>First Name</label>
                <input type='text' { ...getFieldProps('firstName') } />
                {touched.firstName && errors.firstName && <span> {errors.firstName} </span>}
                <br />

                <label htmlFor='firstName'>Last Name</label>
                <input type='text' { ...getFieldProps('lastName') } />
                {touched.lastName && errors.lastName && <span> {errors.lastName} </span>}
                <br />

                <label htmlFor='firstName'>Email</label>
                <input type='email' { ...getFieldProps('email') } />
                {touched.email && errors.email && <span> {errors.email} </span>}
                <br />

                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
