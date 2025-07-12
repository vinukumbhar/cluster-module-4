// import { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   Typography,
//   Button,
//   IconButton,
//   TextField,
//   ButtonGroup,
// } from "@mui/material";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// //   TextField,
// } from "@mui/material";
// import Carousel from "react-material-ui-carousel";
// import { Avatar, Rating } from "@mui/material";
// import profilePic from "../assets/profilePicture.jpg";
// import adImage from "../assets/tak.png";
// import { useNavigate, useParams } from "react-router";
// import { useSearchParams  } from "react-router-dom";

// // const GroupByPackagingType = () => {
// //   const [products, setProducts] = useState([]);
// //   const slug = "dairy-products";
// //   const [quantities, setQuantities] = useState({});
// //   const navigate = useNavigate();
// //   const [dialogOpen, setDialogOpen] = useState(false);
// // const [templateName, setTemplateName] = useState("");

// //   useEffect(() => {
// //     axios
// //       .get(`http://127.0.0.1:8000/products/category/${slug}`)
// //       .then((res) => {
// //         setProducts(res.data);

// //         console.log("product list", res.data);
// //       })
// //       .catch((err) => console.error("Error fetching products", err));
// //   }, []);

// //   const testimonials = [
// //     {
// //       name: "Rajesh Kogekar",
// //       location: "Gouri General Store, Kagal",
// //       feedback:
// //         "स्वस्त दरात चांगले उत्पाद आहे. नवीन त्यात उपलब्ध करून देत आहेत त्यामुळे खरेदीसाठी वापरायला योग्य आहे.",
// //       rating: 5,
// //       image: profilePic,
// //     },
// //     {
// //       name: "Sunita Patil",
// //       location: "Shree Mart, Ichalkaranji",
// //       feedback:
// //         "सेवा उत्कृष्ट आहे. वेळेवर डिलिव्हरी आणि उत्पादनांची गुणवत्ता अप्रतिम.",
// //       rating: 4,
// //       image: profilePic,
// //     },
// //     {
// //       name: "Ravi Pawar",
// //       location: "Ravi Traders, Jaysingpur",
// //       feedback: "ग्राहक सेवा खूप चांगली आहे. उत्पादन नेहमीच वेळेवर मिळते.",
// //       rating: 5,
// //       image: profilePic,
// //     },
// //     {
// //       name: "Sneha Jadhav",
// //       location: "Sneha Super Store, Sangli",
// //       feedback: "विश्वासार्ह आणि दर्जेदार सेवा. हमखास शिफारस करेन!",
// //       rating: 5,
// //       image: profilePic,
// //     },
// //   ];

// //   return (
// //     <>
// //       <Typography
// //         variant="h6"
// //         sx={{
// //           backgroundColor: "primary.main",
// //           color: "white",
// //           p: 2,
// //           borderRadius: 10,
// //         }}
// //       >
// //         Dairy Products
// //       </Typography>

// //       <Grid container spacing={2} p={2} border={"1px solid red"}>
// //         {/* Left Grid for Cards */}
// //         <Grid size={{ md: 8 }}>
// //           <Grid container spacing={2}>
// //             {products.map((product) => (
// //               <Grid size={{ md: 2 }} key={product._id}>
// //                 <Card
// //                   elevation={4}
// //                   sx={{ height: "100%", textAlign: "center" }}
// //                 >
// //                   <CardMedia
// //                     component="img"
// //                     height="100"
// //                     image={`http://127.0.0.1:8000/${product.thumbnail}`}
// //                     alt={product.name}
// //                     sx={{ objectFit: "contain", mt: 1 }}
// //                   />
// //                   <CardContent>
// //                     <Typography variant="subtitle1" fontWeight="bold">
// //                       {product.name}
// //                     </Typography>
// //                     <Typography>
// //                       {product.netWeight.value}
// //                       {product.netWeight.unit}
// //                     </Typography>
// //                     <Typography color="text.secondary">
// //                       <strong>₹{product.defaultSellingPrice}</strong> /{" "}
// //                       <span
// //                         style={{ textDecoration: "line-through", opacity: 0.6 }}
// //                       >
// //                         ₹{product.mrp}
// //                       </span>
// //                     </Typography>

