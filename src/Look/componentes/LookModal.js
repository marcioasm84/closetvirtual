import React, { useEffect, useState } from "react";
import { Pressable, Modal, Text, StyleSheet, Image, View } from "react-native";
import { Icone } from '../../componentes/Icone';
import semfoto from "../../assets/fotos/semfoto.png";

export function LookModal({modalVisible, setModalVisible, imagemCamisa, imagemBermuda, imagemSapato}) {

    return <Modal animationType="slide" transparent={false} collapsable={true} visible={modalVisible}>
                <View style={estilos.rightView}>
                    <Pressable
                        style={[estilos.botaoFechar]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Icone nome="times" tamanho={24} cor="blue" />
                    </Pressable>
                </View>
                <View style={[estilos.centeredView, estilos.modalView]}>
                    <Image source={imagemCamisa} style={estilos.imagemAmpliada} resizeMode="contain" />
                    <Image source={imagemBermuda} style={estilos.imagemAmpliada} resizeMode="contain"/>
                    <Image source={imagemSapato} style={estilos.imagemAmpliada} resizeMode="contain"/>

                </View>
            </Modal>
}

const estilos = StyleSheet.create({
    
    imagemAmpliada: {
        //marginHorizontal: 16,
        height: '32%',
        width: '50%',
        //flex: 0.8,
        //borderWidth: 3,
        //borderColor: "#D1D1D1",
        
    },
    
    botaoFechar: {
        marginHorizontal: 6,
        backgroundColor: '#FFFFFF',
        padding: 14,
        borderRadius: 8,
        marginVertical: 2
    },
    
    rightView: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        borderBottomColor: '#eee',
        borderBottomWidth: 2
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //marginTop: 22,
        
    },
    modalView: {
        //margin: 20,
        opacity: 50,
        backgroundColor: 'white',
        //borderRadius: 20,
        //padding: 35,
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
      
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
})