import { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Typography, TextField, InputAdornment,IconButton, Link,CardActionArea } from "@mui/material";
import { ShoppingBagRounded } from "@mui/icons-material"
import { NavLink} from "react-router-dom";
import { CountEditor } from "../Tools/CountEditor";
import { ccyFormat } from "../../tools/format";
import { CURRENCY_SIGN } from "../../tools/settings";
import { useDispatch } from "react-redux";
import { addProductToOrder } from "../Slices/orderSlice";
import { showMessage } from "../Slices/snackMessageSlice";


export const ProductCard = (props) => {
        
    const [countProduct, setCountProduct] = useState(1);
    const {product, price} = props;
    const dispatch = useDispatch();
    //console.log(setOrder);

    const addToBag = () => {
        dispatch(addProductToOrder({product, countProduct: countProduct, price: price.Цена}))
        dispatch(showMessage({type : "info", textMessage: `Товар ${product.Description} у кількості ${countProduct}${product.ЕдиницаХраненияОстатков____Presentation} додано у кошик.`}));
    }

    return (
        <Card sx={ {maxWidth: 345, height: "100%" }}>
                <CardActionArea component={NavLink} to={`/product/${product.Ref_Key}`} underline={"hover"} color="primary">
                    <CardMedia 
                        component="img"
                        //image = {getProductImageURL(product.Ref_Key)}
                        src = {product.ОсновноеИзображение? "data:image/jpeg;base64," + product.ОсновноеИзображение.Хранилище_Base64Data :"/noimages.png"}
                        alt = {product.Code}
                        sx = {{height: 140, objectFit: "contain"}}>
                    </CardMedia>
                    <CardContent >
                        <Typography variant="caption">
                            Артикул: {product.Code}
                        </Typography>
                        <Typography variant="body1">
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
                        <ShoppingBagRounded />
                    </IconButton>      
 
            </CardActions>
        </Card>
    )
}