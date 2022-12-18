import express from "express";
import mysql from 'mysql';
import cors from 'cors';

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bd_bookstore"
});

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("Olá  esta e o backend");
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";

    db.query(q, (err, data) => {
        if(err) return res.json(err)
        return res.json(data);
    });
});

app.post("/books", (req, res) => {
    const q = "INSERT INTO books (`title`, `desc`, `price`, `cover`) VALUES(?)";

    const values = [req.body.title, req.body.desc, req.body.price, req.body.cover];

    db.query(q, [values],  (err, data) => {
        if(err) return res.json(err)
        return res.json("O livro foi criado com sucesso");
    });
});

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q,[bookId], (err, data) => {
        if(err) return res.json(err)
        return res.json("O livro foi deletado com sucesso");
    });
});

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc`= ?, `price` = ?, `cover` = ? WHERE id = ?"

    const values = [req.body.title, req.body.desc, req.body.price, req.body.cover];

    db.query(q,[...values, bookId], (err, data) => {
        if(err) return res.json(err)
        return res.json("O livro foi atualizado com sucesso");
    });
});

app.listen(8800, ()=>{
    console.log("Conectou o backend!");
});