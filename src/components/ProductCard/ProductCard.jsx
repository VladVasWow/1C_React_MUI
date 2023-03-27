import { useState, useEffect } from "react";
import { Card, CardActions, CardContent, CardMedia, Typography, IconButton, CardActionArea } from "@mui/material";
import { NavLink} from "react-router-dom";
import { CountEditor } from "../Tools/CountEditor";
import { ccyFormat } from "../../tools/format";
import { CURRENCY_SIGN, EMPTY_LINK_ID } from "../../tools/settings";
import { useDispatch } from "react-redux";
import { addProductToOrder } from "../Slices/orderSlice";
import { showMessage } from "../Slices/snackMessageSlice";
import { fetchDataFromStorage1C } from "../../tools/fetch-other";

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { ShoppingBagRounded } from "@mui/icons-material"

export const ProductCard = (props) => {
        
    const [countProduct, setCountProduct] = useState(1);
    const [imageData, setImageData] = useState(null);
    const {product, price} = props;
    const dispatch = useDispatch();

    useEffect(() => {
        
        if (product.ОсновноеИзображение_Key !== EMPTY_LINK_ID) {
            fetchDataFromStorage1C(product.ОсновноеИзображение_Key)
            .then(setImageData);
    }}, [])

    const addToBag = () => {
        dispatch(addProductToOrder({product, countProduct: countProduct, price: price.Цена}))
        dispatch(showMessage({type : "info", textMessage: `Товар ${product.Description} у кількості ${countProduct}${product.ЕдиницаХраненияОстатков____Presentation} додано у кошик.`}));
    }

    return (
        <Card sx={ {maxWidth: 345, height: "100%", display: "flex", flexDirection: "column" }}>
                <CardActionArea component={NavLink} to={`/product/${product.Ref_Key}`} 
                                underline={"hover"} color="primary" sx={{ flexGrow: 1}}>
                    <CardMedia 
                        component="img"
                        //image = {getProductImageURL(product.Ref_Key)}
                        src = {imageData ? "data:image/jpeg;base64," + imageData :"/noimages.png"}
                        alt = {product.Code}
                        sx = {{height: 140, objectFit: "contain"}}>
                    </CardMedia>
                    <CardContent >
                        <Typography variant="caption">
                            Артикул: {product.Code}
                        </Typography>
                        <Typography variant="body1" >
                            {product.Description}
                        </Typography>
                        <Typography align="right" variant="h6" >
                            {ccyFormat(price.Цена)} {CURRENCY_SIGN}
                        </Typography>
                    
                    </CardContent>
                </CardActionArea>
                
            <CardActions>
                    <CountEditor 
                        countProduct = {countProduct}
                        setCountProduct = {setCountProduct}
                        unit={product.ЕдиницаХраненияОстатков____Presentation}>

                    </CountEditor>
                    <IconButton color="primary"
                        onClick={addToBag}>
                        <AddShoppingCartIcon color="inherit"/>
                    </IconButton>      
 
            </CardActions>
        </Card>
    )
}