import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Layout from '../../components/PageLayout';
import ColumnLayout from '../../components/ColumnLayout';
import Form from '../../components/Form';
import FormField from '../../components/FormField';
import Input from '../../components/InputField';
import Typography from '../../components/Typography';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import { makeAPIRequest } from '../../utils/api';
import appContext from '../../components/ApplicationContext/appContextDecorator';
import {
    ROLE_TYPE,
} from '../../constants';


const signupHeading = {
    [ROLE_TYPE.DOCTOR]: 'Signup to be part of our wide doctor\'s network',
    [ROLE_TYPE.PET_OWNER]: 'Signup now to book an appointment',
};

const RegisterScreen = ({ history }) => {
    // User State
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    // Screen State
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [accountCreated, setAccountCreated] = useState(false);

    const headerButtons = [
        {
            children: 'Home',
            onClick: function navigateToHomePage() {
                history.push('/');
            },
        },
        {
            children: 'Login',
            onClick: function navigateToRegisterPage() {
                history.push('/login');
            },
        },
    ];

    const onSubmit = async (event) => {
        event.stopPropagation();
        event.preventDefault();
        // if Account is already created.
        if (accountCreated) {
            return;
        }
        setSubmitted(true);
        try {
            const result = await makeAPIRequest({
                url: '/api/createaccount',
                data: {
                    username,
                    password,
                    role,
                    firstName,
                    lastName,
                    phoneNumber,
                    email,
                },
            });
            console.log('result', result);
            if (result.status === 201) {
                setAccountCreated(true);
            } else {
                setError(result.body);
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

    const roleTypeSelectionForm = (
        <>
            <FormField>
                <Typography centerAlign={true} Element={'h2'}>Tell us about yourself</Typography>
            </FormField>
            <FormField>
                <Typography centerAlign={true} Element={'h3'}>Are you a here to signup as Doctor or Pet Owner ?</Typography>
            </FormField>
            <FormField>
                <ColumnLayout centerAlignContent={true}>
                    <Button type="button" onClick={() => setRole(ROLE_TYPE.DOCTOR)}>Doctor</Button>
                    <Button type="button" onClick={() => setRole(ROLE_TYPE.PET_OWNER)}>Pet Owner</Button>
                </ColumnLayout>
            </FormField>
        </>
    );

    const signupForm = (
        <>
            <FormField>
                <Typography centerAlign={true} Element={'h2'}>{signupHeading[role]}</Typography>
            </FormField>
            <FormField>
                <Input
                    type={'text'}
                    value={username}
                    name={'userName'}
                    id={'userName'}
                    label={'Username'}
                    onChange={setStateValue(setUserName)}/>
            </FormField>
            <FormField>
                <Input
                    type={'password'}
                    value={password}
                    name={'password'}
                    id={'password'}
                    label={'Password'}
                    onChange={setStateValue(setPassword)}/>
            </FormField>
            <FormField>
                <Input
                    type={'text'}
                    value={firstName}
                    name={'firstName'}
                    id={'firstName'}
                    label={'First Name'}
                    onChange={setStateValue(setFirstName)}/>
            </FormField>
            <FormField>
                <Input
                    type={'text'}
                    value={lastName}
                    name={'lastName'}
                    id={'lastName'}
                    label={'Last Name'}
                    onChange={setStateValue(setLastName)}/>
            </FormField>
            <FormField>
                <Input
                    type={'text'}
                    value={phoneNumber}
                    name={'phoneNumber'}
                    id={'phoneNumber'}
                    label={'Phone'}
                    onChange={setStateValue(setPhoneNumber)}/>
            </FormField>
            <FormField>
                <Input
                    type={'email'}
                    value={email}
                    name={'email'}
                    id={'email'}
                    label={'Email'}
                    onChange={setStateValue(setEmail)}/>
            </FormField>
            <FormField centerAlignContent={true}>
                <Button type="submit" disabled={submitted}>{submitted ? <Spinner/> : 'Create Account'}</Button>
            </FormField>
            {
                error && (
                    <FormField>
                        <Typography Element={'h5'} centerAlign={true} >Account registration failed due to {error.name}</Typography>
                    </FormField>
                )
            }
        </>
    );

    const accountCreatedSuccessView = (
        <>
            <FormField>
                <Typography Element={'h2'} centerAlign={true} >Account has been created successfully!</Typography>
            </FormField>
            <FormField>
                <Typography Element={'h3'} centerAlign={true} >You can now login to your account by using the username and password</Typography>
            </FormField>
        </>
    );

    return (
        <Layout Header={<Header buttons={headerButtons}/>} Footer={<Footer/>}>
            <ColumnLayout>
                {
                    <Form onSubmit={onSubmit}>
                        {
                            /* if Account is Created then show the account created success view */
                            accountCreated && accountCreatedSuccessView
                        }
                        {
                            /* if Account is NOT Created then show then show the account creation form */
                            !accountCreated && (!role ? roleTypeSelectionForm : signupForm)
                        }
                    </Form>
                }
            </ColumnLayout>
        </Layout>
    );
};

export default appContext(RegisterScreen);