// //                     <Box
// //                       mt={1}
// //                       display="flex"
// //                       alignItems="center"
// //                       justifyContent="center"
// //                     >
// //                       <TextField
// //                         size="small"
// //                         type="number"
// //                         value={quantities[product._id] ?? 0} // Default to 0 if undefined
// //                         onChange={(e) => {
// //                           const value = Math.max(0, Number(e.target.value)); // Prevent negative numbers
// //                           setQuantities((prev) => ({
// //                             ...prev,
// //                             [product._id]: value,
// //                           }));
// //                         }}
// //                         sx={{ width: 80, mx: 1 }}
// //                       />
// //                     </Box>
// //                   </CardContent>
// //                 </Card>
// //               </Grid>
// //             ))}
// //           </Grid>
// //         </Grid>

// //         {/* Right Promo + Carousel */}
// //         <Grid size={{ md: 4 }}>
// //           <Box
// //             sx={{
// //               overflow: "hidden",
// //             }}
// //           >
// //             {/* Promo Image */}
// //             <Box
// //               component="img"
// //               src={adImage}
// //               alt="Advertisement"
// //               sx={{
// //                 width: "100%",
// //                 objectFit: "cover",
// //                 borderRadius: 2,
// //               }}
// //             />
// //             {/* Testimonials Carousel */}
// //             <Carousel
// //               autoPlay
// //               interval={4000}
// //               animation="slide"
// //               sx={{ mt: 2, border: "2px solid black", borderRadius: 5 }}
// //             >
// //               {testimonials.map((t, i) => (
// //                 <Card
// //                   key={i}
// //                   sx={{
// //                     p: 2,
// //                     borderRadius: 5,
// //                     textAlign: "left",
// //                     boxShadow: 0,
// //                   }}
// //                 >
// //                   <Box display="flex" alignItems="center" mb={1}>
// //                     <Avatar src={t.image} sx={{ mr: 2 }} />
// //                     <Box>
// //                       <Typography fontWeight="bold">{t.name}</Typography>
// //                       <Typography variant="body2" color="text.secondary">
// //                         {t.location}
// //                       </Typography>
// //                     </Box>
// //                   </Box>
// //                   <Rating value={t.rating} readOnly size="small" />
// //                   <Typography variant="body2" mt={1}>
// //                     “{t.feedback}”
// //                   </Typography>
// //                 </Card>
// //               ))}
// //             </Carousel>
// //           </Box>
// //         </Grid>
// //       </Grid>
// //       <Box display={"flex"} alignItems={"center"} gap={2}>
// //         {/* <Button variant="contained" color="primary">Save & Exit</Button> */}
// //       <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
// //   Save
// // </Button>

// //         <Button
// //           variant="outlined"
// //           color="primary"
// //           onClick={() => navigate("/home")}
// //         >
// //           Cancel
// //         </Button>
// //       </Box>

// //       <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
// //   <DialogTitle>Enter Template Name</DialogTitle>
// //   <DialogContent>
// //     <TextField
// //       autoFocus
// //       margin="dense"
// //       label="Template Name"
// //       fullWidth
// //       variant="outlined"
// //       value={templateName}
// //       onChange={(e) => setTemplateName(e.target.value)}
// //     />
// //   </DialogContent>
// //   <DialogActions>
// //     <Button onClick={() => setDialogOpen(false)} color="secondary">
// //       Cancel
// //     </Button>

// //     <Button
// //   onClick={async () => {
// //     const selectedProducts = products
// //       .filter((product) => quantities[product._id] > 0)
// //       .map((product) => ({
// //         productId: product._id,
// //         quantity: quantities[product._id],
// //         tentativePrice: product.defaultSellingPrice,
// //       }));

// //     const totalInvoiceValue = selectedProducts.reduce(
// //       (total, p) => total + p.quantity * p.tentativePrice,
// //       0
// //     );

// //     const orderTemplatePayload = {
// //       templateName,
// //       customer: {
// //         name: "Demo Customer", // replace with real values or input
// //         email: "demo@example.com",
// //         phone: "9876543210",
// //         address: "123 Market Street",
// //       },
// //       products: selectedProducts,
// //       totalInvoiceValue,
// //     };

// //     try {
// //       const res = await axios.post("http://127.0.0.1:8000/ordertemp/", orderTemplatePayload);
// //       console.log("Order template saved:", res.data);
// //       setDialogOpen(false);
// //       navigate("/template");
// //     } catch (err) {
// //       console.error("Error saving template:", err);
// //     }
// //   }}
// //   color="primary"
// //   variant="contained"
// // >
// //   Submit
// // </Button>

