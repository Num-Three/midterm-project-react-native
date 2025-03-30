import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Modal, ScrollView, useWindowDimensions, ActivityIndicator } from 'react-native';
import { useGlobalContext } from '../context/GlobalContext';
import { Props } from '../navigation/props';
import Header from '../components/Header';
import RenderHTML from 'react-native-render-html';

/* FUNCTIONS */
import { formatCurrency } from '../components/convertToCurrency';
import { toTitleCase } from '../components/toTitleCase';
import { getGlobalStyles } from '../styles/globalStyles';

const JobTags = ({ tags, isDarkMode }) => {
    const [showAll, setShowAll] = useState(false);
    const displayedTags = showAll ? tags : tags.slice(0, 5);
    const styles = getGlobalStyles(isDarkMode);

    return (
        <View>
            <View style={styles.tagContainer}>
                 {displayedTags.map((tag, index) => (
                <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{toTitleCase(tag)}</Text>
                </View>
            ))}
            </View>
            {tags.length > 5 && (
                <TouchableOpacity onPress={() => setShowAll(!showAll)}>
                    <Text style={[styles.expandText]}>{showAll ? 'Show Less' : 'Show All Tags...'}</Text>
                </TouchableOpacity>
            )}
            
        </View>
    );
};

const JobFinder: React.FC<Props> = ({ navigation }) => {
    const { jobs, savedJobs, appliedJobs, saveJob, applyJob, isDarkMode } = useGlobalContext();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedJob, setSelectedJob] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const styles = getGlobalStyles(isDarkMode);
    const [isExpanded, setIsExpanded] = useState(false);
    const { width } = useWindowDimensions();

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const openModal = (job) => {
        setSelectedJob(job);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedJob(null);
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate('SavedJobs')} style={styles.savedJobsButton}>
                    <Text style={styles.savedJobsText}>Saved Jobs</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation, isDarkMode]);

    if (!jobs || jobs.length === 0) { return <ActivityIndicator/> }

    return (
        <View style={styles.container}>
            <Header />
            <TextInput
                placeholder="Search jobs..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.input}
            />
            <FlatList
                data={filteredJobs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => openModal(item)}>
                        <View style={styles.jobItem}>
                            <Text style={styles.jobTitle}>{item.title}</Text>
                            <Text style={styles.text}>{item.companyName}</Text>
                            <Text style={styles.salaryText}>
                                {item.minSalary === 0 ? "Flexible Salary" : `${formatCurrency(item.minSalary)} - ${formatCurrency(item.maxSalary)}`}
                            </Text>

                            {/* Tags Section */}
                            {item.tags && item.tags.length > 0 && (
                                <JobTags tags={item.tags} isDarkMode={isDarkMode} />
                            )}
                        </View>
                        
                    </TouchableOpacity>

                )}
            />

            {/* Modal for Job Details */}
            <Modal visible={modalVisible} transparent={true} animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        {selectedJob && (
                            <>
                                <Text style={styles.modalTitle}>{selectedJob.title}</Text>
                                <Text style={styles.text}>{selectedJob.companyName}</Text>
                                <Text style={styles.salaryText}>{selectedJob.minSalary === 0 ? "Flexible Salary" : `${formatCurrency(selectedJob.minSalary)} - ${formatCurrency(selectedJob.maxSalary)}`}</Text>
                                <ScrollView
                                    style={[styles.descriptionBox, isExpanded ? styles.expanded : styles.collapsed]}
                                    nestedScrollEnabled={true}
                                >
                                    <RenderHTML contentWidth={width} source={{ html: selectedJob.description }} />
                                </ScrollView>

                                {/* Expand / Collapse Button */}
                                <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                                    <Text style={styles.expandText}>{isExpanded ? "Show Less" : "Read More"}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => saveJob(selectedJob)}>
                                    <Text style={[styles.button, styles.saveButton, styles.saveButtonText]}>{savedJobs.some(job => job.id === selectedJob.id) ? 'Saved' : 'Save Job'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('ApplicationForm', { job: selectedJob })}>
                                    <Text style={styles.button}>{appliedJobs.some(job => job.id === selectedJob.id) ? 'Applied' : 'Apply Job'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={closeModal}>
                                    <Text style={[styles.button, styles.closeButton, styles.closeButtonText]}>Close</Text>
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