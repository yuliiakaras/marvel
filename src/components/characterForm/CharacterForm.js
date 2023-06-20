import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import {Link} from 'react-router-dom';
import * as Yup from 'yup';

import useMarvelService from '../../services/MarvelService';

import './CharacterForm.css';

const CharacterForm = () => {
    const { getCharacterByName } = useMarvelService();
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [character, setCharacter] = useState({ name: '', id: '' });

    return (
        <Formik
            initialValues={{
                name: ''
            }}
            validationSchema={
                Yup.object({
                    name: Yup.string().required('This field is required!')
                })
            }
            onSubmit={(values, { resetForm }) => {
                getCharacterByName(values.name)
                    .then(res => {
                        console.log(res);
                        setCharacter(res);
                        setSubmitSuccess(true);
                        resetForm();
                    })
                    .catch(err => {
                        console.log("err");
                        setSubmitSuccess(false);
                    });
            }}
        >
            {({ errors, touched }) => (
                <Form className='characterForm'>
                    <label className='characterLabel' htmlFor="name">Or find a character by name:</label>
                    <div className="characterForm__wrapper">
                        <Field
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter name"
                            className="characterField"
                        />
                        <button className="button button__main" type="submit">Find</button>
                    </div>
                    <ErrorMessage name="name" component="div" className='characterForm__error' />
                    {submitSuccess ? (
                        <div className="characterForm__wrapper">
                            <div className='characterForm__success'>There is! Visit {character.name} page?</div>
                            <Link to={`/characters/${character.id}`}>
                                <button className="button button__secondary">to page</button>
                            </Link>
                        </div>
                    ) : (
                        touched.name && (
                            <div className='characterForm__error'>The character wasn't found. Check the name and try again</div>
                        )
                    )}
                </Form>
            )}
        </Formik>
    );
};

export default CharacterForm;
