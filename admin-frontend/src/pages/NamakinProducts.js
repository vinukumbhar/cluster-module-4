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
const slug = "namkeen-products"
  useEffect(() => {
    // Fetch products by category slug
    axios
      .get(`http://127.0.0.1:8000/products/category/${slug}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Typography variant="h5" sx={{ m: 2 }}>
        Products - Namkeen Category
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
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <Avatar
                  variant="square"
                  src={product.thumbnail}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;