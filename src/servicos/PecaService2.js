import { db } from "./SQLite2";

export function criaTabela() {
    db.transaction( (transaction) => {  
        const sql = "CREATE TABLE IF NOT EXISTS Pecas "+
        "(id INTEGER PRIMARY KEY AUTOINCREMENT, "+
        "nome TEXT, tipo TEXT, foto TEXT); ";
        transaction.executeSql(sql);
    });
}

export async function adicionaPeca(peca) {
    return new Promise( (resolve) => {

        db.transaction( (transaction) => {
            const sql = "INSERT INTO Pecas(nome, tipo, foto) "
                    + " VALUES(?, ?, ?); ";
    
            transaction.executeSql(
                            sql, 
                            [peca.nome, peca.tipo, peca.foto], 
                            () => {
                                resolve("Peca adicionada com sucesso!");
                            }
                        );
        });

    });
}

export async function buscaPecas() {
    return new Promise( (resolve) => {

        db.transaction( (transaction) => {
            const sql = "SELECT * FROM Pecas;";
    
            transaction.executeSql(
                            sql, 
                            [], 
                            (transaction, resultado) => {
                                resolve(resultado.rows._array);
                            }
                        );
        });
    });
}


