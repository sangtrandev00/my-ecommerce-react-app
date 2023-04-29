
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect, useState } from 'react';
import productApi from '../../api/productApi';

import PropTypes from 'prop-types';

SearchInput.propTypes = {
    onChange: PropTypes.func
};

export default function SearchInput(props) {

    // CAll API here ?

    const [productList, setProductList] = useState([])

    useEffect(() => {
        ( async () => {

            let products = await productApi.getAll({_page: 1, _limit: 500});
            products = products.data.map((product) => {
                return ({
                    title: product.name,
                })
            })

            setProductList(products);
        }) ()
    }, [])

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
    
      <Autocomplete
        onChange={props.onChange}
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={productList.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tìm kiếm sản phẩm"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
    </Stack>
  );
}
