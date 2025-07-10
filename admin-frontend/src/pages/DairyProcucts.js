// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableContainer,
//   Paper,
//   Typography,
//   Avatar,
// } from "@mui/material";
// import { Link } from "react-router-dom";

// const ProductTable = () => {
//   const [products, setProducts] = useState([]);
// const slug = "dairy-products"
//   useEffect(() => {
//     // Fetch products by category slug
//     axios
//       .get(`http://127.0.0.1:8000/products/category/${slug}`)
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Error fetching products", err));
//   }, []);

//   return (
//     <TableContainer component={Paper} sx={{ mt: 2 }}>
//       <Typography variant="h5" sx={{ m: 2 }}>
//         Products - Dairy Category
//       </Typography>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>Thumbnail</TableCell>
//             <TableCell>Product Name</TableCell>
//             <TableCell>Brand</TableCell>
//             <TableCell>Category</TableCell>
//             <TableCell>MRP (₹)</TableCell>
//             <TableCell>Selling Price (₹)</TableCell>
//             <TableCell>GST (%)</TableCell>
//             <TableCell>Min Order Qty</TableCell>
//             <TableCell>Max Order Qty</TableCell>
//                 <TableCell>Packaging Type</TableCell>
//                 <TableCell>Priority</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {products.map((product) => (
//             <TableRow key={product._id}>
//               <TableCell>
//                 <Avatar
//                   variant="square"
//                   src={`http://127.0.0.1:8000/${product.thumbnail}`}
//                   alt={product.name}
//                   sx={{ width: 30, height: 30 }}
//                 />
//               </TableCell>
//               <TableCell>
//                 {" "}
//                 <Link
//                   to={`/productdetails/${product._id}`}
//                   style={{ textDecoration: "none", color: "#3f51b5" }}
//                 >
//                   {product.name}{" "}
//                 </Link>
//               </TableCell>
//               <TableCell>{product.brand || "—"}</TableCell>
//               <TableCell>{product.category}</TableCell>
//               <TableCell>{product.mrp}</TableCell>
//               <TableCell>{product.defaultSellingPrice}</TableCell>
//               <TableCell>{product.gstRate}%</TableCell>
//               <TableCell>{product.minOrderQty}</TableCell>
//               <TableCell>{product.maxOrderQty}</TableCell>
//                 <TableCell>{product.packingType}</TableCell>
//                 <TableCell>{product.displaySettings?.priority}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default ProductTable;

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";

import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "PRODUCT_ROW";

// Row component for drag/drop
const DraggableTableRow = ({ product, index, moveRow, children }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;
      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: ItemType,
    item: { type: ItemType, index },
  });

  drag(drop(ref));

  return <TableRow ref={ref} style={{ cursor: "move" }}>{children}</TableRow>;
};

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const slug = "dairy-products";

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/products/category/${slug}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const updatedProducts = [...products];
      const [movedItem] = updatedProducts.splice(dragIndex, 1);
      updatedProducts.splice(hoverIndex, 0, movedItem);
      setProducts(updatedProducts);
    },
    [products]
  );

  const updatePriorities = () => {
    const updated = products.map((p, idx) => ({
      _id: p._id,
      priority: idx + 1,
    }));
    axios
      .patch("http://127.0.0.1:8000/products/update-priorities", { updated })
      .then(() => console.log("Priorities updated"))
      .catch((err) => console.error("Priority update failed", err));
  };

  useEffect(() => {
    if (products.length > 0) updatePriorities();
  }, [products]);

  return (
    <DndProvider backend={HTML5Backend} >
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
              <TableCell>NetWeight</TableCell>
              <TableCell>Min Order Qty</TableCell>
              <TableCell>Max Order Qty</TableCell>
              <TableCell>Packaging Type</TableCell>
              <TableCell>Priority</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <DraggableTableRow
                key={product._id}
                index={index}
                product={product}
                moveRow={moveRow}
                
              >
                <TableCell>
                  <Avatar
                    variant="square"
                    src={`http://127.0.0.1:8000/${product.thumbnail}`}
                    alt={product.name}
                    sx={{ width: 30, height: 30 }}
                  />
                </TableCell>
                <TableCell>
                  <Link
                    to={`/productdetails/${product._id}`}
                    style={{ textDecoration: "none", color: "#3f51b5" }}
                  >
                    {product.name}
                  </Link>
                </TableCell>
                <TableCell>{product.brand || "—"}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.mrp}</TableCell>
                <TableCell>{product.defaultSellingPrice}</TableCell>
                <TableCell>{product.gstRate}%</TableCell>
                <TableCell>{product.netWeight.value} {product.netWeight.unit}</TableCell>
                <TableCell>{product.minOrderQty}</TableCell>
                <TableCell>{product.maxOrderQty}</TableCell>
                <TableCell>{product.packingType}</TableCell>
                <TableCell>{index + 1}</TableCell>
              </DraggableTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DndProvider>
  );
};

