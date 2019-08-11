import React, { useState } from 'react';
import { ROLE_TYPE, APPOINTMENT_STATUS_MAP } from '../../constants';
import { makeAPIRequest } from '../../utils/api';
import Button from '../Button';
import Input from '../InputField';
import FormField from '../FormField';
import Typography from '../Typography';


const CancelAppointment = ({ userId, appointment }) => {
    // Get Appointment details
    const {
        start_time: startTime, status, id, cancellation_reason: cancellationReason = '',
    } = appointment;

    const isActiveAppointment = status === 'A';

    // Check if appointment is in the past
    const isFutureAppointment = new Date(startTime).getTime() > new Date().getTime();

    const defaultCancellationReason = (isActiveAppointment && !isFutureAppointment) ? 'Appointment Complete' : 'Appointment Cancelled';

    // Component State
    const [cancelReason, setCancelReason] = useState(cancellationReason || defaultCancellationReason);
    const [showCancelReasonForm, setShowCancelReasonForm] = useState(false);
    const [isAppointmentCancellable, setIsAppointmentCancellable] = useState(isActiveAppointment && isFutureAppointment);

    const cancelAppointment = async () => {
        console.log('cancelAppointment===appointmentId===>', id);
        console.log('cancelAppointment===userId===>', userId);
        if (!showCancelReasonForm) {
            setShowCancelReasonForm(true);
        } else {
            const result = await makeAPIRequest({
                url: `/api/users/${userId}/appointments/${id}`,
                method: 'PATCH',
                data: {
                    cancelReason,
                },
            }) || {};
            if (result.status === 200) {
                setShowCancelReasonForm(false);
                setIsAppointmentCancellable(false);
            }
        }
    };

    const cancelForm = (
        <div>
            {
                showCancelReasonForm && (
                    <FormField>
                        <Typography Element='h4' text={'Reason'} />
                        <Input value={cancelReason} onChange={event => setCancelReason(event.target.value)}/>
                    </FormField>
                )
            }
            <Button onClick={() => cancelAppointment()}>Cancel</Button>
        </div>
    );

    return (
        <>
            {
                isAppointmentCancellable ? cancelForm : <Typography Element='h4' text={cancelReason} />
            }
        </>
    );
};

export default CancelAppointment;
