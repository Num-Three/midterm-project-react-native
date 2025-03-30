import { SafeAreaView, StatusBar } from 'react-native';
import AppNavigator from './src/navigation/AppNavigation';
import { GlobalProvider } from './src/context/GlobalContext';

export default function App() {
  return (
    <GlobalProvider>
      <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
        <AppNavigator />
      </SafeAreaView>
    </GlobalProvider>
  );
}