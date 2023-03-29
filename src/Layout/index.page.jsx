import { Container } from '@mui/system';
import { Typography } from '@mui/material';
import { AutoPlaySwipeableViews } from '../components/Tools/AutoPlaySwipeableViews';
import { useEffect, useState, Fragment } from 'react';
import { fetchGetTopPageItems1C, getProductImageURL } from '../tools/fetch-other';

export const IndexPage = () => {
	const [topPageProducts, setTopPageProducts] = useState([])
	const [topPageCategories, setTopPageCategiries] = useState([])

	useEffect(() => {
		fetchGetTopPageItems1C()
			.then((topProducts) => topProducts.map((product) => {
				return {
					ID: product.Ref_Key,
					caption: product.Description,
					image: (product.ОсновноеИзображение) ? getProductImageURL(product.ОсновноеИзображение) : "/noimages.png",
					link: `/product/${product.Ref_Key}`
				}
			}))
			.then(setTopPageProducts);
	}, [])

	return (
		<Container>
				<Typography variant="h6">
					Вітаємо!!!
				</Typography>
				<Typography mt={1}>
					Перший, кращий, свій!
					«ВЕНА» - перший і найуспішніший гіпермаркет в Чернігівській області для будівництва, ремонту та облаштування житла.
					Історія компанії починається з відкриття магазину "Будматеріали" в 1997 році торговою площею 1500кв.м. Успішна робота невеликого магазину будівельних матеріалів дозволила відкрити в 2005 році гіпермаркет «Вена» площею 15000 кв м з асортиментом, який надає можливість кожному втілити мрію про комфорт і затишок власного будинку.
					У даний час гіпермаркет - це значно більше, ніж центр комплектації будівництва і ремонту. Це - магазин, у якому є все й для всіх: побутова хімія, косметика, товари для дітей, іграшки, одяг, господарські товари, продукти харчування, товари для відпочинку, товари для риболовлі, спортивні товари, товари для саду та городу, посуд, текстиль тощо.
				</Typography>
			
			{(topPageProducts.length) ?
				<Fragment>
				<Typography variant="h6" mt={1}>
					Найпопулярніші товари:
				</Typography>
				<AutoPlaySwipeableViews
					imagesData={topPageProducts}>
				</AutoPlaySwipeableViews>
				</Fragment>
				:
				null}
		</Container>
	);
}