export default ProductTable;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   MaterialReactTable,
//   useMaterialReactTable,
// } from "material-react-table";
// import { Box, Avatar, Typography, Paper } from "@mui/material";
// import { Link } from "react-router-dom";
// import { DndContext } from "@dnd-kit/core";

// import {
//   useSortable,
//   SortableContext,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable";
// import { CSS } from "@dnd-kit/utilities";

// const ProductTable = () => {
//   const [products, setProducts] = useState([]);
//   const [tableData, setTableData] = useState([]);

//   const slug = "dairy-products";

//   useEffect(() => {
//     axios
//       .get(`http://127.0.0.1:8000/products/category/${slug}`)
//       .then((res) => {
//         setProducts(res.data);
//         setTableData(res.data);
//       })
//       .catch((err) => console.error("Error fetching products", err));
//   }, []);

//   const columns = [
//     {
//       accessorKey: "thumbnail",
//       header: "Thumbnail",
//       Cell: ({ cell }) => (
//         <Avatar
//           variant="square"
//           src={`http://127.0.0.1:8000/${cell.getValue()}`}
//           alt="Thumbnail"
//           sx={{ width: 30, height: 30 }}
//         />
//       ),
//     },
//     {
//       accessorKey: "name",
//       header: "Product Name",
//       Cell: ({ row }) => (
//         <Link
//           to={`/productdetails/${row.original._id}`}
//           style={{ textDecoration: "none", color: "#3f51b5" }}
//         >
//           {row.original.name}
//         </Link>
//       ),
//     },
//     { accessorKey: "brand", header: "Brand" },
//     { accessorKey: "category", header: "Category" },
//     { accessorKey: "mrp", header: "MRP (₹)" },
//     { accessorKey: "defaultSellingPrice", header: "Selling Price (₹)" },
//     { accessorKey: "gstRate", header: "GST (%)" },
//     { accessorKey: "minOrderQty", header: "Min Order Qty" },
//     { accessorKey: "maxOrderQty", header: "Max Order Qty" },
//     { accessorKey: "packingType", header: "Packaging Type" },
//     {
//       accessorFn: (row) => row.displaySettings?.priority || "—",
//       id: "priority",
//       header: "Priority",
//     },
//   ];

//   const table = useMaterialReactTable({
//     columns,
//     data: tableData,
//     enableRowOrdering: true,
//     enableRowDragging: true,
//     muiTablePaperProps: {
//       component: Paper,
//       elevation: 3,
//       sx: { mt: 2 },
//     },
//     muiTableContainerProps: {
//       sx: { maxHeight: 600 },
//     },
//     getRowId: (row) => row._id,
//     onDraggingRowChange: (params) => {
//       if (!params) return;
//       const { draggingRow, hoveredRow } = params;
//       if (!draggingRow || !hoveredRow) return;

//       const draggingId = draggingRow.id;
//       const hoveredId = hoveredRow.id;

//       if (draggingId === hoveredId) return;

//       const oldIndex = tableData.findIndex((item) => item._id === draggingId);
//       const newIndex = tableData.findIndex((item) => item._id === hoveredId);

//       if (oldIndex === -1 || newIndex === -1) return;

//       const updatedData = [...tableData];
//       const [movedItem] = updatedData.splice(oldIndex, 1);
//       updatedData.splice(newIndex, 0, movedItem);

//       // Update priority based on new index
//       const reordered = updatedData.map((product, index) => ({
//         _id: product._id,
//         priority: index + 1,
//       }));

//       setTableData(
//         updatedData.map((product, index) => ({
//           ...product,
//           displaySettings: {
//             ...product.displaySettings,
//             priority: index + 1,
//           },
//         }))
//       );

//       // Send updated priorities to backend
//       axios
//         .patch("http://127.0.0.1:8000/products/update-priorities", reordered)
//         .then(() => console.log("Priorities updated successfully"))
//         .catch((err) => console.error("Failed to update priorities", err));
//     },
//   });

//   return (
//     <Box sx={{ width: "100%", maxWidth: { sm: "100%", md: "1700px" } }}>
//       <Typography variant="h5" sx={{ p: 5, ml: 50 }}>
//         Products - Dairy Category
//       </Typography>
//       <Box border={"2px solid red"} width={"100%"}>
//         <DndContext>
//           <MaterialReactTable table={table} />
//         </DndContext>
//       </Box>
//     </Box>
//   );
// };

// export default ProductTable;
