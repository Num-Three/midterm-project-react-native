import { StyleSheet } from 'react-native';

export const getGlobalStyles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: isDarkMode ? '#121212' : '#ffffff',
    },
    text: {
      fontSize: 16,
      color: isDarkMode ? '#ffffff' : '#000000',
    },
    salaryText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#31b931',
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDarkMode ? '#ffffff' : '#000000',
      marginBottom: 10,
    },
    input: {
      padding: 10,
      borderWidth: 1,
      backgroundColor: isDarkMode ? '#333' : '#fff',
      color: isDarkMode ? '#fff' : '#000',
      borderColor: isDarkMode ? '#666' : '#ccc',
      marginBottom: 10,
      borderRadius: 5,
    },
    placeholderTextColor: {
      color: isDarkMode ? '#aaa' : '#666',
    },
    button: {
      padding: 10,
      backgroundColor: isDarkMode ? '#444' : '#007bff',
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
      color: '#fff',
      fontWeight: 'bold',
    },
    jobItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDarkMode ? '#666' : '#ccc',
    },
    header: {
      padding: 15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: isDarkMode ? '#333' : '#ddd',
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
    },
    modalOverlay: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
      width: '80%',
      padding: 20,
      backgroundColor: isDarkMode ? '#333' : '#fff',
      borderRadius: 10,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDarkMode ? '#fff' : '#000',
      marginBottom: 10,
    },
    jobTitle: {
      fontSize: 22,
      color: isDarkMode ? '#fff' : '#000',
      fontWeight: 'bold',
    },
    closeButton: {
      backgroundColor: isDarkMode ? '#666' : '#ff4444',
    },
    saveButton: {
      backgroundColor: isDarkMode ? '#4CAF50' : 'green',
    },
    saveButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    closeButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    saveText: {
      color: isDarkMode ? '#4CAF50' : 'green', // Save Job text color
      fontWeight: 'bold',
      marginBottom: 10,
    },
    applyText: {
      color: isDarkMode ? '#2196F3' : 'blue', // Apply text color
      fontWeight: 'bold',
      marginBottom: 10,
    },
    closeText: {
      color: isDarkMode ? '#FF4444' : 'red',
      fontWeight: 'bold',
      marginTop: 10,
    },
    descriptionContainer: {
      marginTop: 10,
    },

    descriptionBox: {
      paddingLeft: 10,
      borderRadius: 5,
      backgroundColor: isDarkMode ? '#888' : '#fff',
    },

    collapsed: {
      maxHeight: 80, // Only show a small portion initially
      overflow: 'hidden',
    },

    expanded: {
      maxHeight: 200, // Expands but within a limit
    },

    tagContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 6, // Ensures dynamic spacing
      marginTop: 5,
    },

    tag: {
      backgroundColor: '#007bff', // Customize for dark/light mode
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
      minWidth: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },

    tagText: {
      color: '#fff',
      fontSize: 14,
      fontWeight: 'bold',
    },

    expandText: {
      color: '#007bff',
      fontSize: 14,
      fontWeight: 'bold',
      marginLeft: 10,
      marginTop: 10,
    },
  });
