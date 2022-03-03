import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import '../styles/styles.css';

export const RegisterFormikPage = () => {


    return (
        <div>
            <h1>Register Formik Page</h1>      

            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password1: '',
                    password2: ''
                }}
                onSubmit={ (values) => {
                    console.log( values );
                }}
                validationSchema={Yup.object({
                    name: Yup.string()
                                .max(15, 'El nombre no puede tener más de 15 caracteres')
                                .min(2, 'El nombre debe contener al menos 2 caracteres')
                                .required('El nombre es necesario'),
                    email: Yup.string()
                                .email('El correo debe tener un formato válido')
                                .required('El correo es necesario'),
                    password1: Yup.string()
                                .min(6, 'La contraseña debe tener un mínimo de 6 caracteres')
                                .required('La contraseña es necesaria'),
                    password2: Yup.string()
                                .oneOf([Yup.ref('password1')], 'Las contraseñas deben de ser iguales')
                                .required('Requerido')
                })}
            >
                {({ handleReset }) => (
                        <Form>
                            <label htmlFor="name">Name</label>
                            <Field name="name" type="text" placeholder="Ingrese su nombre" />
                            <ErrorMessage name="name" component="span" />

                            <label htmlFor="email">Email</label>
                            <Field name="email" type="email" placeholder="Ingrese su correo" />
                            <ErrorMessage name="email" component="span" />

                            <label htmlFor="password1">Password</label>
                            <Field name="password1" type="password" placeholder="Ingrese su contraseña" />
                            <ErrorMessage name="password1" component="span" />

                            <label htmlFor="password2">Confirm password</label>
                            <Field name="password2" type="password" placeholder="Confirme su contraseña" />
                            <ErrorMessage name="password2" component="span" />

                            <button type="submit">Create</button>

                            <button onClick={ handleReset } type="reset">Reset</button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    );
}
