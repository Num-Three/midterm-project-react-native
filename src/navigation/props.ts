import { NavigationProp, RouteProp } from '@react-navigation/native';

export interface Props {
    navigation: NavigationProp<any>;
    route: RouteProp<any, any>;
}