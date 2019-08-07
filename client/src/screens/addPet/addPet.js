import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Layout from '../../components/PageLayout';
import { logoutUser } from '../../utils/user';
import ColumnLayout from '../../components/ColumnLayout';
import appContext, { APP_CONTEXT_PROP_NAME } from '../../components/ApplicationContext/appContextDecorator';
import FormField from '../../components/FormField';
import Typography from '../../components/Typography';
import Input from '../../components/InputField';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import Form from '../../components/Form';
import { makeAPIRequest } from '../../utils/api';

const ERROR_MESSAGES_MAP = {};

const AddPetScreen = ({ history, [APP_CONTEXT_PROP_NAME]: { dispatch, user = {} } }) => {
    // User State
    const [petName, setPetName] = useState('');

    // Screen State
    const [error, setError] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [petCreated, setPetCreated] = useState(false);

    // Buttons to the Shown in the Header.
    const headerButtons = [
        {
            children: 'Make Appointment',
            onClick: () => {
                history.push('/makeappointment');
            },
        },
        {
            children: 'Dashboard',
            onClick: () => {
                history.push('/dashboard');
            },
        },
        {
            children: `Logout ${user.username}`,
            onClick: async () => {
                const result = await logoutUser();
                if (result.status === 200) {
                    dispatch({ type: 'LOGOUT_USER' });
                    history.push('/');
                }
            },
        },
    ];

    // Submit Handler for the Form.
    const onSubmit = async (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (petCreated) {
            return;
        }
        setSubmitted(true);
        try {
            const result = await makeAPIRequest({
                url: '/api/addpet',
                data: {
                    petName,
                    petOwnerId: user.id,
                },
            });
            if (result.status === 201) {
                setPetCreated(true);
            } else {
                setError(result.data);
            }
        } catch (e) {
            setError(e.details);
        } finally {
            setSubmitted(false);
        }
    };

    const setStateValue = setStateFunction => (event) => {
        setStateFunction(event.target.value);
    };

    const petRegistrationForm = (
        <>
            <FormField>
                <Typography Element={'h2'} centerAlign={true} >Register your pet with the clinic</Typography>
            </FormField>
            <FormField>
                <Input
                    type={'text'}
                    value={petName}
                    name={'petName'}
                    id={'petName'}
                    label={'Pet\'s Name'}
                    onChange={setStateValue(setPetName)}/>
            </FormField>
            <FormField centerAlignContent={true}>
                <Button type="submit" disabled={submitted}>{submitted ? <Spinner/> : 'Register Pet'}</Button>
            </FormField>
            {
                error && error.errorCode && (
                    <FormField>
                        <Typography Element={'h5'} centerAlign={true} >Pet registration failed due to {ERROR_MESSAGES_MAP[error.errorCode]}</Typography>
                    </FormField>
                )
            }
        </>
    );

    const petRegistrationSuccessForm = (
        <FormField>
            <Typography Element={'h2'} centerAlign={true} >Pet Registered Successfully</Typography>
        </FormField>
    );

    return (
        <Layout Header={<Header buttons={headerButtons}/>} Footer={ <Footer />}>
            <ColumnLayout>
                <Form onSubmit={onSubmit}>
                    {
                        petCreated
                            ? petRegistrationSuccessForm
                            : petRegistrationForm
                    }
                </Form>
            </ColumnLayout>
        </Layout>
    );
};

export default appContext(AddPetScreen);
