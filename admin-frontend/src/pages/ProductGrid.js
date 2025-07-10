// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Box } from '@mui/material'
// const ProductGrid = () => {
//     const [products, setProducts] = useState([]);

// const slug = "dairy-products"
//   useEffect(() => {
//     // Fetch products by category slug
//     axios
//       .get(`http://127.0.0.1:8000/products/category/${slug}`)
//       .then((res) =>{setProducts(res.data)
//         console.log("prodycts list", res.data)
//       })
//       .catch((err) => console.error("Error fetching products", err));
//   }, []);
//   return (
//     <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>

// {products.map((product) => {
//   const packagingType = product.attributes.find(
//     (attr) => attr.label === "Packaging Type"
//   )?.value;

//   return (
//     <div key={product._id}>
//       <img
//         src={`http://localhost:8000${product.thumbnail}`}
//         alt={product.name}
//         style={{ width: 100, height: 100 }}
//       />
//       <h2>{product.name}</h2>
//       <p>Brand: {product.brand}</p>
//       <p>MRP: ₹{product.mrp}</p>
//       <p>Customer Discount: {product.discounts.customer.discountPercent}%</p>
//       <p>Rating: {product.reviews.avgRating} ⭐</p>
//       <p>{product.description}</p>
//       <p>Category: {product.category} / {product.subCategory}</p>
//       <p><strong>Packaging Type:</strong> {packagingType}</p> {/* 👈 Added this line */}
//     </div>
//   );
// })}

//     </Box>

//   )
// }

// export default ProductGrid

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { Avatar, Rating } from "@mui/material";
import profilePic from "../assets/profilePicture.jpg";
import adImage from "../assets/advertizement.png";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
const GroupByPackagingType = () => {
  const [products, setProducts] = useState([]);
  const slug = "dairy-products";
  const [quantities, setQuantities] = useState({});

  const handleChangeQty = (productId, change) => {
    setQuantities((prev) => {
      const newQty = Math.max(0, (prev[productId] || 0) + change);
      return { ...prev, [productId]: newQty };
    });
  };
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/products/category/${slug}`)
      .then((res) => {
        setProducts(res.data);

        console.log("product list", res.data);
      })
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`http://127.0.0.1:8000/products/category/${slug}`)
  //     .then((res) => {
  //       setProducts(res.data);
  //       console.log("produxt list", res.data);
  //     })
  //     .catch((err) => console.error("Error fetching products", err));
  // }, []);
  const testimonials = [
    {
      name: "Rajesh Kogekar",
      location: "Gouri General Store, Kagal",
      feedback:
        "स्वस्त दरात चांगले उत्पाद आहे. नवीन त्यात उपलब्ध करून देत आहेत त्यामुळे खरेदीसाठी वापरायला योग्य आहे.",
      rating: 5,
      image: profilePic,
    },
    {
      name: "Sunita Patil",
      location: "Shree Mart, Ichalkaranji",
      feedback:
        "सेवा उत्कृष्ट आहे. वेळेवर डिलिव्हरी आणि उत्पादनांची गुणवत्ता अप्रतिम.",
      rating: 4,
      image: profilePic,
    },
    {
      name: "Ravi Pawar",
      location: "Ravi Traders, Jaysingpur",
      feedback: "ग्राहक सेवा खूप चांगली आहे. उत्पादन नेहमीच वेळेवर मिळते.",
      rating: 5,
      image: profilePic,
    },
    {
      name: "Sneha Jadhav",
      location: "Sneha Super Store, Sangli",
      feedback: "विश्वासार्ह आणि दर्जेदार सेवा. हमखास शिफारस करेन!",
      rating: 5,
      image: profilePic,
    },
  ];

  return (
    <Grid container spacing={2} p={2}>
      {/* Left Grid for Cards */}
      <Grid size={{ md: 8 }}>
        <Grid container spacing={2}>
          {products.map((product) => (
            <Grid size={{ md: 2 }} key={product._id}>
              <Card  elevation={4} sx={{ height: "100%", textAlign: "center",}}>
                <CardMedia
                  component="img"
                  height="100"
                  image={`http://127.0.0.1:8000/${product.thumbnail}`}
                  alt={product.name}
                  sx={{ objectFit: "contain", mt:1}}
                />
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {product.name}
                  </Typography>
                  <Typography>
                    {product.netWeight.value}
                    {product.netWeight.unit}
                  </Typography>
                  <Typography color="text.secondary">
                    ₹{product.defaultSellingPrice}/₹{product.mrp}
                  </Typography>
                  {/* <Typography fontSize={12}> Qty: {quantities[product._id] || product.minOrderQty}</Typography> */}
                  <Box
  mt={1}
  display="flex"
  alignItems="center"
  justifyContent="center"
>
  <IconButton
    onClick={() =>
      handleChangeQty(
        product._id,
        -1,
        product.minOrderQty
      )
    }
    size="small"
    disabled={(quantities[product._id] || product.minOrderQty) <= product.minOrderQty}
  >
    <RemoveIcon />
  </IconButton>

  <TextField
    size="small"
    type="number"
    value={quantities[product._id] || product.minOrderQty}
    inputProps={{
      min: product.minOrderQty,
    }}
    onChange={(e) => {
      const value = Math.max(Number(e.target.value), product.minOrderQty);
      setQuantities((prev) => ({ ...prev, [product._id]: value }));
    }}
    sx={{ width: 60, mx: 1 }}
  />

  <IconButton
    onClick={() =>
      handleChangeQty(
        product._id,
        1,
        product.minOrderQty
      )
    }
    size="small"
  >
    <AddIcon />
  </IconButton>
</Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      {/* Right Promo + Carousel */}
      <Grid size={{ md: 4 }}>
        <Box
          sx={{
            // borderRadius: 2,
            // boxShadow: 3,
            // backgroundColor: "#fff",
            overflow: "hidden",
          }}
        >
          {/* Promo Image */}
          <Box
            component="img"
            src={adImage}
            alt="Advertisement"
            sx={{
              width: "100%",
              objectFit: "cover",
              borderRadius: 2,
            
             
            }}
          />
          {/* Testimonials Carousel */}
          <Carousel autoPlay interval={4000} animation="slide" sx={{mt:2,border:'2px solid black' , borderRadius:5}}>
            {testimonials.map((t, i) => (
              <Card
                key={i}
                sx={{ p: 2, borderRadius: 5, textAlign: "left", boxShadow: 0 }}
              >
                <Box display="flex" alignItems="center" mb={1}>
                  <Avatar src={t.image} sx={{ mr: 2 }} />
                  <Box>
                    <Typography fontWeight="bold">{t.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {t.location}
                    </Typography>
                  </Box>
                </Box>
                <Rating value={t.rating} readOnly size="small" />
                <Typography variant="body2" mt={1}>
                  “{t.feedback}”
                </Typography>
              </Card>
            ))}
          </Carousel>
        </Box>
      </Grid>
    </Grid>
  );
};

export default GroupByPackagingType;
