import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

export  const ProductsPagination = (props) => {
    const {categoryID, page, count } = props.params;//useLocation();
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
            to={`/products/${categoryID}?page=${item.page}`}
            {...item}
          />
        )}
      />
    );
  }