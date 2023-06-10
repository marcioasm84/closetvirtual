import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Look from "../Look";
import ListaPeca from "../Peca/ListaPeca";
import { Icone } from "../componentes/Icone";

import PecaRotas from "./PecaRotas";

const Tab = createBottomTabNavigator();

export default function AppRotas() {

    const options = ( { route } ) => {
        return {
            tabBarIcon: () => {
                if( route.name === 'Look') {
                    return <Icone nome="home" tamanho={24} cor="#666" />
                }
                if( route.name === 'Peças disponíveis') {
                    return <Icone nome="plus" tamanho={24} cor="#666" />
                }
            },
            headerShown: false,
            tabBarActiveTintColor: '#666',
            tabBarInactiveTintColor: '#aaa',
        }
    };

    return  <NavigationContainer>
        <Tab.Navigator screenOptions={options}>
            <Tab.Screen name='Look' component={Look} />
            <Tab.Screen name='Peças disponíveis' component={PecaRotas} />
        </Tab.Navigator>
    </NavigationContainer>

}