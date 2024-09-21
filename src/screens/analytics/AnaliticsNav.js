import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AnalyticsScreen from './Analitics';

const AnaliticsStack = createNativeStackNavigator();

function AnaliticsNav() {
    return (
        <AnaliticsStack.Navigator>
            <AnaliticsStack.Screen name="Analytics" component={AnalyticsScreen} />
        </AnaliticsStack.Navigator>
    );
}

export default AnaliticsNav;
