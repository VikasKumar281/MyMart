import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

const backendURL = (import.meta.env.VITE_BACKEND_URL || "http://localhost:4000").replace(/\/$/, "");

axios.defaults.withCredentials = true;
axios.defaults.baseURL = backendURL;

if (!axios.__mymartAuth) {
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    const sellerToken = localStorage.getItem("sellerToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (sellerToken) config.headers["x-seller-token"] = sellerToken;
    return config;
  });
  axios.__mymartAuth = true;
}

const mergeCart = (serverCart = {}, localCart = {}) => {
  const merged = { ...(serverCart || {}) };
  for (const id in localCart || {}) {
    const qty = Number(localCart[id]) || 0;
    if (qty > 0) merged[id] = (Number(merged[id]) || 0) + qty;
  }
  return merged;
};

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY || "₹";
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [cartReady, setCartReady] = useState(false);
  const skipCartSync = useRef(false);

  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      setIsSeller(Boolean(data.success));
    } catch {
      setIsSeller(false);
    }
  };

  const fetchUser = async () => {
    const hadSavedSession = Boolean(localStorage.getItem("user") || localStorage.getItem("token"));
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems || {});
        localStorage.setItem("user", JSON.stringify(data.user));
      } else {
        skipCartSync.current = true;
        setUser(null);
        if (hadSavedSession) setCartItems({});
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } catch {
      skipCartSync.current = true;
      setUser(null);
      if (hadSavedSession) setCartItems({});
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } finally {
      setCartReady(true);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setProductsLoaded(true);
    }
  };

  const onLoginSuccess = (data) => {
    if (data.token) localStorage.setItem("token", data.token);
    const merged = mergeCart(data.user?.cartItems || {}, cartItems);
    const nextUser = { ...data.user, cartItems: merged };
    localStorage.setItem("user", JSON.stringify(nextUser));
    setUser(nextUser);
    setCartItems(merged);
    setCartReady(true);
  };

  const logoutUser = async () => {
    try {
      const { data } = await axios.post("/api/user/logout");
      if (data.success) toast.success(data.message);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      skipCartSync.current = true;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setCartItems({});
      navigate("/");
    }
  };

  const onSellerLogin = (token) => {
    if (token) localStorage.setItem("sellerToken", token);
    setIsSeller(true);
  };

  const logoutSeller = async () => {
    try {
      const { data } = await axios.post("/api/seller/logout");
      if (data.success) toast.success("Seller logged out");
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      localStorage.removeItem("sellerToken");
      setIsSeller(false);
      navigate("/");
    }
  };

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const cartData = structuredClone(prev || {});
      cartData[itemId] = (cartData[itemId] || 0) + 1;
      return cartData;
    });
    toast.success("Added to Cart");
  };

  const updateCartItem = (itemId, quantity) => {
    const qty = Number(quantity);
    setCartItems((prev) => {
      const cartData = structuredClone(prev || {});
      if (qty <= 0) delete cartData[itemId];
      else cartData[itemId] = qty;
      return cartData;
    });
    toast.success("Cart Updated");
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const cartData = structuredClone(prev || {});
      if (!cartData[itemId]) return cartData;
      cartData[itemId] -= 1;
      if (cartData[itemId] <= 0) delete cartData[itemId];
      return cartData;
    });
    toast.success("Removed from Cart");
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) totalCount += Number(cartItems[item]) || 0;
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const id in cartItems) {
      const itemInfo = products.find((product) => product._id === id);
      const qty = Number(cartItems[id]) || 0;
      if (itemInfo && qty > 0) totalAmount += Number(itemInfo.offerPrice) * qty;
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setUser(parsed);
        setCartItems(parsed.cartItems || {});
      } catch {
        localStorage.removeItem("user");
      }
    }
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);

  useEffect(() => {
    const updateCart = async () => {
      try {
        const { data } = await axios.post("/api/cart/update", { cartItems });
        if (!data.success && data.message !== "Not Authorized") {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (skipCartSync.current) {
      skipCartSync.current = false;
      return;
    }
    if (!user || !cartReady) return;
    updateCart();
  }, [cartItems, cartReady, user]);

  const value = {
    navigate,
    user,
    setUser,
    setIsSeller,
    isSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    productsLoaded,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartAmount,
    getCartCount,
    axios,
    fetchProducts,
    setCartItems,
    onLoginSuccess,
    logoutUser,
    onSellerLogin,
    logoutSeller,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
