import React from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import { useGlobalContext } from '../context/GlobalContext';
import { Props } from '../navigation/props';

import { formatCurrency } from '../components/convertToCurrency';
import { toTitleCase } from '../components/toTitleCase';
import { getGlobalStyles } from '../styles/globalStyles';

const SavedJobs: React.FC<Props> = ({ navigation }) => {
    const { savedJobs, isDarkMode } = useGlobalContext();
    const styles = getGlobalStyles(isDarkMode);
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Saved Jobs</Text>
            <FlatList
                data={savedJobs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.jobItem}>
                        <Text style={styles.jobTitle}>{item.title}</Text>
                        <Text style={styles.text}>{item.companyName}</Text>
                        <Text style={styles.salaryText}>
                            Salary: {item.minSalary === 0 ? "Flexible Salary" : `${formatCurrency(item.minSalary)} - ${formatCurrency(item.maxSalary)}`}
                        </Text>
                        <TouchableOpacity onPress={() => removeJob(item.id)} style={styles.removeButton}>
                            <Text style={[styles.button, styles.closeButton, styles.closeButtonText]}>Remove Job</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ApplicationForm', { job: item })} style={styles.applyButton}>
                            <Text style={[styles.button, styles.saveButton, styles.saveButtonText]}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

export default SavedJobs;