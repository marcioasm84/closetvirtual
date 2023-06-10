import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListaPeca from "../Peca/ListaPeca";
import Peca from "../Peca";

const Stack = createNativeStackNavigator();

export default function PecaRotas( {ComponentePrincipal = ListaPeca} ) {

    return  <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="HomeScreen" component={ComponentePrincipal} />
                <Stack.Screen name="Peca" component={Peca} />
            </Stack.Navigator>
}
