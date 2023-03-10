import { Container } from "@mui/system";
import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Catigories } from "../components/Catigories/Catigories";
import { Header } from "../components/Header/Header";
import { SnackAppBar } from "../components/Tools/SnackAppBar";

export const Layout = () => {
    const [order, setOrder] = useState([]);
    
    return (
    <>
        <header>
            <Header/>
        </header>
        <main>
            <Container 
                sx={{display: "flex", justifyContent: "space-between"}}>
                <Catigories ></Catigories>
                <Container sx={{ mt: 2 }}>
                    <Outlet context={[order, setOrder]}></Outlet>
                </Container>
            </Container>    
        </main>    
        <footer>
        <Container xs= {{color: "main"}}>
                <NavLink to="">HOME</NavLink>
                <NavLink to="catigories">Категории</NavLink>
                <NavLink to="products">Товары</NavLink>
                <NavLink to="about">ABOUT</NavLink>
        </Container>        
        </footer>

    </>)
}