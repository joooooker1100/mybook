import { useState,useEffect } from 'react';
import './App.css';
interface Ibook {
  id?:number;
  name?: string;
  auther?: string;
  publication?: string;
  Publishing?:string
}

function App() {
  const[books,setBooks]=useState<Ibook[]>([]);
  
  useEffect(() => {
    fetch("/book")
    .then((w) => w.json())
    .then((w) => setBooks(w));
  }, []);
  console.log(books);
  
  
  return (
    <div> 
      {books.map((e)=>{
    
        return(<ul>
          <li>{e.publication}</li>
        </ul>
         )
        }
        )
          }
    

         </div>
  )
}

export default App;


