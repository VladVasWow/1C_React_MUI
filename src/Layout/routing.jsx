import {createBrowserRouter} from 'react-router-dom'
import { Layout } from "./layout";
import { IndexPage } from "./index.page";
import { ProductsPage } from "./products.page";
import { AboutPage } from "./about.page";
import { ErrorPage } from './error.page';
import { ProductPage } from './product.page';
import { fetchProduct1CByID, fetchProductByID, fetchProducts, fetchProducts1C } from '../tools/fetch-product';
import { fetchCategoryByPerentID, fetchCatigories, fetchCatigories1CRootID} from '../tools/fetch-catigories';
import { СatigoriesРage } from './catigories.page';
import { OrderPage } from './order.page';

export const routing = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <IndexPage />,
        },        
        {
          path: "order/:orderID",
          element: <OrderPage />,
        },
        {
          path: "products/:categoryID/*",
          element: <ProductsPage />,
          loader: fetchProducts1C, // fetchProducts1C
        },
        {
          path: "products/*",
          element: <ProductsPage />,
          loader: fetchProducts1C, // fetchProducts1C
        },
        {
          path: "catigories/:categoryID",
          element: <СatigoriesРage/>,
          loader: fetchCatigories1CRootID,
        },
        // {
        //   path: "catigories",
        //   element: <ProductsPage />,
        //   loader: fetchCatigories,
        // },
        {
          path: "about",
          element: <AboutPage />,
        },
        {
          path: "product/:productID",
          element: <ProductPage/>,
          loader: fetchProduct1CByID,
        },        
      ],
    },
  ]);