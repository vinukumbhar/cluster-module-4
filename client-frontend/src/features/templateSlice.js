import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProducts: {}, // key: productId
  templateName: "",
};

const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    addOrUpdateProduct: (state, action) => {
      const { productId, quantity, tentativePrice } = action.payload;
      if (quantity > 0) {
        state.selectedProducts[productId] = { productId, quantity, tentativePrice };
      } else {
        delete state.selectedProducts[productId];
      }
    },
    setTemplateName: (state, action) => {
      state.templateName = action.payload;
    },
    resetTemplate: () => initialState,
  },
});

export const { addOrUpdateProduct, setTemplateName, resetTemplate } = templateSlice.actions;
export default templateSlice.reducer;
