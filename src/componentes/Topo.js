import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import { Icone } from '../componentes/Icone';

export default function Topo() {

    return <View style={estilos.topo}>
        <View style={{marginTop: 16}}>
        <Icone nome="tshirt" tamanho={22} cor="#a8c8ff" />
        </View>
        <Text style={estilos.titulo}>closet virtual</Text>
    </View>
}

const estilos = StyleSheet.create({
    topo: {
        //width: "100%",
        flexDirection: "row",
        //backgroundColor: "#F3F3F3",
        //backgroundColor: "#f0483c",
        //backgroundColor: "#fff",
        backgroundColor: "#2065d8",
        borderBottomColor: "#2065d8",
        borderBottomWidth: 1,
        //paddingHorizontal: 16,
        //marginHorizontal: 16
        paddingHorizontal: 16,
      },
      titulo: {
        //width: "100%",
        textAlign: "left",
        fontSize: 18,
        lineHeight: 26,
        color: "#a8c8ff",
        //color: "#2065d8",
        fontWeight: "bold",
        paddingVertical: 16,
        paddingLeft: 3
      },

});