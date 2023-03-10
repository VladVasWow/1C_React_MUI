
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showMessage } from '../Slices/snackMessageSlice';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export const SearchAppBar = () => {
    const [searchText, setSearchText] = useState("");
    const dispatch = useDispatch();
    let navigate = useNavigate();

    const onChangeSearch = (event) => {
        setSearchText(event.target.value);
    }

    const onBlurSearch = (event) => {
        
        if (event.target.value.length < 4) {
            dispatch(showMessage({type : "warning", textMessage: `Давжина пошуку повинна бути довше 3 символів`}));
            return
        }

        console.log(event.target.value);
        navigate(`/products?find=${event.target.value}&page=1`)
        setSearchText("");
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Пошук…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchText}
                onChange={onChangeSearch}
                onBlur={onBlurSearch}
                onKeyDown={ event => event.key === 'Enter' && event.target.blur()}
            />
        </Search>
    );
}
