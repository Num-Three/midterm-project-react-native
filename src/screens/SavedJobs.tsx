import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useGlobalContext } from '../context/GlobalContext';
import { Props } from '../navigation/props';

import { formatCurrency } from '../components/convertToCurrency';
import { getGlobalStyles } from '../styles/globalStyles';

const SavedJobs: React.FC<Props> = ({ navigation }) => {
    const { savedJobs, isDarkMode, removeJob, appliedJobs } = useGlobalContext();
    const styles = getGlobalStyles(isDarkMode);
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Saved Jobs</Text>
            <Text style={styles.text}>{savedJobs.length === 0 ? "No jobs saved." : "Current number of saved jobs:" + savedJobs.length}</Text>
            <FlatList
                data={savedJobs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.jobItem}>
                        <Text style={styles.jobTitle}>{item.title}</Text>
                        <Text style={styles.text}>{item.companyName}</Text>
                        <Text style={styles.salaryText}>
                            {item.minSalary === 0 ? "Flexible Salary" : `${formatCurrency(item.minSalary)} - ${formatCurrency(item.maxSalary)}`}
                        </Text>
                        <TouchableOpacity onPress={() => {
                            if (appliedJobs.some(job => job.id === item.id)) {
                                Alert.alert('You have already sent an application form to this position!')
                            } else {
                                navigation.navigate('ApplicationForm', { job: item });
                            }
                        }
                        }>
                            <Text style={[styles.button,
                            appliedJobs.some(job => job.id === item.id)
                                ? styles.applied
                                : styles.saveButtonText
                            ]}>{appliedJobs.some(job => job.id === item.id) ? 'Sent Application' : 'Apply Job'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => removeJob(item.id)}>
                            <Text style={[styles.button, styles.closeButton, styles.closeButtonText]}>Remove Job</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

export default SavedJobs;