// //   </DialogActions>
// // </Dialog>

// //     </>
// //   );
// // };

// import { useSelector, useDispatch } from 'react-redux';
// import {
//   addOrUpdateProduct,
//   setTemplateName,
//   resetTemplate
// } from '../features/templateSlice'; // adjust path as needed
// const GroupByPackagingType = () => {
//   const [products, setProducts] = useState([]);
//   const {slug} = useParams()
//   // const slug = "dairy-products";
//   const [quantities, setQuantities] = useState({});
//   const navigate = useNavigate();
//   const [dialogOpen, setDialogOpen] = useState(false);
//   // const [templateName, setTemplateName] = useState("");

// const [searchParams] = useSearchParams();
// const templateId = searchParams.get("templateId");
// console.log("templateid",templateId)
//   const dispatch = useDispatch();
//   const selectedProducts = useSelector((state) => state.template.selectedProducts);
//   const templateName = useSelector((state) => state.template.templateName);
// // useEffect(() => {
// //   const fetchData = async () => {
// //     try {
// //       const res = await axios.get(`http://127.0.0.1:8000/products/category/${slug}`);
// //       const allProducts = res.data;

// //       if (templateId) {
// //         const templateRes = await axios.get(`http://127.0.0.1:8000/ordertemp/merged-products/${templateId}`);
// //         const template = templateRes.data;

// //         setTemplateName(template.templateName || "");

// //         // Create a map from productId to quantity
// //         const qtyMap = {};
// //         template.products.forEach((p) => {
// //           qtyMap[p.productId] = p.quantity;
// //         });

// //         setQuantities(qtyMap);
// //       }

// //       // Always use products from category
// //       setProducts(allProducts);
// //     } catch (err) {
// //       console.error("Error fetching product/template data", err);
// //     }
// //   };

// //   fetchData();
// // }, [templateId]);

// useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(`http://127.0.0.1:8000/products/category/${slug}`);
//         const allProducts = res.data;

//         if (templateId) {
//           const templateRes = await axios.get(`http://127.0.0.1:8000/ordertemp/merged-products/${templateId}`);
//           const template = templateRes.data;

//           dispatch(setTemplateName(template.templateName || ""));
//           template.products.forEach((p) => {
//             dispatch(addOrUpdateProduct({
//               productId: p.productId,
//               quantity: p.quantity,
//               tentativePrice: p.tentativePrice,
//             }));
//           });
//         }

//         setProducts(allProducts);
//       } catch (err) {
//         console.error("Error fetching data", err);
//       }
//     };

//     fetchData();
//   }, [templateId, slug, dispatch]);

//   const testimonials = [
//     {
//       name: "Rajesh Kogekar",
//       location: "Gouri General Store, Kagal",
//       feedback:
//         "स्वस्त दरात चांगले उत्पाद आहे. नवीन त्यात उपलब्ध करून देत आहेत त्यामुळे खरेदीसाठी वापरायला योग्य आहे.",
//       rating: 5,
//       image: profilePic,
//     },
//     {
//       name: "Sunita Patil",
//       location: "Shree Mart, Ichalkaranji",
//       feedback: "सेवा उत्कृष्ट आहे. वेळेवर डिलिव्हरी आणि उत्पादनांची गुणवत्ता अप्रतिम.",
//       rating: 4,
//       image: profilePic,
//     },
//     {
//       name: "Ravi Pawar",
//       location: "Ravi Traders, Jaysingpur",
//       feedback: "ग्राहक सेवा खूप चांगली आहे. उत्पादन नेहमीच वेळेवर मिळते.",
//       rating: 5,
//       image: profilePic,
//     },
//     {
//       name: "Sneha Jadhav",
//       location: "Sneha Super Store, Sangli",
//       feedback: "विश्वासार्ह आणि दर्जेदार सेवा. हमखास शिफारस करेन!",
//       rating: 5,
//       image: profilePic,
//     },
//   ];

//   return (
//     <>
//       <Typography
//         variant="h6"
//         sx={{
//           backgroundColor: "primary.main",
//           color: "white",
//           p: 2,
//           borderRadius: 2,
//         }}
//       >
//         Dairy Products
//       </Typography>

