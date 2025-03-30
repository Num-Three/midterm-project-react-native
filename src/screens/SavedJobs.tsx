import React from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, useColorScheme } from 'react-native';
import { useGlobalContext } from '../context/GlobalContext';
import { Props } from '../navigation/props';

const SavedJobs: React.FC<Props> = ({ navigation }) => {
    const { savedJobs, removeJob } = useGlobalContext();
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: isDarkMode ? '#121212' : '#ffffff' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: isDarkMode ? '#fff' : '#000' }}>Saved Jobs</Text>
            <FlatList
                data={savedJobs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={{ padding: 10, borderBottomWidth: 1 }}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: isDarkMode ? '#fff' : '#000' }}>{item.title}</Text>
                        <Text>{item.companyName}</Text>
                        <Text>Salary: {item.minSalary} - {item.maxSalary}</Text>
                        <TouchableOpacity onPress={() => removeJob(item.id)}>
                            <Text style={{ color: 'red' }}>Remove Job</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ApplicationForm', { job: item })}>
                            <Text style={{ color: 'green' }}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

export default SavedJobs;