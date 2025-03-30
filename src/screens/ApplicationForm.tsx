import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useGlobalContext } from '../context/GlobalContext';
import { getGlobalStyles } from '../styles/globalStyles';
import { formatCurrency } from '../components/convertToCurrency';
import { Props } from '../navigation/props';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    contactNumber: Yup.string()
        .matches(/^\d+$/, 'Contact number must be numeric')
        .min(10, 'Must be at least 10 digits')
        .max(11, 'Must not be higher than 11 digits')
        .required('Contact number is required'),
    fullName: Yup.string().min(2, 'Too short').required('Full name is required'),
    reason: Yup.string().min(10, 'Must be at least 10 characters').required('Reason is required'),
});

const ApplicationFormScreen: React.FC<Props> = ({ route, navigation }) => {
    const { isDarkMode, applyJob } = useGlobalContext();
    const { job } = route.params; // Get job details from navigation props
    const styles = getGlobalStyles(isDarkMode);

    return (
        <View style={styles.container}>
            <Text style={styles.jobTitle}>Applying For: {job.title}</Text>
            <Text style={styles.title}>Company: {job.companyName}</Text>
            <Text style={styles.salaryText}>{job.minSalary === 0 ? "Flexible Salary" : `${formatCurrency(job.minSalary)} - ${formatCurrency(job.maxSalary)}`}</Text>
            <Formik
                initialValues={{ email: '', contactNumber: '', fullName: '', reason: '' }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm }) => {
                    Alert.alert('Success', 'Your application has been submitted!');
                    resetForm();
                    applyJob(job)
                    navigation.reset({index: 0, routes: [{ name: 'JobFinder' }]});
                }}
            >
                {({ handleChange, handleSubmit, values, errors }) => (
                    <View>
                        <Text style={styles.formLabel}>Full Name</Text>
                        <TextInput placeholder="Full Name" placeholderTextColor={isDarkMode ? '#ddd' : '#000'} onChangeText={handleChange('fullName')} value={values.fullName} style={styles.formInput} />
                        {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

                        <Text style={styles.formLabel}>Email</Text>
                        <TextInput placeholder="Email" placeholderTextColor={isDarkMode ? '#ddd' : '#000'} onChangeText={handleChange('email')} value={values.email} style={styles.formInput} />
                        {errors.email && <Text style={styles.error}>{errors.email}</Text>}

                        <Text style={styles.formLabel}>Contact Number</Text>
                        <TextInput placeholder="Contact Number" placeholderTextColor={isDarkMode ? '#ddd' : '#000'} onChangeText={handleChange('contactNumber')} value={values.contactNumber} style={styles.formInput} />
                        {errors.contactNumber && <Text style={styles.error}>{errors.contactNumber}</Text>}

                        <Text style={styles.formLabel}>Reason for Application</Text>
                        <TextInput placeholder="Reason" placeholderTextColor={isDarkMode ? '#ddd' : '#000'} onChangeText={handleChange('reason')} value={values.reason} multiline style={[styles.formInput, { minHeight: 140 }]} />
                        {errors.reason && <Text style={styles.error}>{errors.reason}</Text>}

                        <TouchableOpacity style={styles.button}
                            onPress={() => {
                                if (Object.keys(errors).length > 0) {
                                    Alert.alert('Error', 'Please fill in all the required fields before submitting.');
                                } else {
                                    handleSubmit();
                                }
                            }}>
                            <Text style={styles.saveButtonText}>Submit Application Form</Text>
                        </TouchableOpacity>
                    </View>
                )
                }
            </Formik >
        </View >
    );
};

export default ApplicationFormScreen;
