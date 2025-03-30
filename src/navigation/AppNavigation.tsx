import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import JobFinderScreen from '../screens/JobFinder';
import SavedJobsScreen from '../screens/SavedJobs';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="JobFinder">
                <Stack.Screen name="JobFinder" component={JobFinderScreen} />
                <Stack.Screen name="SavedJobs" component={SavedJobsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;