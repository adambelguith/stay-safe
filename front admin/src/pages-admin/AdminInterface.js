import { Outlet } from "react-router-dom";
import NavbarAdmin from "../components-admin/NavbarAdmin";
import Footer from "../components/Footer";


export default function AdminInterface(){

    return (
        <>
            <NavbarAdmin/>
            <Outlet />
            <Footer/>
        </>
    )
}