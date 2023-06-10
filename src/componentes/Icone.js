import React from "react";
import { StyleSheet, View, Text} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';

export function Icone({nome, tamanho, cor}) {
    return <View style={estilos.iconContainer}>
        <Icon name={nome} size={tamanho} color={cor} style={estilos.icone} />
    </View>
}

export function IconeButton({nome, tamanho, corFundo, texto, corTexto}) {
    return <Icon.Button
                name={nome} 
                size={tamanho} 
                corFundo={corFundo}
                iconStyle={estilos.iconButton}
                backgroundColor={corFundo}
                onPress={() => alert('Login com Facebook')}>
                    {/* 
                    <Text style={{fontSize: 10, color: {corTexto} }}>
                        {texto}
                    </Text>
                    */}
                    
            </Icon.Button>
}

const estilos = StyleSheet.create({
    iconContainer: {
    },
    icone: {
    },
    iconButton: {
        alignItems: "center",
        alignContent: "center"
    }
});