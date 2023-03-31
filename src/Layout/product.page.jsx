import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import {useLoaderData} from "react-router-dom"
import { useEffect, useState } from "react";
import { fetchProductImagesByCode } from "../tools/fetch-product";
import { AutoPlaySwipeableViews } from "../components/Tools/AutoPlaySwipeableViews";

export const ProductPage = () => {
    const productInfo = useLoaderData();
    const [images, setImages] = useState([])
    //const {ID, name, price, description, image} = product; <img src={image} alt="Image" />
    //console.log(image);
    useEffect(() => {
        fetchProductImagesByCode(productInfo.Code)
            .then(setImages);
    }, [])
    return (

        <Container sx = {{ width: '100%', mt: 1}}>
            <Typography>
                Артикул:{productInfo.Code}
            </Typography>
            <Container component="img"
                src = {productInfo.ОсновноеИзображение? "data:image/jpeg;base64," + productInfo.ОсновноеИзображение.Хранилище_Base64Data :"/noimages.png"}
                sx = {{height: 340, objectFit: "contain"}}>
            </Container>

            {(images.length) ?
                <AutoPlaySwipeableViews
                    imagesData={images}
                    openInNewTab={true}>
                </AutoPlaySwipeableViews>
				:
				null}

            <Typography>
                {productInfo.Description}
            </Typography>

            <Typography>
                {productInfo.Описание}
            </Typography>

        </Container>
    )
}