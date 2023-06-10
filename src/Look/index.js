import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SliderBox } from "react-native-image-slider-box";
import { buscaPecasPorTipo } from '../servicos/PecaService';
import { useIsFocused } from "@react-navigation/native";
import { LookModal } from "./componentes/LookModal";

import { Icone } from "../componentes/Icone";

export default function Look() {

    const [modalVisible, setModalVisible] = useState(false);
    const [imagemCamisa, setImagemCamisa] = useState(null);
    const [imagemBermuda, setImagemBermuda] = useState(null);
    const [imagemSapato, setImagemSapato] = useState(null);

    const [imagesCamisa, setImagesCamisa] = useState([
        require('../assets/fotos/semfoto.png'),
    ]);

    const [imagesBermuda, setImagesBermuda] = useState([
        require('../assets/fotos/semfoto.png'),
    ]);

    const [imagesSapato, setImagesSapato] = useState([
        require('../assets/fotos/semfoto.png'),
    ]);

    const isFocused = useIsFocused();

    useEffect(() => {
        if(isFocused) {
            mostraPecas();
        }
    }, [isFocused]);

    async function mostraPecas() {
        let listaCamisa = await buscaPecasPorTipo('Camisa');
        let listaBermuda = await buscaPecasPorTipo('Bermuda');
        let listaSapato = await buscaPecasPorTipo('Sapato');
        //console.log(listaCamisa);
        
        listaCamisa = listaCamisa.flatMap((item) => {
            return JSON.parse(item.foto);
        });
        listaBermuda = listaBermuda.flatMap((item) => {
            return JSON.parse(item.foto);
        });
        listaSapato = listaSapato.flatMap((item) => {
            return JSON.parse(item.foto);
        });

        setImagesCamisa(listaCamisa);
        setImagesBermuda(listaBermuda);
        setImagesSapato(listaSapato);
    
        if(imagemCamisa == null) {
            setImagemCamisa(listaCamisa[0]);
        }
        if(imagemBermuda == null) {
            setImagemBermuda(listaBermuda[0]);
        }
        if(imagemSapato == null) {
            setImagemSapato(listaSapato[0]);
        }
        //console.log(lista);
    }
    
    const imagemClicada = (tipoPeca, index) => {
        
    };

    return <ScrollView>
                <Text style={estilos.titulo}>Monte seu look</Text>
                <View>
                    <LookModal modalVisible={modalVisible} 
                                setModalVisible={setModalVisible} 
                                imagemCamisa={imagemCamisa} 
                                imagemBermuda={imagemBermuda}
                                imagemSapato={imagemSapato} />
                </View>
                <SliderBox 
                    images={imagesCamisa}
                    resizeMode="contain"
                    sliderBoxHeight={180}
                    ImageComponentStyle={estilos.fotos}
                    dotColor="#FFEE58"
                    inactiveDotColor="#90A4AE" 
                    onCurrentImagePressed={
                        (index) => imagemClicada('Camisa', index)
                    }
                    currentImageEmitter={(index) => { 
                        setImagemCamisa(imagesCamisa[index]);
                    }}
                    paginationBoxVerticalPadding={20}
                />
                <SliderBox 
                    images={imagesBermuda}
                    resizeMode="contain"
                    sliderBoxHeight={180}
                    ImageComponentStyle={estilos.fotos}
                    dotColor="#FFEE58"
                    inactiveDotColor="#90A4AE" 
                    onCurrentImagePressed={
                        (index) => imagemClicada('Bermuda', index)
                    }
                    currentImageEmitter={(index) => { 
                        setImagemBermuda(imagesBermuda[index]);
                    }}
                    paginationBoxVerticalPadding={20}
                />
                <SliderBox 
                    images={imagesSapato}
                    resizeMode="contain"
                    sliderBoxHeight={180}
                    ImageComponentStyle={estilos.fotos}
                    dotColor="#FFEE58"
                    inactiveDotColor="#90A4AE" 
                    onCurrentImagePressed={
                        (index) => imagemClicada('Sapato', index)
                    }
                    currentImageEmitter={(index) => { 
                        setImagemSapato(imagesSapato[index]);
                    }}
                    paginationBoxVerticalPadding={20}
                />

                <View style={estilos.bloco}>
                    <TouchableOpacity style={estilos.botaoNovo} onPress={() => { setModalVisible(true);  }}>
                        <Icone nome="search-plus" tamanho={24} cor="#0E5B96" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
}

const estilos = StyleSheet.create({
    fotos: {
        width: '40%',
        //height: 200,
        //height: undefined
        //flex: 1,
       // width: '100%',
        //height: '60%',
        //resizeMode: 'cover',
    },
    conteudo: {
        paddingHorizontal: 16,
    },
    titulo: {
      fontSize: 20,
      lineHeight: 32,
      marginHorizontal: 16,
      marginTop: 16,
      marginBottom: 23,
      fontWeight: 'bold',
      color: '#464646',
    },
    bloco: {
        marginVertical: 8,
        //color: '#464646',
        //fontSize: 20,
        //lineHeight: 32,
        //fontWeight: 'bold',
        //marginLeft: 16,
    },

    item: {
      backgroundColor: '#EAa5F3',
      padding: 16,
      color: '#464646',
      fontSize: 16,
      lineHeight: 26
    },

    bloco: {
        //alignItems: 'flex-end',
        position: "absolute",
        //backgroundColor: 'red',
        bottom: 0,
        right: 0,
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
})