import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  Tooltip,
  Button,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";
import bekariImage from "../assets/bekari-removebg-preview.png";
import dairyImage from "../assets/dairy-removebg-preview.png";
import namkinImage from "../assets/namkin-removebg-preview.png";
import hanumanImage from "../assets/hanuman-removebg-preview.png";
import cakeImage from "../assets/cake-removebg-preview.png";
import takImage from "../assets/tak.png";
import laddu from "../assets/ladu-removebg-preview.png";
import cowImage from "../assets/cows.png";
import profilePic from "../assets/profile 1.png";
import productData from "./productsData.json";

const imageMap = {
  bekariImage,
  dairyImage,
  namkinImage,
  hanumanImage,
  cakeImage,
  laddu,
};

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

const ceoMessages = [
  {
    heading1: "आदरणीय शेतकरी, विक्रेते आणि व्यवसायिक भागीदारांनो,",
    heading2: "तुमचं सहकार्य आणि विश्वास हीच आमची खरी ताकद आहे...",
    heading3: "आपल्या एकत्रित प्रयत्नांमुळे यलगुड ब्रँडची ओळख वाढत आहे...",
  },
  {
    heading1: "प्रत्येक यशामागे तुमचं प्रामाणिक योगदान आहे.",
    heading2: "आम्ही गुणवत्ता आणि विश्वास यावर विश्वास ठेवतो.",
    heading3: "आपल्या सहकार्यामुळेच आम्ही पुढे जात आहोत.",
  },
  {
    heading1: "यलगुड हे केवळ एक नाव नाही, तर एक ब्रँड आहे.",
    heading2: "आपण निर्माण केलेल्या विश्वासावर आमचा प्रवास आधारित आहे.",
    heading3: "आपल्यासह एक उज्ज्वल भविष्यासाठी प्रयत्नशील.",
  },
  {
    heading1: "आपल्या विश्वासाचे आम्ही ऋणी आहोत.",
    heading2: "नवीन तंत्रज्ञानासह दर्जेदार सेवा देण्याचा आमचा संकल्प आहे.",
    heading3: "यलगुडचे यश म्हणजे आपल्या सहकार्याचे फळ आहे.",
  },
];

export default function ProductsGrid() {
  const rows = [];
  for (let i = 0; i < productData.length; i += 2) {
    rows.push(productData.slice(i, i + 2));
  }

  const navigate = useNavigate();
  const { templateId } = useParams(); // Detect edit mode
  console.log("home",templateId)
  return (
    <>
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }} sx={{ p: 1 }}>
          {rows.map((row, rowIndex) => (
            <Grid container spacing={2} key={rowIndex}>
              {row.map((product, index) => (
                <Grid
                  size={{ xs: 12, md: 6 }}
                  key={index}
                  sx={{ flexWrap: "wrap" }}
                >
                  <Card
                    // onClick={() => navigate(product.route)}
                    onClick={() => navigate(`${product.route}/${product.slug}?templateId=${templateId}`)}

                    sx={{
                      backgroundColor: "primary.main",
                      borderRadius: "20px",
                      textAlign: "center",
                      fontWeight: "600",
                      py: 0.2,
                      m: 1,
                      mx: 1,
                      fontSize: "17px",
                      cursor: "pointer",
                    }}
                  >
                    {product.title}
                  </Card>

                  <Card
                    sx={{
                      p: 2,
                      borderRadius: 5,
                      boxShadow: 3,

                      display: "flex",
                      alignItems: "center",
                      minHeight: 200,
                    }}
                  >
                    <Box
                      component="img"
                      src={imageMap[product.image]}
                      alt={product.alt}
                      sx={{
                        width: 100,
                        height: 75,
                        borderRadius: 2,
                        objectFit: "cover",
                        mr: 2,
                      }}
                    />

                    <CardContent sx={{ p: 0 }}>
                      <Typography
                        variant="body2"
                        component="p"
                        fontWeight="700"
                      >
                        {product.category} {product.categoryMarathi}
                      </Typography>

                      <Tooltip
                        title={product.products}
                        sx={{ cursor: "pointer" }}
                        placement="right-start"
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                          fontWeight="700"
                        >
                          {product.products.split(",").slice(0, 5).join(", ") +
                            "..."}
                        </Typography>
                      </Tooltip>

                      <Tooltip
                        title={product.productsMarathi}
                        sx={{ cursor: "pointer" }}
                        placement="right-start"
                      >
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                          fontWeight="700"
                        >
                          {product.productsMarathi
                            .split(",")
                            .slice(0, 5)
                            .join(", ") + "..."}
                        </Typography>
                      </Tooltip>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ))}
        </Grid>

        <Grid size={{ xs: 12, md: 4 }} sx={{ p: 1 }}>
          <Box
            component="img"
            src={takImage}
            alt="Advertisement"
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: 2,
              boxShadow: 3,
              // objectFit: "cover",
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2} width={"100%"} sx={{ p: 1 }}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Carousel
            autoPlay
            interval={4000}
            animation="slide"
            duration={600}
            indicators={true}
            navButtonsAlwaysInvisible
            swipe={true}
            stopAutoPlayOnHover={false}
          >
            {ceoMessages.map((msg, i) => (
              <Box
                key={i}
                sx={{
                  bgcolor: "#9bd2f9",
                  p: 3,
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              >
                <Typography fontWeight={700} mb={1}>
                  {msg.heading1}
                </Typography>
                <Typography fontWeight={700} mb={1}>
                  {msg.heading2}
                </Typography>
                <Typography fontWeight={700} mb={2}>
                  {msg.heading3}
                </Typography>

                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box
                    component="img"
                    src={cowImage}
                    alt="cows"
                    sx={{ width: 200 }}
                  />
                  <Box textAlign="right" fontWeight="bold">
                    आपला,
                    <br />
                    मुख्य कार्यकारी अधिकारी (CEO)
                    <br />
                    यलगुड
                  </Box>
                </Box>
              </Box>
            ))}
          </Carousel>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Carousel
            autoPlay
            interval={3000}
            animation="slide"
            duration={500}
            indicators={true}
            navButtonsAlwaysVisible={false}
            swipe={true}
            stopAutoPlayOnHover={false}
          >
            {testimonials.map((t, i) => (
              <Card
                key={i}
                sx={{
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 2,
                  minHeight: 220,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
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
        </Grid>
      </Grid>

     
    </>
  );
}
