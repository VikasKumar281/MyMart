import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const PaymentTest = () => {
  const location = useLocation();
  const addressId = location.state?.addressId;
  const addressLabel = location.state?.addressLabel;

  const {
    products,
    cartItems,
    currency,
    getCartAmount,
    axios,
    user,
    setCartItems,
    navigate,
    setShowUserLogin,
  } = useAppContext();

  const [mode, setMode] = useState("demo");
  const [notice, setNotice] = useState("");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("12/34");
  const [cvc, setCvc] = useState("123");
  const [paying, setPaying] = useState(false);

  const items = Object.entries(cartItems).flatMap(([id, quantity]) => {
    const product = products.find((item) => item._id === id);
    if (!product || !quantity) return [];
    return [{ product: product._id, name: product.name, quantity }];
  });

  const total = Math.round((getCartAmount() + getCartAmount() * 0.02) * 100) / 100;

  useEffect(() => {
    axios
      .get("/api/order/payment-mode")
      .then(({ data }) => {
        if (data.mode) setMode(data.mode);
        if (data.message) setNotice(data.message);
      })
      .catch(() => setMode("demo"));
  }, [axios]);

  const payWithTestCard = async (event) => {
    event.preventDefault();
    if (!user) {
      toast.error("Please login to pay");
      setShowUserLogin(true);
      return;
    }
    if (!addressId || !items.length) {
      toast.error("Go back to the cart and choose an address");
      return;
    }

    try {
      setPaying(true);
      const { data } = await axios.post("/api/order/pay-test", {
        items: items.map(({ product, quantity }) => ({ product, quantity })),
        address: addressId,
        cardNumber,
        expiry,
        cvc,
      });
      if (data.success) {
        toast.success(data.message);
        setCartItems({});
        navigate("/my-orders");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPaying(false);
    }
  };

  const payWithStripe = async () => {
    if (!user) {
      toast.error("Please login to pay");
      setShowUserLogin(true);
      return;
    }
    try {
      setPaying(true);
      const { data } = await axios.post("/api/order/stripe", {
        items: items.map(({ product, quantity }) => ({ product, quantity })),
        address: addressId,
      });
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="mt-16 mb-16 max-w-lg">
      <p className="text-2xl font-medium">
        Test <span className="text-green-700">Payment</span>
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Test mode only. A real card is not charged, and a live Stripe key is blocked.
      </p>

      <div className="mt-6 border border-gray-300 p-5 space-y-2 text-gray-600">
        <p className="flex justify-between"><span>Items</span><span>{items.reduce((sum, item) => sum + item.quantity, 0)}</span></p>
        <p className="flex justify-between text-lg font-medium text-gray-800">
          <span>Total</span><span>{currency}{total}</span>
        </p>
        <p className="text-sm">Deliver to: {addressLabel || "No address selected"}</p>
      </div>

      {mode === "disabled" ? (
        <p className="mt-6 text-sm text-red-600">{notice || "Live payments are disabled."}</p>
      ) : mode === "stripe" ? (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-gray-500">
            Stripe test checkout is on. On the next page use card 4242 4242 4242 4242, any future date, and any CVC.
          </p>
          <button
            onClick={payWithStripe}
            disabled={paying}
            className="w-full py-3 bg-green-700 text-white font-medium cursor-pointer disabled:opacity-60"
          >
            {paying ? "Opening Stripe..." : "Continue to Stripe test checkout"}
          </button>
        </div>
      ) : (
        <form onSubmit={payWithTestCard} className="mt-6 space-y-4">
          <p className="text-sm text-green-700 bg-green-50 border border-green-200 p-3">
            No Stripe account is required. Use the test card already filled in. Any other card is declined.
          </p>
          <div>
            <p className="text-sm mb-1">Card number</p>
            <input
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full border border-gray-300 px-3 py-2 outline-none"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm mb-1">Expiry</p>
              <input
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                className="w-full border border-gray-300 px-3 py-2 outline-none"
                required
              />
            </div>
            <div>
              <p className="text-sm mb-1">CVC</p>
              <input
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 outline-none"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={paying}
            className="w-full py-3 bg-green-700 text-white font-medium cursor-pointer disabled:opacity-60"
          >
            {paying ? "Paying..." : "Pay in test mode"}
          </button>
        </form>
      )}

      <button onClick={() => navigate("/cart")} className="mt-4 text-green-700 cursor-pointer">
        Back to cart
      </button>
    </div>
  );
};

export default PaymentTest;
