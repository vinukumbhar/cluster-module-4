import {
  Typography,
  Box,
  Grid,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import React, { useState } from "react";

import PropTypes from "prop-types";
import MenuButton from "./MenuButton";
import Drawer, { drawerClasses } from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
function SecondSidebar({ open, toggleDrawer }) {
  const [form, setForm] = useState({
    productCode: "",
    name: "",
    slug: "",
    brand: "",
    category: "",
    subCategory: "",
    categorySlug: "",
    barcode: "",
    mrp: "",
    defaultSellingPrice: "",
    gstRate: "",
    discounts: {},
    shelfLife: "",
    storageInstructions: "",
    packingType: "",
    flavor: "",
    netWeight: {},
    seo: {},
    description: "",
    minOrderQty: 1,
    maxOrderQty: 1000,
    nutritionFacts: {},
    keywords: [],
    tags: [],
    displaySettings: {
   
  },
  });

  const [thumbnail, setThumbnail] = useState(null);
  const addKeyword = () => {
    setForm({ ...form, keywords: [...form.keywords, ""] });
  };

  const removeKeyword = (index) => {
    const updated = form.keywords.filter((_, i) => i !== index);
    setForm({ ...form, keywords: updated });
  };
  const handleKeywordChange = (index, value) => {
    const updated = [...form.keywords];
    updated[index] = value;
    setForm({ ...form, keywords: updated });
  };
  const addTags = () => {
    setForm({ ...form, tags: [...form.tags, ""] });
  };

  const removeTags = (index) => {
    const updated = form.tags.filter((_, i) => i !== index);
    setForm({ ...form, tags: updated });
  };
  const handleTagChange = (index, value) => {
    const updated = [...form.tags];
    updated[index] = value;
    setForm({ ...form, tags: updated });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleNutritionChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      nutritionFacts: {
        ...prevForm.nutritionFacts,
        [name]: value,
      },
    }));
  };
  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    // Append all scalar fields
    fd.append("productCode", form.productCode);
    fd.append("name", form.name);
    fd.append("slug", form.slug);
    fd.append("brand", form.brand);
    fd.append("category", form.category);
    fd.append("subCategory", form.subCategory);
    fd.append("categorySlug", form.categorySlug);
    fd.append("barcode", form.barcode);
    fd.append("mrp", form.mrp);
    fd.append("defaultSellingPrice", form.defaultSellingPrice);
    fd.append("gstRate", form.gstRate);
    fd.append("shelfLife", form.shelfLife);
    fd.append("storageInstructions", form.storageInstructions);
    fd.append("packingType", form.packingType);
    fd.append("flavor", form.flavor);
    fd.append("description", form.description);
    fd.append("minOrderQty", form.minOrderQty);
    fd.append("maxOrderQty", form.maxOrderQty);
    fd.append("tags", form.tags);
        fd.append("keywords", form.keywords);
    // ✅ Append nested fields as stringified JSON
    const discounts = {
      customer: {
        discountPercent: Number(form.discountCustomer),
        maxDiscountLimit: Number(form.maxDiscountCustomer),
      },
      dealer: {
        discountPercent: Number(form.discountDealer),
        maxDiscountLimit: Number(form.maxDiscountDealer),
      },
      wholeseller: {
        discountPercent: Number(form.discountWholeseller),
        maxDiscountLimit: Number(form.maxDiscountWholeseller),
      },
    };
    fd.append("discounts", JSON.stringify(discounts));
    fd.append("nutritionFacts", JSON.stringify(form.nutritionFacts));
    fd.append(
      "netWeight",
      JSON.stringify({
        value: form.netWeightValue,
        unit: form.netWeightUnit,
      })
    );
    fd.append(
      "seo",
      JSON.stringify({
        title: form.title,
        metaDescription: form.metaDescription,
      })
    );

    // displaySettings
    fd.append(
      "displaySettings",
      JSON.stringify({
        showOnHome: form.displaySettings.showOnHome,
        homeSection: form.displaySettings.homeSection,
        priority: form.displaySettings.priority,
      })
    );
    // ✅ Thumbnail file
    if (thumbnail) {
      fd.append("thumbnail", thumbnail);
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/products/", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product created!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Error creating product.");
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={toggleDrawer(false)}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        [`& .${drawerClasses.paper}`]: {
          width: "50vw", // This sets the width to 50% of the viewport width
          minWidth: 300, // Keep your minimum width
          backgroundImage: "none",
          backgroundColor: "background.paper",
          overflow: "auto", // Add scrolling if content is too long
        },
      }}
    >
      <Box p={3}>
        <Typography variant="h5" gutterBottom>
          Create New Product
        </Typography>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={2}>
            <Grid size={{ md: 6 }}>
              <TextField
                label="Product Code"
                fullWidth
                name="productCode"
                value={form.productCode}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid size={{ md: 6 }} >
              <TextField
                label="Name"
                fullWidth
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid size={{ md: 6 }}>
              <TextField
                label="Slug"
                fullWidth
                name="slug"
                value={form.slug}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid size={{ md: 6 }}>
              <TextField
                label="Brand"
                fullWidth
                name="brand"
                value={form.brand}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ md: 6 }}>
              <TextField
                label="Category"
                fullWidth
                name="category"
                value={form.category}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ md: 6 }}>
              <TextField
                label="Sub Category"
                fullWidth
                name="subCategory"
                value={form.subCategory}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ md: 6 }}>
              <TextField
                label="Category Slug"
                fullWidth
                name="categorySlug"
                value={form.categorySlug}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid size={{ md: 6 }}>
              <TextField
                label="Barcode"
                fullWidth
                name="barcode"
                value={form.barcode}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ md: 6 }}>
              <TextField
                type="number"
                label="MRP"
                fullWidth
                name="mrp"
                value={form.mrp}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ md: 6 }}>
              <TextField
                type="number"
                label="Default Selling Price"
                fullWidth
                name="defaultSellingPrice"
                value={form.defaultSellingPrice}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ md: 6 }}>
              <TextField
                type="number"
                label="GST Rate (%)"
                fullWidth
                name="gstRate"
                value={form.gstRate}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ md: 6 }}>
              <InputLabel>Thumbnail</InputLabel>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
              />
            </Grid>

            <Grid size={{ md: 12 }}>
              <Typography variant="h6">Discounts</Typography>
            </Grid>
            <Grid size={{ md: 6 }}>
              <TextField
                type="number"
                label="Customer %"
                name="discountCustomer"
                fullWidth
                value={form.discountCustomer}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ md: 6 }}>
              <TextField
                type="number"
                label="Max Discount (Customer)"
                name="maxDiscountCustomer"
                fullWidth
                value={form.maxDiscountCustomer}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ md: 6 }}>
              <TextField
                type="number"
                label="Dealer %"
                name="discountDealer"
                fullWidth
                value={form.discountDealer}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ md: 6 }}>
              <TextField
                type="number"
                label="Max Discount (Dealer)"
                fullWidth
                name="maxDiscountDealer"
                value={form.maxDiscountDealer}
                onChange={handleChange}
              />
            </Grid>
             <Grid size={{ md: 6 }}>
              <TextField
                type="number"
                label="Wholeseller %"
                fullWidth
                name="discountWholeseller"
                value={form.discountWholeseller}
                onChange={handleChange}
              />
            </Grid>
   <Grid size={{ md: 6 }}>
              <TextField
                type="number"
                label="Max Discount (Wholeseller)"
                name="maxDiscountWholeseller"
                fullWidth
                value={form.maxDiscountWholeseller}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ md: 12 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Keywords
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={addKeyword}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Box>
              {form.keywords.map((keyword, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label={`Keyword ${index + 1}`}
                    value={keyword}
                    onChange={(e) => handleKeywordChange(index, e.target.value)}
                  />
                  <IconButton
                    color="error"
                    onClick={() => removeKeyword(index)}
                    disabled={form.keywords.length === 1}
                    size="small"
                  >
                    <RemoveIcon />
                  </IconButton>
                </Box>
              ))}
            </Grid>
            <Grid size={{ md: 12 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                  Tags
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={addTags}
                  startIcon={<AddIcon />}
                >
                  Add
                </Button>
              </Box>
              {form.tags.map((tag, index) => (
                <Box key={index} sx={{ display: "flex", gap: 1, mb: 1 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label={`tag ${index + 1}`}
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                  />
                  <IconButton
                    color="error"
                    onClick={() => removeTags(index)}
                    disabled={form.tags.length === 1}
                    size="small"
                  >
                    <RemoveIcon />
                  </IconButton>
                </Box>
              ))}
            </Grid>

            <Grid size={{ md: 6 }}>
              <TextField
                label="Flavor"
                name="flavor"
                fullWidth
                value={form.flavor}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Packing Type</InputLabel>
                <Select
                  name="packingType"
                  value={form.packingType}
                  label="Packing Type"
                  onChange={handleChange}
                >
                  <MenuItem value="Bottle">Bottle</MenuItem>
                  <MenuItem value="Box">Box</MenuItem>
                  <MenuItem value="Pouch">Pouch</MenuItem>
                  <MenuItem value="Container">Container</MenuItem>
                  <MenuItem value="Polypack">Polypack</MenuItem>
                  <MenuItem value="Packet">Packet</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ md: 6 }}>
              <TextField
                label="Net Weight"
                name="netWeightValue"
                type="number"
                fullWidth
                value={form.netWeightValue}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Unit</InputLabel>
                <Select
                  name="netWeightUnit"
                  value={form.netWeightUnit}
                  onChange={handleChange}
                >
                  <MenuItem value="g">g</MenuItem>
                  <MenuItem value="kg">kg</MenuItem>
                  <MenuItem value="ml">ml</MenuItem>
                  <MenuItem value="L">L</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ md: 6 }}>
              <TextField
                label="SEO"
                name="title"
                fullWidth
                value={form.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ md: 6 }}>
              <TextField
                label="SEO Description"
                name="metaDescription"
                fullWidth
                value={form.metaDescription}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ md: 6 }}>
              <TextField
                label="Shelf Life"
                name="shelfLife"
                fullWidth
                value={form.shelfLife}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ md: 6 }}>
              <TextField
                label="Storage Instructions"
                name="storageInstructions"
                fullWidth
                value={form.storageInstructions}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ md: 12 }}>
              <TextField
                label="Description"
                name="description"
                fullWidth
                // multiline
                // rows={4}
                value={form.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ md: 12 }}>
              <Typography variant="h6">Nutrition Facts</Typography>
            </Grid>

            <Grid size={{ md: 6 }}>
              <TextField
                label="Calories"
                type="number"
                fullWidth
                name="calories"
                value={form.nutritionFacts.calories}
                onChange={handleNutritionChange}
              />
            </Grid>

            <Grid size={{ md: 6 }}>
              <TextField
                label="Carbs"
                type="number"
                fullWidth
                name="carbs"
                value={form.nutritionFacts.carbs}
                onChange={handleNutritionChange}
              />
            </Grid>

            <Grid size={{ md: 6 }}>
              <TextField
                label="Fat"
                type="number"
                fullWidth
                name="fat"
                value={form.nutritionFacts.fat}
                onChange={handleNutritionChange}
              />
            </Grid>

            <Grid size={{ md: 6 }}>
              <TextField
                label="Protein"
                type="number"
                fullWidth
                name="protein"
                value={form.nutritionFacts.protein}
                onChange={handleNutritionChange}
              />
            </Grid>

            <Grid size={{ md: 12 }}>
              <TextField
                label="Calcium"
                type="number"
                fullWidth
                name="calcium"
                value={form.nutritionFacts.calcium}
                onChange={handleNutritionChange}
              />
            </Grid>

            <Grid size={{ md: 6 }}>
              <TextField
                type="number"
                label="Min Order Qty"
                name="minOrderQty"
                fullWidth
                value={form.minOrderQty}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ md: 6 }}>
              <TextField
                type="number"
                label="Max Order Qty"
                name="maxOrderQty"
                fullWidth
                value={form.maxOrderQty}
                onChange={handleChange}
              />
            </Grid>


