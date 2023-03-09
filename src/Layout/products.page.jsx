import { Container, Grid } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigation, useSearchParams } from "react-router-dom"
import {  useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { ProductsPagination } from "../components/Tools/ProductsPagination";
import { useOutletContext } from "react-router-dom";
import { SnackAppBar } from "../components/Tools/SnackAppBar";

export const ProductsPage = () => {

    const loaderData = useLoaderData();
    const {products, count, prices} = loaderData;
    const { state } = useNavigation();
    const params = useParams();
    const { categoryID } = params;
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || '';
    const [order, setOrder] = useOutletContext();
    console.log(prices);
    //console.log(searchParams.toString());
    //console.log(useParams());
    //console.log(setOrder);

    return (
        <Container sx = {{ width: '100%'}}>
            <Container sx = {{ width: '100%', display: "flex", justifyContent: "center"}} >
                <ProductsPagination params={{categoryID, page, count}} />
            </Container>
            <Grid container maxWidth="xl" spacing={2} mt={0}>
                {state === "loading" ? "LOADING..." :
                    products.map((product) => {
                        return (<Grid item key={product.Ref_Key} xs={12} sm={6} md={4} xl={3}>
                                <ProductCard 
                                    product={product} 
                                    price = {prices.find((price)=> price.ЕдиницаИзмерения_Key === product.ЕдиницаХраненияОстатков_Key)} 
                                    order = {order} 
                                    setOrder={setOrder} 
                                    //isSnackOpen = {isSnackOpen} 
                                    //setSnackOpen= {setSnackOpen} 
                                    />
                        </Grid>
                        )
                    })}
            </Grid>
            <Container sx = {{ width: '100%', mt: 1, display: "flex", justifyContent: "center"}} >
                <ProductsPagination params={{categoryID, page, count}}/>
            </Container>
        </Container>)
}