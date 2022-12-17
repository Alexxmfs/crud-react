import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Link }  from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([])
  
  useEffect(() => {
    const fecthAllBooks = async ()=>{
        try{
            const res = await axios.get("http://localhost:8800/books")
            setBooks(res.data);
            console.log(res);
        }catch(err){
            console.log(err);
        }
    }
    fecthAllBooks()
  }, [])
    return (
    <div>
      <h1>Alex Shopping</h1>
      <div className="books">
        {books.map(book=>(
            <div classNames="book" key={book.id}>
                {book.cover && <img src={book.cover} alt="" />}
                <h2>{book.title}</h2>
                <p>{book.desc}</p>
                <span>{book.price}</span>
                <button className="delete">Delete</button>
                <button className="update">Update</button>
            </div>
        ))}
      </div>
      <button><Link to="/add">Add new book</Link></button>
    </div>
  )
}

export default Books