import { Container } from "@mui/system";
import { NavLink, Outlet } from "react-router-dom";
import { Categories } from "../components/Categories/Categories";
import { Header } from "../components/Header/Header";
import { Box } from "@mui/material";
import { useState } from "react";

export const Layout = () => {
    const [categories, setCategories] = useState([]);
    
    return (
    <>
        <header>
            <Header categories = {categories} setCategories={setCategories}/>
        </header>
        <main>
            <Container 
                sx={{display: "flex", justifyContent: "space-between"}}>
                <Box sx={{ maxWidth: { md:250, sm: 160 }, display: {sm: "block",xs: "none"}}} width='100%'>
                    <Categories  categories = {categories} setCategories={setCategories}></Categories>
                </Box>
                <Container sx={{ mt: 2 }}>
                    <Outlet></Outlet>
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