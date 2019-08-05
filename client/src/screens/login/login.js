import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Layout from '../../components/PageLayout';

const LoginScreen = ({ history }) => {
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

    return (
        <Layout Header={<Header buttons={headerButtons}/>} Footer={ <Footer />}>
        test
        </Layout>
    );
};

export default LoginScreen;
