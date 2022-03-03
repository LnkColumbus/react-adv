import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { MySelect, MyTextInput } from '../components';

import formJSON from '../data/custom-form.json';

const initialValues: { [ key: string ]: any } = {};
const requiredFields: { [key: string ]: any } = {};

for (const input of formJSON) {
    initialValues[ input.name ] = input.value

    if ( !input.validations ) continue;

    let schema = Yup.string();

    for (const rule of input.validations) {
        if ( rule.type === 'required' ) {
            schema = schema.required('Este campo es obligatorio')
        }

        if ( rule.type === 'minLength' ) {
            schema = schema.min( (rule as any ).value || 2, `Mínimo de ${(rule as any ).value || 2} caracteres`)
        }

        if ( rule.type === 'email' ) {
            schema = schema.email('Debe ser un email válido');
        }
    }

    requiredFields[ input.name ] = schema;
    
}

const validationSchema = Yup.object({ ...requiredFields });

export const DynamicForm = () => {
    return (
        <div>
            <h1>Dynamic Form</h1>

            <Formik
                initialValues={ initialValues }
                validationSchema={ validationSchema }
                onSubmit={ (values) => {
                    console.log(values);
                }}
            >
                {(formik) => (
                    <Form>
                        {
                            formJSON.map(({ type, label, name, placeholder, options }) => {

                                if ( type === 'input' || type === 'password' || type === 'email') {
                                    return <MyTextInput
                                                key={ name }
                                                type={ (type as any) }
                                                name={ name }
                                                label={ label }
                                                placeholder={ placeholder }
                                            />
                                } else if ( type === 'select') {
                                    return (
                                        <MySelect
                                            key={ name }
                                            label={ label }
                                            name={ name }
                                        >
                                            <option value="">Select an option</option>
                                            {
                                                options?.map( ({ id, label }) => (
                                                    <option
                                                        key={ id }
                                                        value={ id }
                                                    >
                                                        { label }
                                                    </option>
                                                ))
                                            }
                                        </MySelect>
                                    )
                                }

                                throw new Error(`El type: ${ type }, no es soportado`);
                            })
                        }

                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