<Grid item md={12} sx={{ mb: 2 }}>
  <Typography variant="h6" gutterBottom>
    Display Settings
  </Typography>

  <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
    <FormControlLabel
      control={
        <Checkbox
          checked={form.displaySettings.showOnHome}
          onChange={(e) =>
            setForm({
              ...form,
              displaySettings: {
                ...form.displaySettings,
                showOnHome: e.target.checked,
              },
            })
          }
        />
      }
      label="Show on Home"
    />

    <TextField
      label="Priority"
      type="number"
      size="small"
      value={form.displaySettings.priority}
      onChange={(e) =>
        setForm({
          ...form,
          displaySettings: {
            ...form.displaySettings,
            priority: Number(e.target.value),
          },
        })
      }
      sx={{ width: 120 }}
    />

    <TextField
      label="Home Section"
      size="small"
      value={form.displaySettings.homeSection}
      onChange={(e) =>
        setForm({
          ...form,
          displaySettings: {
            ...form.displaySettings,
            homeSection: e.target.value,
          },
        })
      }
      sx={{ width: 180 }}
    />
  </Box>
</Grid>


            <Grid size={{ md: 6 }}>
              <Button type="submit" variant="contained" color="primary">
                Create Product
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Drawer>
  );
}
SecondSidebar.propTypes = {
  open: PropTypes.bool,
  toggleDrawer: PropTypes.func.isRequired,
};
export default SecondSidebar;
