import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Layout from '../../components/PageLayout';
import { getUsersByFilter, logoutUser } from '../../utils/user';
import { getServicesPaginated } from '../../utils/services';
import ColumnLayout from '../../components/ColumnLayout';
import appContext, { APP_CONTEXT_PROP_NAME } from '../../components/ApplicationContext/appContextDecorator';
import { ROLE_TYPE } from '../../constants';
import FormField from '../../components/FormField';
import Typography from '../../components/Typography';
import Input from '../../components/InputField';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import Form from '../../components/Form';
import { makeAPIRequest } from '../../utils/api';
import { addMinutes, getDateFromSQLTimeStamp } from '../../utils/date';
import { getPetForPetOwner } from '../../utils/pet';
import Loading from '../../components/Loading';
import { getMultiSelectedValues } from '../../utils/dom';

import styles from './makeappointment.module.css';
import { isEmpty } from '../../utils/object';

const ERROR_MESSAGES_MAP = {
    PET_NOT_ADDED: 'Please register your pet before booking an appointment',
    SERVICES_NOT_FOUND: 'No Services are Currently Offered',
    DOCTORS_NOT_FOUND: 'No Doctors are are available for the selected timeslots.',
    APPOINTMENT_IN_PAST: 'Please select a Date in the future',
};

/**
 * Method to Calculate End Time based on the
 */
const calculateEndTimeByStartTimeObjAndDuration = (sqlDateObj, duration) => {
    const endTimeObject = addMinutes(sqlDateObj, duration);
    return `${endTimeObject.getUTCHours()}:${endTimeObject.getUTCMinutes()}`;
};

