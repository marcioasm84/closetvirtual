import React, { useEffect } from 'react';
import { StatusBar, SafeAreaView } from 'react-native';
import AppRotas from './src/rotas/AppRotas';

import Look from './src/Look';
import Topo from './src/componentes/Topo';
import Peca from './src/Peca';
import ListaPeca from './src/Peca/ListaPeca';
import { createTables } from './src/servicos/PecaService';

export default function App() {

  useEffect(async () => {
    await createTables();
  }, []);

  return <SafeAreaView style={{ flex: 1 }}>
          <StatusBar />
          
          <Topo />
          
          <AppRotas />
          
        </SafeAreaView>
}