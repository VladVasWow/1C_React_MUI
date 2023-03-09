import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import {useLoaderData} from "react-router-dom"

export const ProductPage = (props) => {
    const productInfo = useLoaderData();
    //const {ID, name, price, description, image} = product; <img src={image} alt="Image" />
    //console.log(image);
    return (

        <Container sx = {{ width: '100%', mt: 1}}>
            <Typography>
                Артикул:{productInfo.Code}
            </Typography>
            <Container component="img"
                src = {productInfo.ОсновноеИзображение? "data:image/jpeg;base64," + productInfo.ОсновноеИзображение.Хранилище_Base64Data :"/noimages.png"}
                sx = {{height: 340, objectFit: "contain"}}>
            </Container>

            <Typography>
                {productInfo.Description}
            </Typography>

            <Typography>
                {productInfo.Описание}
            </Typography>

        </Container>
    )
}