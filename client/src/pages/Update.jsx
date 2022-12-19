import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put("http://localhost:8800/books/" + bookId, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(book);
  return (
    <div className="container">
      <div className="form">
        <h1>Update the Book</h1>
        <input
          type="text"
          placeholder="Digite um titulo"
          onChange={handleChange}
          name="title"
        />
        <input
          type="text"
          placeholder="Digite uma descrição"
          onChange={handleChange}
          name="desc"
        />
        <input
          type="number"
          placeholder="Digite um preço"
          onChange={handleChange}
          name="price"
        />
        <input
          type="text"
          placeholder="URL image"
          onChange={handleChange}
          name="cover"
        />
        <button className="formButton" onClick={handleClick}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Update;
