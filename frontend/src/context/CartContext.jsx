import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on app start
  useEffect(() => {
    const savedCart = localStorage.getItem("dressStoreCart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("dressStoreCart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product, quantity, size, color) => {
    const existingItem = cartItems.find(
      (item) =>
        item._id === product._id && item.size === size && item.color === color,
    );

    if (existingItem) {
      // If already in cart with same size & color, increase quantity
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        ),
      );
    } else {
      // Add new item
      setCartItems([
        ...cartItems,
        {
          _id: product._id,
          name: product.name,
          price: product.price,
          image: product.images[0],
          size,
          color,
          quantity,
        },
      ]);
    }
  };

  // Remove item from cart
  const removeFromCart = (productId, size, color) => {
    setCartItems(
      cartItems.filter(
        (item) =>
          !(
            item._id === productId &&
            item.size === size &&
            item.color === color
          ),
      ),
    );
  };

  // Update quantity
  const updateQuantity = (productId, size, color, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item._id === productId && item.size === size && item.color === color
          ? { ...item, quantity }
          : item,
      ),
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("dressStoreCart");
  };

  // Total number of items
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Total price
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
