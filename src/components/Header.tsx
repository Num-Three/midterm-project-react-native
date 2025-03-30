import { useGlobalContext } from "../context/GlobalContext";
import { getGlobalStyles } from '../styles/globalStyles';
import { View, Text, Switch } from "react-native";
const Header = () => {
    const { isDarkMode, toggleDarkMode } = useGlobalContext();
    const styles = getGlobalStyles(isDarkMode);
    return (
        <View style={styles.header}>
            <Text style={styles.headerText}>Toggle Dark Mode</Text>
            <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
        </View>
    );
};

export default Header;