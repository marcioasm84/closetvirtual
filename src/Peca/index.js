import React, { useEffect, useState } from "react";
import { Switch, Pressable, Modal, TouchableOpacity, Text, StyleSheet, TextInput, Image, View, Alert } from "react-native";

import semfoto from "../assets/fotos/semfoto.png";
import camisa from "../assets/fotos/camisas/camisa1.png";
import { Icone, IconeButton } from '../componentes/Icone';
import RadioItens from "./componentes/RadioItens";
import { adicionaPeca, atualizaPeca } from '../servicos/PecaService';

import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Peca() {
    const route = useRoute();
    const navigation = useNavigation();

    const p = route.params;

    const [idSelecionado, setIdSelecionado] = useState(null);
    const [nomePeca, setNomePeca] = useState("");
    const [tipoPeca, setTipoPeca] = useState("");
    const [imagem, setImagem] = useState(semfoto);
    
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        console.log('P: ', p);
        
        if(p) {
            //console.log('Editando', p);
            setIdSelecionado(p.id);
            setNomePeca(p.nome);
            setTipoPeca(p.tipo);
            setImagem(JSON.parse(p.foto) );
            //console.log(foto);
        }
    },
    [p]);

    const showConfirmaExclusao = () => {
        Alert.alert("Exclusão", 
                    "Deseja realmente remover a imagem?", 
                    [
                        {
                            text: "Sim",
                            onPress: () => {
                                setImagem(semfoto);
                            },
                        },
                        {
                            text: "Não",
                        },
                    ]
                    );
    };

    const cadastrar = async () => {
        try{
            const peca = {
                id: idSelecionado,
                nome: nomePeca,
                tipo: tipoPeca,
                foto: JSON.stringify(imagem)
            };

            if(!peca.nome || !peca.tipo || !peca.foto) {
                Alert.alert("Mensagem", "Todos os campos devem ser preenchidos");
                return;
            }
            if(idSelecionado) {
                await atualizaPeca(peca);
            } else {
                await adicionaPeca(peca);
            }
            
            Alert.alert("Mensagem", "Peça salva com sucesso");
            navigation.goBack();
        } catch(ex) {
            Alert.alert("Mensagem", "Erro ao salvar: " + ex.getMessage() );
        } finally {

        }
    };

    const limparCampos = () => {
        setIdSelecionado(null);
        setNomePeca(null);
        setTipoPeca(null);
        setImagem(null);
        
    }

    const handleChoosePhoto = () => {
        abrirImagemGaleria();
        //setImagem(camisa);
    };

    const abrirImagemGaleria = async () => {
        const options = {
            //mediaType: 'photo',
            noData: true,
            title: "Foto",
            takePhotoButtonTitle: "Escolha uma foto",
            chooseFromLibraryButtonTitle: "Selecione da galeria uma foto",
            selectionLimit: 1, // Se deixar 1, será permitido apenas uma foto e 0 várias
        
        };
        const result = await launchImageLibrary(options);
        if(result?.assets){
            setImagem({ uri: result.assets[0].uri });
            return;
        }
    };

    //const imagem = camisa;
    return <>
        
        <View style={estilos.bloco_titulo}>
            <TouchableOpacity style={estilos.titulo_icone}  onPress={() => { navigation.goBack() }}>
                <Icone nome="arrow-left" tamanho={17} cor="#0E5B96" />
            </TouchableOpacity>
            <Text style={estilos.titulo}>
            Cadastre uma peça
            </Text>
        </View>

        <Text style={estilos.texto}>Nome da peça</Text>
        <TextInput placeholder="Informe o nome da peça"
                style={estilos.entrada}
                value={nomePeca}
                onChangeText={setNomePeca}
        />

        <Text style={estilos.texto}>Tipo de Peça</Text>
        <RadioItens selectedItem={tipoPeca} onChange={(index) => { setTipoPeca(index); }}/>

        <Modal animationType="slide" transparent={false} collapsable={true} visible={modalVisible}>
            <View style={estilos.rightView}>
                <Pressable
                    style={[estilos.botaoFechar]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Icone nome="times" tamanho={24} cor="blue" />
                </Pressable>
            </View>
            <View style={[estilos.centeredView, estilos.modalView]}>
                <Image source={imagem} style={estilos.imagemAmpliada} resizeMode="contain" />
            </View>
        </Modal>

        <Text style={estilos.texto}>Escolha uma foto</Text>
        
        <View style={estilos.bloco_imagem}>
            <Image source={imagem} style={estilos.imagem} resizeMode="contain"/>

            <View style={{flexDirection: "row"}}>
                <TouchableOpacity style={estilos.botaoMais} onPress={() => setModalVisible(true)}>
                    <Icone nome="search-plus" tamanho={17} cor="#777777" />
                </TouchableOpacity>

                <TouchableOpacity style={estilos.botaoMais} onPress={() => handleChoosePhoto() }>
                    <Icone nome="camera" tamanho={17} cor="#777777" />
                </TouchableOpacity>
                
                <TouchableOpacity style={estilos.botaoMais} onPress={() => showConfirmaExclusao()}>
                    <Icone nome="trash-alt" tamanho={17} cor="#777777" />
                </TouchableOpacity>
            </View>
        </View>

        <TouchableOpacity style={estilos.botao} onPress={() => { cadastrar() }}>
            <Text style={estilos.textoBotao}>
                Cadastrar
            </Text>
        </TouchableOpacity>
    </>
}

const estilos = StyleSheet.create({
    bloco_titulo: {
        marginTop: 16,
        marginHorizontal: 16,
        flexDirection: "row",
    },
    titulo_icone: {
        marginTop: 5,
        //backgroundColor: "red",
        paddingRight: 20,
        paddingVertical: 5
    },
    titulo: {
        fontSize: 20,
        lineHeight: 32,
        //marginHorizontal: 16,
        
        fontWeight: 'bold',
        color: '#464646',
        
    },
    texto: {
        fontSize: 16,
        lineHeight: 24,
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 13,
        color: '#464646',
    },
    entrada: {
        marginHorizontal: 16,
        borderWidth: 2,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        //marginTop: 20,
        borderRadius: 8,
        height: 44,
        width: '90%',
    },
    bloco_imagem: {
        flexDirection: "row"
    },
    imagem: {
        marginHorizontal: 16,
        height: 130,
        width: 130,
        borderWidth: 3,
        borderColor: "#D1D1D1",
        
    },
    imagemAmpliada: {
        //marginHorizontal: 16,
        //height: '100%',
        width: '100%',
        flex: 0.8,
        //borderWidth: 3,
        //borderColor: "#D1D1D1",
        
    },
    botaoMais: {
        marginHorizontal: 6,
        backgroundColor: '#E4E4E4',
        
        //marginTop: 20,
        //padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        width: 50,
        height: 50,
        marginVertical: 2
    },
    botaoFechar: {
        marginHorizontal: 6,
        backgroundColor: '#FFFFFF',
        padding: 14,
        borderRadius: 8,
        marginVertical: 2
    },
    textoBotaoMais: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#999999',
    },
    botao: {
        marginHorizontal: 16,
        //backgroundColor: '#8A07DA',
        backgroundColor: 'blue',
        marginTop: 20,
        padding: 14,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        //width: '90%',
    },
    textoBotao: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
    },
    rightView: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: 22,
    },
    modalView: {
        margin: 20,
        opacity: 50,
        backgroundColor: 'white',
        //borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        /*
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,*/
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
})