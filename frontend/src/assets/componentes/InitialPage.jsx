import {useState} from 'react';
import Input from "./Input.jsx";
import ListUsers from "./ListUsers.jsx";
import {Link} from "react-router-dom";

function InitialPage(){
    return(
        <>
        <h1 className="text-3xl font-bold text-center mt">Library Manager</h1>

        <div className="flex flex-col space-y-4 p-6 bg-slate-200 rounded-md w-80 mx-auto mt-8">
            <h2 className="text-blue-500 text-2xl font-bold text-center mt">Users</h2>
            <button className="bg-slate-400 px-4 py-2 rounded-md font-medium" > 
                <Link to="/list-users"> List all users</Link>
             </button>
            <button className="bg-slate-400 px-4 py-2 rounded-md font-medium">  
                <Link to="/post-users">Register a new user</Link>
            </button>
            <button className="bg-slate-400 px-4 py-2 rounded-md font-medium">  
                <Link to="/update-user">Update user info</Link>
            </button>
            <button className="bg-slate-400 px-4 py-2 rounded-md font-medium">  
                <Link to="/delete-users">Delete a user</Link>
            </button>

            <h2 className="text-blue-500 text-2xl font-bold text-center mt">Books</h2>
            <button className="bg-slate-400 px-4 py-2 rounded-md font-medium">
                <Link to="list-books">List all books</Link>
            </button>
            <button className="bg-slate-400 px-4 py-2 rounded-md font-medium">
                <Link to="/post-books">Register a book</Link>
            </button>
            <button className="bg-slate-400 px-4 py-2 rounded-md font-medium">
                <Link to="/update-book">Update a book</Link>
            </button>
            <button className="bg-slate-400 px-4 py-2 rounded-md font-medium">
                <Link to="delete-books">Delete a book</Link>
            </button>

            <h2 className="text-blue-500 text-2xl font-bold text-center mt">Rents</h2>
            <button className="bg-slate-400 px-4 py-2 rounded-md font-medium">
                <Link to="list-rents">List rents</Link>
            </button>
            <button className="bg-slate-400 px-4 py-2 rounded-md font-medium">
            <Link to="/post-locacao">Register rent</Link>
            </button>
            
            
        </div>

        </>
    );
}

export default InitialPage;