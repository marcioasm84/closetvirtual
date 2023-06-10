import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase({
    name: "db",
});

export const createTables = () => {
    db.transaction(txn => {

        const sql = "CREATE TABLE IF NOT EXISTS Pecas " +
            "(id INTEGER PRIMARY KEY AUTOINCREMENT, " +
            "nome TEXT, tipo TEXT, foto TEXT); ";

        txn.executeSql(
            sql,
            [],
            (sqlTxn, res) => {
                //console.log("table created successfully");
            },
            error => {
                //console.log("error on creating table " + error.message);
            },
        );
    });
};

export const adicionaPeca = (peca) => {

    db.transaction(txn => {
        const sql = "INSERT INTO Pecas(nome, tipo, foto) "
            + " VALUES(?, ?, ?); ";

        txn.executeSql(
            sql,
            [peca.nome, peca.tipo, peca.foto],
            (sqlTxn, res) => {
                //console.log(`${peca} peca added successfully`);
            },
            error => {
                //console.log("error on adding peca " + error.message);
            },
        );
    });
};

export const atualizaPeca = (peca) => {

    db.transaction(txn => {
        const sql = "UPDATE Pecas SET nome = ?, tipo = ?, foto = ? "
                + " WHERE id = ?";

        txn.executeSql(
            sql,
            [peca.nome, peca.tipo, peca.foto, peca.id],
            (sqlTxn, res) => {
                //console.log(`${peca} peca altered successfully`);
            },
            error => {
                //console.log("error on alter peca " + error.message);
            },
        );
    });
};

export const buscaPecas = async () => {
    return new Promise( (resolve) => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM Pecas ORDER BY tipo;`,
                [],
                (sqlTxn, res) => {
                    //console.log("categories retrieved successfully");
                    let len = res.rows.length;

                    let results = [];
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push(item);
                        }
                    }
                    resolve(results);
                },
                error => {
                    //console.log("error on getting categories " + error.message);
                },
            );
        });
    });
};

export const buscaPecasPorTipo = async (tipo) => {
    return new Promise( (resolve) => {
        db.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM Pecas WHERE tipo = ?;`,
                [tipo],
                (sqlTxn, res) => {
                    //console.log("categories retrieved successfully");
                    let len = res.rows.length;

                    let results = [];
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push(item);
                        }
                    }
                    resolve(results);
                },
                error => {
                    //console.log("error on getting categories " + error.message);
                },
            );
        });
    });
};

export const removerPecas = async (id) => {
    return new Promise( (resolve) => {
        db.transaction(txn => {
            const sql = "DELETE FROM Pecas "
                    + " WHERE id = ?; ";

            txn.executeSql(
                    sql, 
                    [id], 
                    () => {
                        resolve("Peca removida com sucesso!");
                    }
            );
        });
    });
};
