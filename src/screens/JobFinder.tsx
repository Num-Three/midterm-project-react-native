import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, useColorScheme } from 'react-native';
import { useGlobalContext } from '../context/GlobalContext';
import { Props } from '../navigation/props';
import { formatCurrency } from '../components/convertToCurrency';

const JobFinder: React.FC<Props> = ({ navigation }) => {
    const { jobs, saveJob, savedJobs } = useGlobalContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';
    const filteredJobs = searchQuery.trim() === '' 
        ? jobs 
        : jobs.filter(job =>
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.companyName.toLowerCase().includes(searchQuery.toLowerCase())
        );

    const openModal = (job) => {
        setSelectedJob(job);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedJob(null);
    };

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: isDarkMode ? '#121212' : '#ffffff' }}>
            <TouchableOpacity
            onPress = {() => navigation.navigate('SavedJobs')} 
                
            >
                <Text>Go to Saved Jobs</Text>
            </TouchableOpacity>
            <TextInput
                placeholder="Search jobs..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={{ padding: 10, borderWidth: 1, marginBottom: 10, backgroundColor: '#fff' }}
            />
            <FlatList
                data={filteredJobs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => openModal(item)}>
                        <View style={{ padding: 10, borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: isDarkMode ? '#fff' : '#000' }}>{item.title}</Text>
                            <Text>Company: {item.companyName}</Text>
                            <Text>Salary: {item.minSalary === 0 ? "Flexible Salary" : `${formatCurrency(item.minSalary)} - ${formatCurrency(item.maxSalary)}`}</Text>
                            </View>
                    </TouchableOpacity>
                )}
            />

            {/* Modal for Job Details */}
            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ width: '80%', padding: 20, backgroundColor: isDarkMode ? '#333' : '#fff', borderRadius: 10 }}>
                        {selectedJob && (
                            <>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', color: isDarkMode ? '#fff' : '#000' }}>{selectedJob.title}</Text>
                                <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>{selectedJob.companyName}</Text>
                                <Text style={{ marginBottom: 10, color: isDarkMode ? '#fff' : '#000' }}>Salary: {selectedJob.minSalary} - {selectedJob.maxSalary}</Text>
                                <TouchableOpacity onPress={() => saveJob(selectedJob)}>
                                    <Text style={{ color: 'blue', marginBottom: 10 }}>{savedJobs.some(job => job.id === selectedJob.id) ? 'Saved' : 'Save Job'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('ApplicationForm', { job: selectedJob })}>
                                    <Text style={{ color: 'green', marginBottom: 10 }}>Apply</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={closeModal}>
                                    <Text style={{ color: 'red' }}>Close</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default JobFinder;