const MakeAppointmentScreen = ({ history, [APP_CONTEXT_PROP_NAME]: { dispatch, user = {} } }) => {
    // User State
    const [petId, setPetId] = useState('');
    const [veterinarianId, setVeterinarianId] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [duration, setDuration] = useState(0);
    const [notes, setNotes] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedServiceIds, setSelectedServiceIds] = useState([]);

    // Flag to check if request can be submitted
    const shouldEnableAppointmentBooking = (
        (petId >= 0)
        && appointmentDate
        && startTime
        && (duration >= 0)
        && (totalPrice >= 0)
        && !isEmpty(selectedServiceIds)
        && user.id
        && veterinarianId
    );

    // Server Info
    const [pets, setPets] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [doctorsOption, setDoctorsOptions] = useState([]);
    const [services, setServices] = useState([]);
    const [servicesOptions, setServicesOptions] = useState([]);

    // Screen State
    const [error, setError] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [appointmentCreated, setAppointmentCreated] = useState(false);

    // Loading States
    const [petLoading, setPetLoading] = useState(false);
    const [doctorLoading, setDoctorLoading] = useState(false);
    const [servicesLoading, setServicesLoading] = useState(false);

    // Flag to Determine if any of the Server fields are loading.
    const isLoading = petLoading || doctorLoading || servicesLoading;

    // Controls the Header Button to be shown on the UI.
    const headerButtons = [
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

    /**
     * Show Add Pet only for Pet owners.
     */
    if (user.role === ROLE_TYPE.PET_OWNER) {
        headerButtons.splice(0, 0, {
            children: 'Add Pet',
            onClick: () => {
                history.push('/addPet');
            },
        });
    }

    /**
     * @TODO Extract API logic to Higher Order Component
     */
    const onSubmit = async (event) => {
        event.stopPropagation();
        event.preventDefault();
        setSubmitted(true);
        try {
            const sqlDateObj = getDateFromSQLTimeStamp(appointmentDate, startTime);
            const endTime = calculateEndTimeByStartTimeObjAndDuration(sqlDateObj, duration);
            const result = await makeAPIRequest({
                url: `/api/users/${user.id}/appointments`,
                data: {
                    petId,
                    veterinarianId,
                    appointmentDate,
                    startTime,
                    endTime,
                    duration,
                    notes,
                    totalPrice,
                    selectedServiceIds,
                },
            });
            console.log('onSubmit, result', result);
            if (result.status === 201) {
                setAppointmentCreated(true);
                setError('');
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
        console.log('setStateValue ====> ', event.target.value);
        setStateFunction(event.target.value);
    };

    const updateSelectedServices = (event) => {
        if (event) {
            // Get all Selected Service IDs from the Select Element
            const selectedServicesIds = getMultiSelectedValues(event.currentTarget);
            // If there are Services Ids Selected
            if (!isEmpty(selectedServicesIds)) {
                console.log('selectedServicesId', selectedServicesIds);
                // Place holder for new total prices based on selection.
                let newTotalPrice = 0;
                // Place holder for new duration based on selection.
                let newDuration = 0;
                // For Even Service Id in the Selected Services ids
                // eslint-disable-next-line no-plusplus
                for (let i = 0, selectedServicesIdsLen = selectedServicesIds.length; i < selectedServicesIdsLen; i++) {
                    // Get the Corresponding Service Object.
                    const selectedService = services[selectedServicesIds[i] - 1];
                    // Increment the Total Price
                    newTotalPrice += parseFloat(selectedService.price);
                    // Increment the Duration
                    newDuration += parseInt(selectedService.duration, 10);
                }
                // Update the new total price to state
                setTotalPrice(newTotalPrice);
                // Update the new duration to state
                setDuration(newDuration);
                // Update the Selected Service ID's
                setSelectedServiceIds(selectedServicesIds);
            }
        }
    };

    /**
     * Effect For Loading Pet Information.
     */
    useEffect(() => {
        async function initializePetDataFetch() {
            setError('');
            setPetLoading(true);
            try {
                const getPetForPetOwnerResponse = await getPetForPetOwner(user.id) || {};
                const petList = getPetForPetOwnerResponse.data || [];
                if (petList.length > 0) {
                    // pets found process them and add to the select
                    const petSelectionOptions = petList.reduce((petSelectOptions, pet) => {
                        petSelectOptions.push({ name: pet.name, value: pet.id });
                        return petSelectOptions;
                    }, [{}]);
                    setPets(petSelectionOptions);
                } else {
                    throw new Error('PET_NOT_ADDED');
                }
            } catch (e) {
                setError({
                    errorCode: 'PET_NOT_ADDED',
                });
            } finally {
                setPetLoading(false);
            }
        }
        initializePetDataFetch();
    }, [user.id]);

    /**
     * Effect For Loading Services
     */
    useEffect(() => {
        async function initializeServicesData() {
            setError('');
            setServicesLoading(true);
            try {
                const getServicesPaginatedResponse = await getServicesPaginated() || {};
                const serviceList = getServicesPaginatedResponse.data || [];
                if (serviceList.length > 0) {
                    // pets found process them and add to the select
                    const servicesSelectionOptions = serviceList.reduce((servicesSelectOptions, service) => {
                        servicesSelectOptions.push({ name: `${service.name} takes ${service.duration}mins for $${service.price}`, value: service.id });
                        return servicesSelectOptions;
                    }, []);
                    setServicesOptions(servicesSelectionOptions);
                    setServices(serviceList);
                } else {
                    throw new Error('SERVICES_NOT_FOUND');
                }
            } catch (e) {
                setError({
                    errorCode: 'SERVICES_NOT_FOUND',
                });
            } finally {
                setServicesLoading(false);
            }
        }
        initializeServicesData();
    }, []);

    /**
     * Effect For Loading Users
     */
    useEffect(() => {
        // c
        async function initializeViewData() {
            setError('');
            setDoctorLoading(true);
            try {
                const sqlDateObj = getDateFromSQLTimeStamp(appointmentDate, startTime);
                console.log('sqlDateObj', sqlDateObj.toString());
                const endTime = calculateEndTimeByStartTimeObjAndDuration(sqlDateObj, duration);
                const getUsersByFilterResponse = await getUsersByFilter({
                    role: ROLE_TYPE.DOCTOR,
                    appointmentDate,
                    startTime,
                    endTime,
                    checkAppointment: true,
                }) || {};
                const doctorsList = getUsersByFilterResponse.data;
                if (doctorsList.length > 0) {
                    // pets found process them and add to the select
                    const doctorsListOptions = doctorsList.reduce((doctorListOptions, doctor) => {
                        doctorListOptions.push({ name: `Dr. ${doctor.last_name}, ${doctor.first_name}`, value: doctor.id });
                        return doctorListOptions;
                    }, [{}]);
                    setDoctorsOptions(doctorsListOptions);
                    setDoctors(doctorsList);
                } else {
                    throw new Error('DOCTORS_NOT_FOUND');
                }
            } catch (e) {
                setDoctorsOptions([]);
                setDoctors([]);
                setError({
                    errorCode: e.message,
                });
            } finally {
                setDoctorLoading(false);
            }
        }
        // Get the Doctors Information only if
        if (appointmentDate && startTime && duration) {
            initializeViewData();
        }
    }, [appointmentDate, startTime, duration]);

    const currentDate = new Date();

    const currentDateString = `${currentDate.getUTCFullYear()}-${currentDate.getUTCMonth()}-${currentDate.getUTCDate()}`;

    const appointmentBookingForm = (
        <>
            <FormField>
                <Typography Element={'h2'} centerAlign={true}>Book an appointment for your pet</Typography>
            </FormField>
            <FormField>
                <FormField>
                    <Typography Element={'h3'}>Who is this appointment for ?</Typography>
                </FormField>
                <Select
                    options={pets}
                    onChange={setStateValue(setPetId)}
                />
            </FormField>
            <FormField>
                <Typography Element={'h3'}>When do you want to visit ?</Typography>
            </FormField>
            <FormField>
                <Input
                    type={'date'}
                    min={currentDateString}
                    value={appointmentDate}
                    name={'appointmentDate'}
                    id={'appointmentDate'}
                    onChange={setStateValue(setAppointmentDate)}/>
            </FormField>
            <FormField>
                <Input
                    id="appt-time"
                    type="time"
                    name="appt-time"
                    required
                    pattern="[0-9]{2}:[0-9]{2}"
                    onChange={setStateValue(setStartTime)}/>
            </FormField>
            <FormField>
                <Typography Element={'h3'}>What services do you want ?</Typography>
            </FormField>
            <FormField>
                <Select
                    multiple={true}
                    options={servicesOptions}
                    onChange={updateSelectedServices}
                />
            </FormField>
            {
                (duration > 0) && (totalPrice > 0) && (
                    <FormField>
                        <Typography Element={'h5'}>You&apos;ll have to spend about {duration} mins during your visit and it will cost you ${totalPrice}.</Typography>
                    </FormField>
                )
            }
            {
                !isEmpty(doctorsOption) && (
                    <>
                        <FormField>
                            <FormField>
                                <Typography Element={'h3'}>Who do you want to consult with?</Typography>
                            </FormField>
                            <Select
                                options={doctorsOption}
                                onChange={setStateValue(setVeterinarianId)}
                            />
                        </FormField>
                        <FormField>
                            <Input
                                type={'notes'}
                                value={notes}
                                label={'Any notes for the doc ?'}
                                name={'notes'}
                                id={'notes'}
                                onChange={setStateValue(setNotes)}/>
                        </FormField>
                    </>
                )
            }
            <FormField centerAlignContent={true}>
                <Button type="submit" disabled={!shouldEnableAppointmentBooking || submitted}>{submitted ? <Spinner/> : 'Book Appointment'}</Button>
            </FormField>
            {
                error && error.errorCode && (
                    <FormField>
                        <Typography Element={'h5'} centerAlign={true} >{ERROR_MESSAGES_MAP[error.errorCode]}</Typography>
                    </FormField>
                )
            }
        </>
    );

    return (
        <Layout Header={<Header buttons={headerButtons}/>} Footer={ <Footer />}>
            <ColumnLayout>
                <Form onSubmit={onSubmit}>
                    { isLoading && <Loading className={styles.MakeAppointment__Loading}/> }
                    {
                        /* if Appointment is not created show appointmentBookingForm */
                        !appointmentCreated && appointmentBookingForm
                    }
                    {
                        /* if Appointment is not created show appointmentBookingForm */
                        appointmentCreated && (
                            <FormField>
                                <Typography Element={'h2'} centerAlign={true} >Appointment booked, we are looking forward for your visit on {appointmentDate} at {startTime}. Please make sure you have your schedule free for atleast {duration} mins.</Typography>
                            </FormField>
                        )
                    }
                </Form>
            </ColumnLayout>
        </Layout>
    );
};

export default appContext(MakeAppointmentScreen);
