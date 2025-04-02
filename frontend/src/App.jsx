import { useState,useEffect } from 'react'
import './App.css'

function App() {
  const [users,setDados] = useState([]);

   useEffect(()=> {
      fetch("/api/bib/user")
        .then(response => response.json())
        .then(users => setDados(users)) 
        .catch(error => console.error("Erro na API:", error));
  },[]); 

  return (
    <div>
       <h1>Teste do front</h1>
          {users.map(user =>(
            <li key = {user.id}>{user.nome}</li>
          ))}
       
    </div>
       
  );
}

export default App
