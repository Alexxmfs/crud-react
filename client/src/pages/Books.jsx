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
  }, []);

  const handleDelete = async (id)=>{
    try{
      await axios.delete("http://localhost:8800/books/"+id)
      window.location.reload()
    }catch(err){  
      console.log(err);
    }
  }

    return (
    <div>
      <h1>Alex Shopping</h1>
      <div className="books">
        {books.map(book=>(
            <div className="book" key={book.id}>
                {book.cover && <img src={book.cover} alt="" />}
                <h2>{book.title}</h2>
                <p>{book.desc}</p>
                <span>${book.price}</span>
                <button className="delete" onClick={()=>handleDelete(book.id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="iconTrash" viewBox="0 0 16 16"> <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/> <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/></svg>
                  Excluir
                  </button>
                <button className="update"><Link className="styleLink" to={`/update/${book.id}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="iconPencil" viewBox="0 0 16 16"> <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" fill="white"></path> </svg>
                  Atualizar
                  </Link></button>
            </div>
        ))}
      </div>
      <button className="buttonAdd"><Link className="styleLink" to="/add">Add novo livro</Link></button>
    </div>
  );
}

export default Books