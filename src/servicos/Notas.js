import { db } from "./SQLite"

export function criaTabela() {
  db.transaction((transaction) => {
    transaction.executeSql("CREATE TABLE IF NOT EXISTS " + 
      "Notasfluxo " +
      "(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT, date DATETIME DEFAULT CURRENT_TIMESTAMP, createTime TIMESTAMP DEFAULT CURRENT_TIMESTAMP, updateTime DATE DEFAULT CURRENT_TIMESTAMP);")
  })
}

export async function adicionaNota(nota) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("INSERT INTO Notasfluxo (titulo, categoria, texto) VALUES (?, ?, ?);", [nota.titulo, nota.categoria,
      nota.texto], () => {
          resolve("Nota adicionada com sucesso!")
      })

    })
  })
}

export async function buscaNotas() {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("SELECT * FROM Notasfluxo;", [], (transaction, resultado) => {
          resolve(resultado.rows._array)
      })

    })
  })
}

export async function atualizaNota(nota) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("UPDATE Notasfluxo SET titulo = ?, categoria = ?, texto = ? WHERE id = ?;", [nota.titulo, nota.categoria, nota.texto, nota.id], () => {
          resolve("Nota atualizada com sucesso!")
      })
    })
  })
}

export async function removeNota(nota) {
  return new Promise((resolve) => {
    db.transaction((transaction) => {
      transaction.executeSql("DELETE FROM Notasfluxo WHERE id = ?;", [nota.id], () => {
          resolve("Nota removida com sucesso!")
      })
    })
  })
}

export async function filtraPorCategoria(categoria) {
  return new Promise((resolve) => {
      db.transaction((tx) => {
          tx.executeSql("SELECT * FROM Notasfluxo WHERE categoria = ?;", [categoria], (tx, results) => {
              resolve(results.rows._array)
          })
      })
  })
}