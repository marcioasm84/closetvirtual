import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View } from 'react-native';
import Radio from '../../componentes/Radio';

export default function RadioItens({ selectedItem, onChange }) {
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(selectedItem);
    }, 
    [selectedItem]);

    const btnClick = (index) => {

        setValue(index);
        onChange(index);
    };

    return <View style={estilos.grupo}>
                <Radio texto="Camisa" checked={value === "Camisa"} onClick={(o) => { btnClick("Camisa") }} />
                <Radio texto="Bermuda" checked={value === "Bermuda"} onClick={(o) => { btnClick("Bermuda") }} />
                <Radio texto="Sapato" checked={value === "Sapato"} onClick={(o) => { btnClick("Sapato") }} />
            </View>
}


const estilos = StyleSheet.create({
    grupo: {
        flexDirection: "row"
    },
  })