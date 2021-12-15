import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { MyCheckbox, MySelect, MyTextInput } from '../components';

import '../styles/styles.css';

export const FormikAbstraction = () => {

    return (
        <div>
            <h1>Formik Abstraction</h1>

            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    email: '',
                    terms: false,
                    jobType: ''
                }}
                onSubmit={ ( values ) => {
                    console.log( values );
                }}
                validationSchema={Yup.object({
                        firstName: Yup.string()
                                        .max(15, 'Debe de tener 15 carácteres o menos')
                                        .required('Requerido'),
                        lastName: Yup.string()
                                        .max(15, 'Debe de tener 15 carácteres o menos')
                                        .required('Requerido'),
                        email: Yup.string()
                                    .email('Debe ser un email válido')
                                    .required('Requerido'),
                        terms: Yup.boolean()
                                    .oneOf([true], 'Debe de aceptar las condiciones'),
                        jobType: Yup.string()
                                    .notOneOf(['it-junior'], 'Esta opción no es permitida')
                                    .required('Requerido')
                    })
                }
            >
                {(formik) => (
                        <Form>
                            <MyTextInput
                                label="First Name"
                                name="firstName"
                                placeholder="Primer nombre"
                                type="text"
                            />
                            
                            <MyTextInput
                                label="Last Name"
                                name="lastName"
                                placeholder="Primer nombre"
                                type="text"
                            />

                            <MyTextInput
                                label="Email"
                                name="email"
                                placeholder="Email"
                                type="email"
                            />

                            <MySelect label="Job Type" name="jobType">
                                <option value="">Pick something</option>
                                <option value="developer">Developer</option>
                                <option value="designer">Designer</option>
                                <option value="it-senior">IT Senior</option>
                                <option value="it-junior">IT Junior</option>
                            </MySelect>

                            <MyCheckbox label="Terms & Conditions" name="terms" />

                            <button type="submit">Submit</button>
                        </Form>
                    )
                }
                
            </Formik>
        </div>
    )
}
