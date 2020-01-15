export const shopCartSelector = shopCartItems => {
  const shopCartObjects = [];
  shopCartItems.forEach(shopCartItem => {
    const {
      _id: productId,
      productName,
      productPrice,
      productVat,
      companyId,
      sellerName,
      quantity
    } = shopCartItem;

    const existingIndex = shopCartObjects.findIndex(shopCartObject => shopCartObject.companyId === companyId);
    
    if (existingIndex !== -1) {
      shopCartObjects[existingIndex].products.push({
        productId,
        productName,
        productPrice,
        productVat,
        quantity
      });
    } else {
      shopCartObjects.push({
        sellerName,
        companyId,
        products: [
          {
            productId,
            productName,
            productPrice,
            productVat,
            quantity
          }
        ]
      });
    }
  });

  return shopCartObjects;
};