//       <Grid container spacing={2} p={2}>
//         <Grid size={{ md: 8 }}>
//           <Grid container spacing={2}>
//             {products.map((product) => (
//               <Grid size={{ md: 2 }} key={product._id}>
//                 <Card elevation={4} sx={{ height: "100%", textAlign: "center" }}>
//                   <CardMedia
//                     component="img"
//                     height="100"
//                     image={`http://127.0.0.1:8000/${product.thumbnail}`}
//                     alt={product.name}
//                     sx={{ objectFit: "contain", mt: 1 }}
//                   />
//                   <CardContent>
//                     <Typography variant="subtitle1" fontWeight="bold">
//                       {product.name}
//                     </Typography>
//                     <Typography>
//                       {product.netWeight?.value}
//                       {product.netWeight?.unit}
//                     </Typography>
//                     <Typography color="text.secondary">
//                       <strong>₹{product.defaultSellingPrice}</strong>{" "}
//                       / <span style={{ textDecoration: "line-through", opacity: 0.6 }}>
//                         ₹{product.mrp}
//                       </span>
//                     </Typography>

//                     <Box mt={1} display="flex" justifyContent="center">
//                       <TextField
//                         size="small"
//                         type="number"
//                         value={quantities[product._id] ?? 0}
//                         onChange={(e) => {
//                           const value = Math.max(0, Number(e.target.value));
//                           setQuantities((prev) => ({
//                             ...prev,
//                             [product._id]: value,
//                           }));
//                         }}
//                         sx={{ width: 80 }}
//                       />
//                     </Box>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         </Grid>

//         <Grid size={{ md: 4 }}>
//           <Box>
//             <Box
//               component="img"
//               src={adImage}
//               alt="Advertisement"
//               sx={{ width: "100%", objectFit: "cover", borderRadius: 2 }}
//             />
//             <Carousel
//               autoPlay
//               interval={4000}
//               animation="slide"
//               sx={{ mt: 2, border: "2px solid black", borderRadius: 5 }}
//             >
//               {testimonials.map((t, i) => (
//                 <Card key={i} sx={{ p: 2, borderRadius: 5, boxShadow: 0 }}>
//                   <Box display="flex" alignItems="center" mb={1}>
//                     <Avatar src={t.image} sx={{ mr: 2 }} />
//                     <Box>
//                       <Typography fontWeight="bold">{t.name}</Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {t.location}
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Rating value={t.rating} readOnly size="small" />
//                   <Typography variant="body2" mt={1}>
//                     “{t.feedback}”
//                   </Typography>
//                 </Card>
//               ))}
//             </Carousel>
//           </Box>
//         </Grid>
//       </Grid>

//       <Box mt={2} display="flex" alignItems="center" gap={2}>
//         <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
//           Save
//         </Button>
//         <Button variant="outlined" color="primary" onClick={() => navigate("/home")}>
//           Cancel
//         </Button>
//       </Box>

//       <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
//         <DialogTitle>Enter Template Name</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             margin="dense"
//             label="Template Name"
//             fullWidth
//             variant="outlined"
//             value={templateName}
//             onChange={(e) => dispatch(setTemplateName(e.target.value))}

//           />
//         </DialogContent>

//         <DialogActions>
//           <Button onClick={() => setDialogOpen(false)} color="secondary">
//             Cancel
//           </Button>
//           <Button
//             onClick={async () => {
//               const selectedArray = Object.values(selectedProducts);
//               const totalInvoiceValue = selectedArray.reduce(
//                 (total, p) => total + p.quantity * p.tentativePrice,
//                 0
//               );

//               const payload = {
//                 templateName,
//                 customer: {
//                   name: "Demo Customer",
//                   email: "demo@example.com",
//                   phone: "9876543210",
//                   address: "123 Market Street",
//                 },
//                 products: selectedArray,
//                 totalInvoiceValue,
//               };

//               try {
//                 if (templateId) {
//                   await axios.patch(`http://127.0.0.1:8000/ordertemp/${templateId}`, payload);
//                   console.log("Updated order template");
//                 } else {
//                   await axios.post("http://127.0.0.1:8000/ordertemp/", payload);
//                   console.log("Created new order template");
//                 }

