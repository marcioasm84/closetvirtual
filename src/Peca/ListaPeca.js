import React, { useState, useEffect } from "react";
import { useNavigation, useIsFocused } from '@react-navigation/core';

import { Alert, Text, View, Image, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import camisa from "../assets/fotos/camisas/camisa1.png";
import { Icone } from "../componentes/Icone";

import { buscaPecas, removerPecas } from '../servicos/PecaService';

export default function ListaPeca() {

    const navigation = useNavigation();

    const [lista, setLista] = useState([]);

    const isFocused = useIsFocused();

    async function mostraPecas() {
        const lista = await buscaPecas();
        
        setLista(lista);
    
        //console.log(lista);
    }

    async function deletePecas(id) {
        await removerPecas(id);
    }

    async function editarPecas({id, nome, tipo, foto}) {
        navigation.navigate('Peca', {id, nome, tipo, foto});
    }

    useEffect(() => {
        if(isFocused) {
            //console.log('UseEffect  ListaPeca');
            mostraPecas();
        }

    }, [isFocused]);

    const showConfirmaExclusao = (id) => {
        Alert.alert("Exclusão", 
                    "Deseja realmente remover a peça?", 
                    [
                        {
                            text: "Sim",
                            onPress: () => {
                                deletePecas(id.toString());
                                mostraPecas();
                            },
                        },
                        {
                            text: "Não",
                        },
                    ]
                    );
    };

    const Item = ( {id, nome, tipo, foto} ) => <TouchableOpacity 
                            style={estilos.cartao}
                            onPress={() => { editarPecas( {id, nome, tipo, foto}) }}
                        >
                        <Image source={ JSON.parse(foto) } style={estilos.imagem} resizeMode="contain" />
                        <View style={estilos.informacoes}>
                            <View>
                                <Text style={estilos.nome}>{ nome }</Text>
                                <Text style={estilos.tipoPeca}>{ tipo }</Text>
                            </View>
                            
                            <TouchableOpacity style={estilos.botaoMais} onPress={() => showConfirmaExclusao(id)}>
                                <Icone nome="trash-alt" tamanho={17} cor="#777777" />
                            </TouchableOpacity>
                        </View>
                        </TouchableOpacity>

    const TopoLista = () => {
        return <>
        <View style={estilos.bloco_titulo}>
            
            <Text style={estilos.titulo}>
                Lista de peças
            </Text>
        </View>
       
        <View style={estilos.bloco}>
            <TouchableOpacity style={estilos.botaoNovo} onPress={() => { navigation.navigate('Peca') }}>
                <Icone nome="plus" tamanho={17} cor="#0E5B96" />
            </TouchableOpacity>
        </View>
        </>
    };

    return <FlatList 
        data={lista}
        renderItem={
            ( {item} ) => <Item {...item} />
        }
        ListHeaderComponent={TopoLista}
        style={estilos.lista}
    />
}

const estilos = StyleSheet.create({
    lista: {
        backgroundColor: '#ffffff',
    },
    bloco_titulo: {
        marginTop: 16,
        marginHorizontal: 16,
        //flexDirection: "row",
    },
    titulo_icone: {
        marginTop: 5
    },
    titulo: {
        fontSize: 20,
        lineHeight: 32,
        marginHorizontal: 16,
        
        fontWeight: 'bold',
        color: '#464646',
        
    },
    cartao: {
        backgroundColor: '#F6F6F6',
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 6,
        flexDirection: "row",

        // Android
        elevation: 4,

        // iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
    },
    imagem: {
        width: 48,
        height: 48,
        borderRadius: 6,
        marginVertical: 16,
        marginLeft: 16,
    },
    informacoes: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 8,
        marginVertical: 16,
        marginRight: 16,
    },
    nome: {
        fontSize: 16,
        lineHeight: 24,
        //fontWeight: 'bold',
    },
    tipoPeca: {
        fontSize: 12,
        lineHeight: 20,
        color: 'blue',
        //fontWeight: 'bold',
    },
    distancia: {
        fontSize: 12,
        lineHeight: 19,
    },
    bloco: {
        alignItems: 'flex-end'
    },
    botaoNovo: {
        marginHorizontal: 16,
        backgroundColor: '#33C5FF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 38,
        width: 50,
        height: 50,
        marginVertical: 2
    },
});