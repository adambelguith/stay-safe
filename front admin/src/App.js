import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

import Notfound from "./pages-user/pages/Notfound";
import Signup from "./User/Signup";
import Signin from "./User/Signin";

import Classify from "./pages-user/pages/Classify";
import Sort from "./pages-user/pages/Sort";
import Data from "./pages-user/pages/Data";
import ModalImage from "./pages-user/pages/Modal-Image";

import Update from "./pages-user/pages/Update";
import Verifier from "./pages-admin/pages/Verifier";
import ManageUsers from "./pages-admin/pages/ManageUsers";

import UserInterface from "./pages-user/UserInterface";
import AdminInterface from "./pages-admin/AdminInterface";

import Test from "./pages-admin/pages/Test";
import FirstPage from "./Firstpage";


function App() {
  return (

      <Routes>

        <Route path="/" element={<FirstPage/>}/>

        <Route path="/user" element={<UserInterface/>}>
            <Route index element={<Classify/>}/>
            <Route path="sort" element={<Sort/>}/>
            <Route path="data" element={<Data/>}/>
            <Route path="image-modal" element={<ModalImage/>}/>
            <Route path="update" element={<Update/>}/>
        </Route>


        <Route path="/admin" element={<AdminInterface/>}>
            <Route path="demands" element={<Verifier/>}/>
            <Route path="manage-users" element={<ManageUsers/>}/>
            <Route path="update" element={<Update/>}/>
            <Route path="test" element={<Test/>}/>
        </Route>

        <Route path="*" element={<Notfound/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>

      </Routes>
  
  );
}

export default App;