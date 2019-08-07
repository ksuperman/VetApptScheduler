import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Layout from '../../components/PageLayout';
import Banner from '../../components/Banner';

const HomeScreen = ({ history }) => {
    const headerButtons = [
        {
            children: 'Login',
            onClick: function navigateToLoginPage() {
                history.push('/login');
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
            <Banner buttons={headerButtons.slice(1)}/>
        </Layout>
    );
};

export default HomeScreen;
