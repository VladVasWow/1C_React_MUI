import { Container, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useLoaderData, useNavigation, useSearchParams } from "react-router-dom"
import { useParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard/ProductCard";
import { ProductsPagination } from "../components/Tools/ProductsPagination";
import { useSelector } from "react-redux";
import { ProductCardSkeleton } from "../components/ProductCard/ProductCardSkeleton";

export const ProductsPage = () => {

    const loaderData = useLoaderData();
    const {products, prices} = loaderData;
    const { state } = useNavigation();
    const params = useParams();
    const { categoryID } = params;
    const [searchParams] = useSearchParams();
    const page = searchParams.get('page') || '';
    const find = searchParams.get('find') || '';
    const order = useSelector(state => state.order);
    const [count, setCount] = useState(0);
    //console.log(prices);
    //console.log(find);

    return (
        <Container sx = {{ width: '100%'}}>
            <Container sx = {{ width: '100%', display: "flex", justifyContent: "center"}} >
                <ProductsPagination 
                        categoryID = {categoryID} 
                        page = {page}
                        count = {count}
                        setCount = {setCount}
                        find = {find}/>            
            </Container>
            <Container>
                {(find) ? <Typography  > Результати пошуку по "{find}."</Typography> : null}
                {(state !== "loading" && !count) ? <Typography>По запиту не знайдено жодного товару.</Typography> : null}
            </Container>
            <Grid container maxWidth="xl" spacing={2} mt={0}>
                {state === "loading" ?  Array.from(new Array(5)).map((item, index) => (
                        <ProductCardSkeleton 
                            item key={index}>
                        </ProductCardSkeleton>)) :
                    products.map((product) => {
                        return (<Grid item key={product.Ref_Key} xs={12} sm={6} md={4} xl={3}>
                                <ProductCard 
                                    product={product} 
                                    price = {prices.find((price)=> price.ЕдиницаИзмерения_Key === product.ЕдиницаХраненияОстатков_Key)} 
                                    order = {order} 
                                    />
                        </Grid>
                        )
                    })}
            </Grid>
            <Container sx = {{ width: '100%', mt: 1, display: "flex", justifyContent: "center"}} >
                <ProductsPagination 
                    categoryID = {categoryID} 
                    page = {page}
                    count = {count}
                    find = {find}/>
            </Container>
        </Container>)
}