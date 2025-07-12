// import React, { useEffect, useState } from 'react';
// import { useParams } from "react-router-dom";
// import axios from 'axios';
// import { Box, Typography, Avatar } from '@mui/material';

// const ProductDetails = () => {
//   const { _id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://127.0.0.1:8000/products/${_id}`)
//       .then((res) => {
//         setProduct(res.data);
//         console.log("Product fetched:", res.data);
//       })
//       .catch((err) => console.error("Error fetching product", err));
//   }, [_id]);

//   if (!product) {
//     return <Typography>Loading...</Typography>;
//   }

//   return (
//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>{product.name}</Typography>

//     </Box>
//   );
// };

// export default ProductDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Avatar,
  Tabs,
  Tab,
  Paper,
  Stack,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavLink, Link, Outlet } from "react-router-dom";
const ProductDetails = () => {
  const { _id } = useParams();
  const [product, setProduct] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/products/${_id}`)
      .then((res) => {
        setProduct(res.data.product);
        console.log("Product fetched:", res.data.product);
      })
      .catch((err) => console.error("Error fetching product", err));
  }, [_id]);

  if (!product) return <Typography sx={{ p: 2 }}>Loading...</Typography>;

  return (
    <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Link to="/insights">
          {" "}
          <ArrowBackIcon />
        </Link>

        <Typography variant="h5">{product.name}</Typography>
      </Box>

      <Tabs
        value={tabIndex}
        onChange={(e, newValue) => setTabIndex(newValue)}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="Basic Info" />
        <Tab label="Category" />
        <Tab label="Pricing" />
        <Tab label="Discount Settings" />
        <Tab label="Nutrition Facts" />
        <Tab label="Storage Information" />
        <Tab label="Multimedia"/>
      </Tabs>

      <Box sx={{ p: 2 }}>
        {tabIndex === 0 && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Box>
              <Avatar
                variant="square"
                src={`http://127.0.0.1:8000/${product.thumbnail}`}
                alt={product.name}
                sx={{ width: 30, height: 30 }}
              />
            </Box>
            <Box>
              {" "}
              <Typography>
                <strong>Product Code:</strong> {product.productCode}
              </Typography>
              <Typography>
                <strong>Description:</strong> {product.description}
              </Typography>
              <Typography>
                <strong>Keywords:</strong> {product.keywords?.join(", ") || "—"}
              </Typography>
            </Box>
          </Box>
        )}

        {tabIndex === 1 && (
          <>
            <Typography>
              <strong>Brand:</strong> {product.brand}
            </Typography>
            <Typography>
              <strong>Category:</strong> {product.category}
            </Typography>
            <Typography>
              <strong>Subcategory:</strong> {product.subCategory}
            </Typography>
          </>
        )}

        {tabIndex === 2 && (
          <>
            <Typography>
              <strong>MRP:</strong> ₹{product.mrp}
            </Typography>
            <Typography>
              <strong>Default Selling Price:</strong> ₹
              {product.defaultSellingPrice}
            </Typography>
            <Typography>
              <strong>GST Rate:</strong> {product.gstRate}%
            </Typography>
            <Typography>
              <strong>Min Order Qty:</strong> {product.minOrderQty}
            </Typography>
            <Typography>
              <strong>Max Order Qty:</strong> {product.maxOrderQty}
            </Typography>
          </>
        )}

        {tabIndex === 3 && (
          <>
            {["customer", "wholeseller", "dealer"].map((role) => (
              <Box key={role} sx={{ mb: 1 }}>
                <Typography variant="subtitle1">
                  {role.charAt(0).toUpperCase() + role.slice(1)}:
                </Typography>
                <Typography>
                  <strong>Discount %:</strong>{" "}
                  {product.discounts?.[role]?.discountPercent || 0}
                </Typography>
                <Typography>
                  <strong>Max Discount Limit:</strong>{" "}
                  {product.discounts?.[role]?.maxDiscountLimit || 0}
                </Typography>
              </Box>
            ))}
          </>
        )}

        {tabIndex === 4 && (
          <>
            {product.nutritionFacts ? (
              Object.entries(product.nutritionFacts).map(([key, value]) => (
                <Typography key={key}>
                  <strong>{key}:</strong> {value}
                </Typography>
              ))
            ) : (
              <Typography>No nutrition facts available.</Typography>
            )}
          </>
        )}

        {tabIndex === 5 && (
          <>
            <Typography>
              <strong>Shelf Life:</strong> {product.shelfLife || "N/A"}
            </Typography>
            <Typography>
              <strong>Storage:</strong> {product.storageInstructions || "N/A"}
            </Typography>
          </>
        )}
        {tabIndex === 6 && (
  <>
    <Box sx={{ mb: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Upload Images/Videos
      </Typography>
      <input
        type="file"
        multiple
        accept="image/*,video/mp4"
        onChange={async (e) => {
          const files = e.target.files;
          if (!files.length) return;

          const formData = new FormData();
          for (let i = 0; i < files.length; i++) {
            formData.append("media", files[i]);
          }

          try {
            await axios.post(
              `http://127.0.0.1:8000/products/${_id}/gallery`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );

            // Refresh product data to show updated gallery
            const res = await axios.get(`http://127.0.0.1:8000/products/${_id}`);
            setProduct(res.data.product);
          } catch (err) {
            console.error("Upload failed:", err);
          }
        }}
      />
    </Box>

    <Typography variant="h6" sx={{ mb: 1 }}>
      Gallery
    </Typography>

    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      {product.gallery?.length > 0 ? (
        product.gallery.map((media, index) => (
          <Box key={index} sx={{ width: 200 }}>
            {media.type === "image" ? (
              <img
                src={`http://127.0.0.1:8000${media.url}`}
                alt={`media-${index}`}
                style={{ width: "100%", borderRadius: 4 }}
              />
            ) : (
              <video
                src={`http://127.0.0.1:8000${media.url}`}
                controls
                style={{ width: "100%", borderRadius: 4 }}
              />
            )}
          </Box>
        ))
      ) : (
        <Typography>No media uploaded.</Typography>
      )}
    </Box>
  </>
)}

      </Box>
    </Box>
  );
};

export default ProductDetails;
