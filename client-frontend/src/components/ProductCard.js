// import React from "react";
// import { Card, CardMedia, CardContent, Typography, Box } from "@mui/material";

// const ProductCard = ({ product }) => {
//   return (
//     <Card sx={{ maxWidth: 300, m: 2, borderRadius: 3, boxShadow: 3 }}>
//       <CardMedia
//         component="img"
//         height="180"
//         image={product.thumbnail}
//         alt={product.name}
//         sx={{ objectFit: "cover" }}
//       />
//       <CardContent>
//         <Typography variant="h6" component="div" noWrap>
//           {product.name}
//         </Typography>
//         {/* <Typography variant="body2" color="text.secondary">
//           Brand: {product.brand || "N/A"}
//         </Typography> */}
//         {/* <Typography variant="body2" color="text.secondary">
//           Category: {product.category}
//         </Typography> */}
//         <Box sx={{ mt: 1 }}>
//           <Typography variant="subtitle2" color="text.primary">
//             ₹{product.defaultSellingPrice} &nbsp;
//             <Typography component="span" variant="body2" sx={{ textDecoration: "line-through", color: "gray" }}>
//               ₹{product.mrp}
//             </Typography>
//           </Typography>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductCard;

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
const BASE_URL = "http://127.0.0.1:8000";
  useEffect(() => {
    // Fetch products by category slug
    axios
      .get("http://127.0.0.1:8000/products/")
      .then((res) => {setProducts(res.data.products)
        console.log("prodyuct data", res.data.products)
      })
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ m: 2 }}>
        Products - Dairy Category
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Thumbnail</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>MRP (₹)</TableCell>
            <TableCell>Selling Price (₹)</TableCell>
            <TableCell>GST (%)</TableCell>
            <TableCell>Min Order Qty</TableCell>
            <TableCell>Max Order Qty</TableCell>
              <TableCell>Packaging Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <Avatar
                  variant="square"
                 src={`${BASE_URL}${product.thumbnail}`}
                  alt={product.name}
                  sx={{ width: 56, height: 56 }}
                />
              </TableCell>
              <TableCell>
                {" "}
                <Link
                  to={`/productdetails/${product._id}`}
                  style={{ textDecoration: "none", color: "#3f51b5" }}
                >
                  {product.name}{" "}
                </Link>
              </TableCell>
              <TableCell>{product.brand || "—"}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.mrp}</TableCell>
              <TableCell>{product.defaultSellingPrice}</TableCell>
              <TableCell>{product.gstRate}%</TableCell>
              <TableCell>{product.minOrderQty}</TableCell>
              <TableCell>{product.maxOrderQty}</TableCell>
              <TableCell>{product.packingType}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
