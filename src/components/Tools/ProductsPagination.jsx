import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { fetchCountProducts1C } from '../../tools/fetch-product';
import { useEffect } from 'react';

export const ProductsPagination = (props) => {
    const { categoryID, page, count, setCount, find } = props;//useLocation();

    useEffect(() => {
        if (setCount) {
            fetchCountProducts1C(categoryID, find)
                .then(setCount);
        }
    }, [categoryID, find])
    // console.log("----")
    // console.log(useLocation());
    // console.log(props);
    return (
        <Pagination
            page={parseInt(page)}
            count={count}
            color="primary"
            renderItem={(item) => (
                <PaginationItem
                    component={Link}
                    to={`/products${(categoryID) ? "/" + categoryID : ""}?page=${item.page}${(find) ? "&find=" + find : ""}`}
                    {...item}
                />
            )}
        />
    );
}