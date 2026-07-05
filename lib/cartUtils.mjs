export function sanitizeCartItems(cartItems = {}) {
  const sanitizedCartItems = {};

  Object.entries(cartItems || {}).forEach(([productId, quantity]) => {
    if (!productId) return;

    const parsedQuantity = Number(quantity);
    if (!Number.isFinite(parsedQuantity) || parsedQuantity <= 0) return;

    sanitizedCartItems[productId] = parsedQuantity;
  });

  return sanitizedCartItems;
}

export function clampQuantityToStock(quantity, availableQuantity = 0) {
  const parsedQuantity = Number(quantity);
  const parsedAvailableQuantity = Number(availableQuantity);

  if (!Number.isFinite(parsedQuantity) || parsedQuantity <= 0) return 0;
  if (!Number.isFinite(parsedAvailableQuantity) || parsedAvailableQuantity <= 0) return 0;

  return Math.min(parsedQuantity, parsedAvailableQuantity);
}

export function buildCheckoutItems(cartItems = {}, validProductIds = []) {
  const sanitizedCartItems = sanitizeCartItems(cartItems);
  const validProductIdSet = new Set(validProductIds.map((id) => String(id)));
  const validItems = [];
  const invalidItems = [];

  Object.entries(sanitizedCartItems).forEach(([productId, quantity]) => {
    if (validProductIdSet.has(String(productId))) {
      validItems.push({ product: productId, quantity });
    } else {
      invalidItems.push({ product: productId, quantity });
    }
  });

  return {
    validItems,
    invalidItems,
    sanitizedCartItems,
  };
}
