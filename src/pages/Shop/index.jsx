import { Box, Container, Grid, Skeleton, Tab } from "@mui/material";
import Breadcrumb from "../../components/Breadcrumb";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import productApi from "../../api/productApi";
import categoryApi from "../../api/categoryApi";
import { Link} from "react-router-dom";
import SearchInput from "../../components/SearchInput";

import PropTypes from 'prop-types';

export default function ShopPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 120
  });

  const [filters, setFilters] = useState(
    {
      _page: 1,
      _limit: 12
    }
  )

  // const [searchParams, setSearchParams] = useSearchParams(location.href);

  useEffect(() => {
    // Fetch product data
    const fetchData = async () => {

      try {
        let products = await productApi.getAll(filters);
        const {data, pagination} = products;
        setProductList(data);
        setPagination(pagination);

        console.log("result: ",{data, pagination});
      } catch (error) {
          console.log("failed to fetch product data: ", error);
      }
      // const filterProducts = data.filter((product) => product.thumbnail != null);
      setIsLoading(false);
    }

    fetchData();
  }, [filters])


  // Fetch categories data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      let categories = await categoryApi.getAll();
      setCategoryList(categories);
      setIsLoading(false);
    }
    fetchData();
  }, [])

  const handlePagination = (pageValue) => {
    setIsLoading(true);
    setFilters({
      ...filters,
      _page: pageValue
    })
    setIsLoading(false);
  }

  const cateFilterHandler = (e) => {
    e.preventDefault();
    const categoryId = e.target.getAttribute("data-id");

    setFilters((prevFilters) => {
      return {
        ...prevFilters,
        "category.id": categoryId 
      }
    })
    
  }

  const tabChangeHandler = (sortValue) => {
    let filters = "";
    if(sortValue === "pricedesc") {
      filters = "salePrice:desc";
    }else if(sortValue === "priceasc") {
      filters = "salePrice:asc";
    }else if(sortValue === "new") {
      filters = "created_at:desc";
    }
      setFilters((prevFilters) => {
        return {
          ...prevFilters,
          _sort: filters
        }
      })
  }

  const handleSearchInput = (event, searchValue) => {

    if(searchValue === "") return;

    setFilters((prevFilters) => {
      return (
        {
          ...prevFilters,
          name_contains : searchValue
        }
      )
    })

  }

  return (
    <div className="">
      <Container maxWidth="lg">
        <Breadcrumb/>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            {/* Sidebar */}
           <div className="w-full">
            <SearchInput onChange={handleSearchInput} />
           </div>
           <div className="menu-list category-list bg-slate-100 p-3 shadow-xl mt-3">
            <h3 className="category-title font-bold">
              Danh mục sản phẩm
            </h3>
            <ul className="">
              {categoryList.map((item) => {
                return (
                  <li key={item.id}  className="mt-2"><Link data-id={item.id} onClick={cateFilterHandler} to={`${item.id}`}>{item.name}</Link></li>
                );
              })}
              </ul>
           </div>
          </Grid>
          <Grid item xs={9}>
            <div className="product-list shadow-2xl p-3 bg-slate-100">
              <p className="product-list__show-result">Kết quả tìm kiếm cho `sách hay`</p>
              <div className="product-list__tabs-section">
                <LabTabs onTabChange={tabChangeHandler}/>
                {isLoading ? <SkeletonProductList/>
                
                :<ProductList pagination={pagination} onPaginate={handlePagination} productListData = {productList}/> }
              </div>
              
            </div>
          </Grid>
        </Grid>
      </Container>

    </div>
  )
}

LabTabs.propsTypes = {
  onTabChange: PropTypes.func.isRequired
}

export function LabTabs(props) {
  
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.onTabChange(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            {/* <Tab label="Phổ biến" value="popular" />
            <Tab label="Bán chạy" value="bestsellers" /> */}
            <Tab label="Hàng mới" value="new" />
            <Tab label="Giá cao đến thấp" value="pricedesc" />
            <Tab label="Giá thấp đến cao" value="priceasc" />
          </TabList>
        </Box>
        {/* <TabPanel value="popular">Phổ biến</TabPanel>
        <TabPanel value="bestsellers">Bán chạy</TabPanel> */}
        <TabPanel value="new">Hàng mới</TabPanel>
        <TabPanel value="pricedesc">Giá cao đến thấp</TabPanel>
        <TabPanel value="priceasc">Giá thấp đến cao</TabPanel>
      </TabContext>
    </Box>
  );
}

export const SkeletonProductList = () => {
  return (
     <>
       <Grid  container spacing={1} className="">
     {Array.from(new Array(12)).map((itemValue) => {
          return (
            <Grid className="p-3" key={itemValue} item xs={3} >
              <Skeleton variant="rectangular" width={210} height={118} />
              <Skeleton />
              <Skeleton width="60%" />
              </Grid>
          )
        })}
        </Grid>
      
     </>

  )
}