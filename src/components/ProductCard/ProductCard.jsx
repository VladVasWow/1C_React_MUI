import { useState, useEffect } from "react";
import { Card, CardActions, CardContent, CardMedia, Typography, TextField, InputAdornment,IconButton, Link,CardActionArea } from "@mui/material";
import { ShoppingBagRounded } from "@mui/icons-material"
import { Container } from "@mui/system";
import { NavLink} from "react-router-dom";
import { CountEditor } from "../Tools/CountEditor";
import { ccyFormat } from "../../tools/format";
import { CURRENCY_SIGN } from "../../tools/settings";


export const ProductCard = (props) => {
        
    const [countProduct, setCountProduct] = useState(1);
    const {product, price, order, setOrder, isSnackOpen, setSnackOpen} = props;

    //console.log(setOrder);

    const addToBag = () => {

        const newOrder = order.filter((element) => element.product.Ref_Key !== product.Ref_Key);
        newOrder.push({product, countProduct: countProduct, price: price.Цена});
        setOrder(newOrder);
        //setSnackOpen(true);
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