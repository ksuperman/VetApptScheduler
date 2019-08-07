import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Layout from '../../components/PageLayout';
import Form from '../../components/Form';
import FormField from '../../components/FormField';
import Input from '../../components/InputField';
import ColumnLayout from '../../components/ColumnLayout';
import Typography from '../../components/Typography';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import { makeAPIRequest } from '../../utils/api';
import appContext, { APP_CONTEXT_PROP_NAME } from '../../components/ApplicationContext/appContextDecorator';

const ERROR_MESSAGES_MAP = {
    USER_OR_PASS_INCORRECT: 'Incorrect Username/Password.',
};

const LoginScreen = ({ history, [APP_CONTEXT_PROP_NAME]: { dispatch } }) => {
    // User State
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    // Screen State
    const [error, setError] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const headerButtons = [
        {
            children: 'Home',
            onClick: function navigateToHomePage() {
                history.push('/');
            },
        },
        {
            children: 'Register',
            onClick: function navigateToRegisterPage() {
                history.push('/register');
            },
        },
    ];

    const onSubmit = async (event) => {
        event.stopPropagation();
        event.preventDefault();
        setSubmitted(true);
        try {
            const result = await makeAPIRequest({
                url: '/api/login',
                data: {
                    username,
                    password,
                },
            });
            if (result.status === 200) {
                dispatch({ type: 'LOGIN_USER', user: result.data });
                history.push('/dashboard');
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

    return (
        <Layout Header={<Header buttons={headerButtons}/>} Footer={ <Footer />}>
            <ColumnLayout>
                <Form onSubmit={onSubmit}>
                    <FormField>
                        <Typography Element={'h2'} centerAlign={true} >Login to your account</Typography>
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
                    <FormField centerAlignContent={true}>
                        <Button type="submit" disabled={submitted}>{submitted ? <Spinner/> : 'Login'}</Button>
                    </FormField>
                    {
                        error && error.errorCode && (
                            <FormField>
                                <Typography Element={'h5'} centerAlign={true} >Account login failed due to {ERROR_MESSAGES_MAP[error.errorCode]}</Typography>
                            </FormField>
                        )
                    }
                </Form>
            </ColumnLayout>
        </Layout>
    );
};

export default appContext(LoginScreen);
