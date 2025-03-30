import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useGlobalContext } from '../context/GlobalContext';
import JobFinderScreen from '../screens/JobFinder';
import SavedJobsScreen from '../screens/SavedJobs';
import ApplicationFormScreen from '../screens/ApplicationForm';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const { isDarkMode } = useGlobalContext();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="JobFinder" screenOptions={{ headerStyle: { backgroundColor: isDarkMode ? '#242424' : '#fff' }, headerTintColor: isDarkMode ? '#fff' : '#000' }}>
                <Stack.Screen name="JobFinder" component={JobFinderScreen} />
                <Stack.Screen name="SavedJobs" component={SavedJobsScreen} />
                <Stack.Screen name="ApplicationForm" component={ApplicationFormScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;