import React, { useState, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icone } from "./Icone";

export default function Radio({texto, checked, onClick}) {
    const [estiloItem, setEstiloItem] = useState(estilos.botao);

    useEffect(()=>{
        setEstiloItem(checked ? estilos.botaoChecked : estilos.botao )
    },
    [checked]);

    return <TouchableOpacity style={estiloItem} 
                onPress={ () => { onClick(); } } >
            {checked && <Icone nome="check" cor="#333333" tamanho={16} />}
            <Text style={estilos.textoBotao}>
            {texto}
            </Text>
            </TouchableOpacity>
}

const estilos = StyleSheet.create({

    botao: {
        flexDirection: "row",
        //marginHorizontal: 16,
       // backgroundColor: '#fff',
        backgroundColor: '#F4F4F4',
        //marginTop: 20,
        padding: 12,
        //alignItems: 'center',
        //justifyContent: 'center',
        borderRadius: 8,
        //width: '90%',
    },
    botaoChecked: {
        flexDirection: "row",
        marginHorizontal: 16,
        //backgroundColor: '#8A07DA',
        backgroundColor: '#D4D4D4',
       // marginTop: 20,
        padding: 12,
        //alignItems: 'center',
        //justifyContent: 'center',
        borderRadius: 8,
        //width: '90%',
        
    },
    textoBotao: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#666666',
        marginLeft: 10
    },
  })