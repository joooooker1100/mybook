import { useState, useEffect } from "react";
import React from "react";
import "./App.css";
interface Ibook {
  id?: number;
  name?: string;
  auther?: string;
  publication?: string;
  Publishing?: string;
}
function App() {
  const [publishing, setPublishing] = useState<string>();
  const [nameBook, setNameBook] = useState<string>();
  const [nameAuther, setNameAuther] = useState<string>();
  const [dataPublication, setDataPublication] = useState<string>();
  const [books, setBooks] = useState<Ibook[]>([]);
  const [book, setBook] = useState<string>();
  useEffect(() => {
    fetch("/book")
      .then((w) => w.json())
      .then((w) => setBooks(w));
  }, []);
 

  return (
    <div>
      <input type={"text"} placeholder={"name"} value={nameBook} onChange={(e)=>{setNameBook(e.target.value)}}/>
      <input type={"text"}placeholder={"auther"} value={nameAuther } onChange={(e)=>{setNameAuther(e.target.value)}}/>
      <input type={"text"}placeholder={"publication"}value={publishing} onChange={(e)=>{setPublishing(e.target.value)}}/>
      <input type={"text"}placeholder={"Publishing"}value={dataPublication} onChange={(e)=>{setDataPublication(e.target.value)}}/>
      <button onClick={()=>{
        if (
          (nameBook?.length??0)>0&&
          (nameAuther?.length??0)>0&&
          (dataPublication?.length??0)>0&&
          (publishing?.length??0)>0
        ) {
          
          const book: Ibook = {
            name: nameBook,
            auther: nameAuther,
            publication: dataPublication,
            Publishing:publishing
          };
          
        }
       fetch("/book",
       {
         method: 'post',
         headers:{
           'content-type':'application/json'
          },
          body: JSON.stringify(book                
            )}).then((w) => w.json())
            .then((w) => setBooks(w));
            console.log(book)
            
      }}>save</button>
      <table>
        <tr>
          <th>name</th>
          <th>auther</th>
          <th>publication</th>
          <th>Publishing</th>
          <th></th>
          <th></th>

        </tr>

        {books.map((e) => {
          return (
            <tr>
              <td className="name">{e.name}</td>
              <td>{e.auther}</td>
              <td>{e.publication}</td>
              <td>{e.Publishing}</td>
              <button>delete</button>
              <button>edite</button>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
