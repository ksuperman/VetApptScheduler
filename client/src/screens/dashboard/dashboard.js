import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Layout from '../../components/PageLayout';
import { logoutUser } from '../../utils/user';
import ColumnLayout from '../../components/ColumnLayout';
import appContext, { APP_CONTEXT_PROP_NAME } from '../../components/ApplicationContext/appContextDecorator';
import { ROLE_TYPE } from '../../constants';

const DashboardScreen = ({ history, [APP_CONTEXT_PROP_NAME]: { dispatch, user = {} } }) => {
    const headerButtons = [
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

    /**
     * Show Add Pet only for Pet owners.
     */
    if (user.role === ROLE_TYPE.PET_OWNER) {
        headerButtons.splice(0, 0, {
            children: 'Add Pet',
            onClick: () => {
                history.push('/addPet');
            },
        }, {
            children: 'Make Appointment',
            onClick: () => {
                history.push('/makeappointment');
            },
        });
    }

    return (
        <Layout Header={<Header buttons={headerButtons}/>} Footer={ <Footer />}>
            <ColumnLayout>

            </ColumnLayout>
        </Layout>
    );
};

export default appContext(DashboardScreen);
