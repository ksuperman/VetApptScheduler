import React, { useEffect, useState } from 'react';
import ResponsiveTable from '../ResponsiveTable';
import Form from '../Form';
import FormField from '../FormField';
import Typography from '../Typography';
import { makeAPIRequest } from '../../utils/api';
import { formatAppointmentDateTimeToDisplayString } from '../../utils/date';
import Button from '../Button';
import { APPOINTMENT_STATUS_MAP, ROLE_TYPE } from '../../constants';

const ERROR_MESSAGES_MAP = {
    NO_APPOINTMENTS_FOUND: 'Seems like you haven\'t booked any appointments with us',
};

const cancelAppointment = (appointmentId, userId) => {
    console.log('cancelAppointment======>', appointmentId);
};

const AppointmentList = ({ user }) => {
    // Page State
    const [appointments, setAppointments] = useState([]);
    const [errors, setErrors] = useState([]);

    // Columns of the Table.
    const columnsNames = ['Doctor', 'Appointment Schedule', 'Pet Name', ' Appointment Status', 'Total Cost', 'Cancel'];
    if (user.role === ROLE_TYPE.DOCTOR) {
        columnsNames.splice(1, 0, 'Pet Owner');
    }

    // Effect to fetch user's appointment.
    useEffect(() => {
        async function fetchUserAppointments() {
            try {
                const result = await makeAPIRequest({
                    url: `/api/users/${user.id}/appointments`,
                    method: 'GET',
                }) || {};
                // For 200 Result update the state back.
                if (result.status === 200 && result) {
                    const appointmentsFromAPI = result.data;
                    const formatterAppointmentData = appointmentsFromAPI.reduce((formattedAppointments, currentAppointmentRecord) => {
                        let formattedAppointmentRow = {
                            id: currentAppointmentRecord.id,
                            petName: currentAppointmentRecord.petname,
                            status: currentAppointmentRecord.status,
                            price: currentAppointmentRecord.total_price,
                            appointmentTime: formatAppointmentDateTimeToDisplayString(currentAppointmentRecord.start_time, currentAppointmentRecord.end_time),
                            cancellationReason: currentAppointmentRecord.cancellation_reason,
                            doctorName: `${currentAppointmentRecord.doclastname}, ${currentAppointmentRecord.docfirstname}`,
                            ownerName: `${currentAppointmentRecord.ownerfirstname}, ${currentAppointmentRecord.ownerfirstname}`,
                        };
                        formattedAppointmentRow = [
                            (user.role === ROLE_TYPE.DOCTOR) ? `${currentAppointmentRecord.ownerfirstname}, ${currentAppointmentRecord.ownerfirstname}` : `${currentAppointmentRecord.doclastname}, ${currentAppointmentRecord.docfirstname}`,
                            formatAppointmentDateTimeToDisplayString(currentAppointmentRecord.start_time, currentAppointmentRecord.end_time),
                            currentAppointmentRecord.petname,
                            APPOINTMENT_STATUS_MAP[currentAppointmentRecord.status],
                            currentAppointmentRecord.total_price,
                            <Button key={currentAppointmentRecord.id} onClick={() => cancelAppointment(currentAppointmentRecord.id)}>Cancel</Button>,
                        ];
                        formattedAppointments.push(formattedAppointmentRow);
                        return formattedAppointments;
                    }, []);
                    setAppointments(appointmentsState => [...appointmentsState, ...formatterAppointmentData]);
                } else {
                    const apiError = new Error(result.status);
                    apiError.details = 'NO_APPOINTMENTS_FOUND';
                    throw apiError;
                }
            } catch (e) {
                console.error('Error', e);
                setErrors(e);
            }
        }
        fetchUserAppointments();
    }, [user.id]);

    const errorCode = errors && errors.details;

    return (
        errorCode ? (
            <Form>
                <FormField>
                    <Typography Element={'h2'} centerAlign={true} >{ERROR_MESSAGES_MAP[errorCode]}</Typography>
                </FormField>
            </Form>
        ) : (
            <ResponsiveTable columns={columnsNames} data={appointments} />
        )
    );
};

export default AppointmentList;
