import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,Button
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { useNavigate } from "react-router";

const OrderTemplateTable = () => {
  const [orderTemplates, setOrderTemplates] = useState([]);
const navigate = useNavigate()
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/ordertemp/")
      .then((res) => {
        setOrderTemplates(res.data); // assuming res.data is an array
        console.log(res.data)
      })
      .catch((err) => {
        console.error("Error fetching data", err);
      });
  }, []);
const handleEdit = (template) => {
  // Navigate to edit page or open dialog
  console.log("Edit clicked for", template);
  // Example: navigate(`/edit-template/${template._id}`);
navigate(`/home/${template}`)
};

const handlePlaceOrder = (template) => {
  // Trigger place order logic
  console.log("Place Order clicked for", template);
  // Example: axios.post(`/api/orders/place`, { templateId: template._id });
};

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Order Templates
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
           
            <TableCell>Template Name</TableCell>
            <TableCell>Total Invoice</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderTemplates.map((template) => (
            <TableRow key={template._id}>
          
              <TableCell>{template.templateName}</TableCell>
             <TableCell>{template.totalInvoiceValue}</TableCell>
             <TableCell>
        <Button 
          variant="outlined" 
          color="primary" 
          size="small" 
          onClick={() => handleEdit(template._id)}
          sx={{ mr: 1 }}
        >
          Edit
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          size="small" 
          onClick={() => handlePlaceOrder(template)}
        >
          Place Order
        </Button>
      </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrderTemplateTable;