//                 dispatch(resetTemplate());
//                 setDialogOpen(false);
//                 navigate("/template");
//               } catch (err) {
//                 console.error("Error saving template:", err);
//               }
//             }}
//             color="primary"
//             variant="contained"
//           >
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// };

// export default GroupByPackagingType;

import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  Avatar,
  Rating,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  addOrUpdateProduct,
  setTemplateName,
  resetTemplate,
} from "../features/templateSlice"; // adjust path

import adImage from "../assets/tak.png"; // adjust path
import profilePic from "../assets/profilePicture.jpg"; // adjust path

const GroupByPackagingType = () => {
  const [products, setProducts] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get("templateId");
const [originalProducts, setOriginalProducts] = useState([]);

  const dispatch = useDispatch();
  const selectedProducts = useSelector(
    (state) => state.template.selectedProducts
  );
  const templateName = useSelector((state) => state.template.templateName);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:8000/products/category/${slug}`
        );
        const allProducts = res.data;

        if (templateId) {
          const templateRes = await axios.get(
            `http://127.0.0.1:8000/ordertemp/merged-products/${templateId}`
          );
          const template = templateRes.data;

          dispatch(setTemplateName(template.templateName || ""));
            setOriginalProducts(template.products); 
          template.products.forEach((p) => {
            dispatch(
              addOrUpdateProduct({
                productId: p.productId,
                quantity: p.quantity,
                tentativePrice: p.tentativePrice,
              })
            );
          });
        }

        setProducts(allProducts);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, [templateId, slug, dispatch]);

  const testimonials = [
    {
      name: "Rajesh Kogekar",
      location: "Gouri General Store, Kagal",
      feedback: "स्वस्त दरात चांगले उत्पाद आहे...",
      rating: 5,
      image: profilePic,
    },
    {
      name: "Sunita Patil",
      location: "Shree Mart, Ichalkaranji",
      feedback: "सेवा उत्कृष्ट आहे...",
      rating: 4,
      image: profilePic,
    },
    {
      name: "Ravi Pawar",
      location: "Ravi Traders, Jaysingpur",
      feedback: "ग्राहक सेवा खूप चांगली आहे...",
      rating: 5,
      image: profilePic,
    },
    {
      name: "Sneha Jadhav",
      location: "Sneha Super Store, Sangli",
      feedback: "विश्वासार्ह आणि दर्जेदार सेवा...",
      rating: 5,
      image: profilePic,
    },
  ];

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          p: 2,
          borderRadius: 2,
        }}
      >
        {slug?.replace(/-/g, " ")?.toUpperCase()}
      </Typography>

      <Grid container spacing={2} p={2}>
        <Grid item md={8}>
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item md={2} key={product._id}>
                <Card
                  elevation={4}
                  sx={{ height: "100%", textAlign: "center" }}
                >
                  <CardMedia
                    component="img"
                    height="100"
                    image={`http://127.0.0.1:8000/${product.thumbnail}`}
                    alt={product.name}
                    sx={{ objectFit: "contain", mt: 1 }}
                  />
                  <CardContent>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {product.name}
                    </Typography>
                    <Typography>
                      {product.netWeight?.value}
                      {product.netWeight?.unit}
                    </Typography>
                    <Typography color="text.secondary">
                      <strong>₹{product.defaultSellingPrice}</strong> /{" "}
                      <span
                        style={{ textDecoration: "line-through", opacity: 0.6 }}
                      >
                        ₹{product.mrp}
                      </span>
                    </Typography>

                    <Box mt={1} display="flex" justifyContent="center">
                      <TextField
                        size="small"
                        type="number"
                        value={selectedProducts[product._id]?.quantity ?? 0}
                        onChange={(e) => {
                          const value = Math.max(0, Number(e.target.value));
                          dispatch(
                            addOrUpdateProduct({
                              productId: product._id,
                              quantity: value,
                              tentativePrice: product.defaultSellingPrice,
                            })
                          );
                        }}
                        sx={{ width: 80 }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        <Grid item md={4}>
          <Box>
            <Box
              component="img"
              src={adImage}
              alt="Advertisement"
              sx={{ width: "100%", objectFit: "cover", borderRadius: 2 }}
            />
            <Carousel
              autoPlay
              interval={4000}
              animation="slide"
              sx={{ mt: 2, border: "2px solid black", borderRadius: 5 }}
            >
              {testimonials.map((t, i) => (
                <Card key={i} sx={{ p: 2, borderRadius: 5, boxShadow: 0 }}>
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

      <Box mt={2} display="flex" alignItems="center" gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setDialogOpen(true)}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => navigate("/home")}
        >
          Cancel
        </Button>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Enter Template Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Template Name"
            fullWidth
            variant="outlined"
            value={templateName}
            onChange={(e) => dispatch(setTemplateName(e.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="secondary">
            Cancel
          </Button>
          {/* <Button
            onClick={async () => {
              const selectedArray = Object.values(selectedProducts);
              const totalInvoiceValue = selectedArray.reduce(
                (total, p) => total + p.quantity * p.tentativePrice,
                0
              );

              const payload = {
                templateName,
                customer: {
                  name: "Demo Customer",
                  email: "demo@example.com",
                  phone: "9876543210",
                  address: "123 Market Street",
                },
                products: selectedArray,
                totalInvoiceValue,
              };
              console.log("totalInvoiceValue", totalInvoiceValue);
              try {
                if (templateId) {
                  await axios.patch(
                    `http://127.0.0.1:8000/ordertemp/${templateId}`,
                    payload
                  );
                  console.log("Updated order template");
                } else {
                  await axios.post("http://127.0.0.1:8000/ordertemp/", payload);
                  console.log("Created new order template");
                }

                dispatch(resetTemplate());
                setDialogOpen(false);
                navigate("/template");
              } catch (err) {
                console.error("Error saving template:", err);
              }
            }}
            color="primary"
            variant="contained"
          >
            Submit
          </Button> */}
          {/* <Button
  onClick={async () => {
    const selectedArray = Object.values(selectedProducts).filter(
      (p) => p.quantity > 0 && p.tentativePrice !== undefined
    );

    const totalInvoiceValue = selectedArray.reduce(
      (total, p) => total + p.quantity * p.tentativePrice,
      0
    );

    if (!templateName || selectedArray.length === 0) {
      alert("Please enter a template name and select at least one product.");
      return;
    }

    const payload = {
      templateName,
      customer: {
        name: "Demo Customer",
        email: "demo@example.com",
        phone: "9876543210",
        address: "123 Market Street",
      },
      products: selectedArray,
      totalInvoiceValue,
    };

    try {
      if (templateId) {
        // UPDATE existing template
        await axios.patch(
          `http://127.0.0.1:8000/ordertemp/${templateId}`,
          payload
        );
        console.log("Updated order template");
      } else {
        // CREATE new template
        await axios.post("http://127.0.0.1:8000/ordertemp/", payload);
        console.log("Created new order template");
      }

      dispatch(resetTemplate());
      setDialogOpen(false);
      navigate("/template");
    } catch (err) {
      console.error("Error saving template:", err);
    }
  }}
  color="primary"
  variant="contained"
>
  Submit
</Button> */}

<Button
  onClick={async () => {
    const updatedMap = { ...selectedProducts };

    // Rebuild map from original products to preserve untouched ones
    originalProducts.forEach((p) => {
      if (!updatedMap[p.productId]) {
        updatedMap[p.productId] = {
          productId: p.productId,
          quantity: p.quantity,
          tentativePrice: p.tentativePrice,
        };
      }
    });

    const mergedArray = Object.values(updatedMap).filter(
      (p) => p.quantity > 0 && p.tentativePrice !== undefined
    );

    const totalInvoiceValue = mergedArray.reduce(
      (total, p) => total + p.quantity * p.tentativePrice,
      0
    );

    const payload = {
      templateName,
      customer: {
        name: "Demo Customer",
        email: "demo@example.com",
        phone: "9876543210",
        address: "123 Market Street",
      },
      products: mergedArray,
      totalInvoiceValue,
    };

    try {
      if (templateId) {
        await axios.patch(
          `http://127.0.0.1:8000/ordertemp/${templateId}`,
          payload
        );
        console.log("Updated order template");
      } else {
        await axios.post("http://127.0.0.1:8000/ordertemp/", payload);
        console.log("Created new order template");
      }

      dispatch(resetTemplate());
      setDialogOpen(false);
      navigate("/template");
    } catch (err) {
      console.error("Error saving template:", err);
    }
  }}
  color="primary"
  variant="contained"
>
  Submit
</Button>


        </DialogActions>
      </Dialog>
    </>
  );
};

export default GroupByPackagingType;
