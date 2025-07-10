import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography ,Box} from "@mui/material";
import ProductCard from "./ProductCard";

export default function MainGrid() {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   // Replace with your API endpoint
  //   axios.get("http://127.0.0.1:8000/products/category/dairy-products")
  //     .then((res) => setProducts(res.data))
  //     .catch((err) => console.error("Error fetching products", err));
  // }, []);
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
       <div>
     
      <Grid container spacing={2} justifyContent="flex-start">
        {/* {products.map((product) => (
          <Grid item key={product._id}>
            <ProductCard product={product} />
          </Grid>
        ))} */}
         <ProductCard />
      </Grid>
    </div>
    </Box>
  );
}
