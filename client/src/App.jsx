import Navbar from './components/Navbar.jsx'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home.jsx';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer.jsx';
import { useAppContext } from './context/AppContext.jsx';
import Login from './components/Login.jsx';
import AllProducts from './pages/AllProducts.jsx';
import ProductCategory from './pages/ProductCategory.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import AddAddress from './pages/AddAddress.jsx';
import MyOrders from './pages/MyOrders.jsx';
import PaymentTest from './pages/PaymentTest.jsx';
import SellerLogin from './components/seller/SellerLogin.jsx';
import SellerLayout from './pages/seller/SellerLayout.jsx';
import AddProduct from './pages/seller/AddProduct.jsx';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import Contact from './pages/Contact.jsx';
import Help from './pages/Help.jsx';



const App = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const isSellerPath = location.pathname.includes("seller");
  const {showUserLogin , isSeller } = useAppContext()

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get("session_id");
    if (sessionId && location.pathname !== "/my-orders") {
      navigate(`/my-orders?session_id=${encodeURIComponent(sessionId)}`, { replace: true });
    }
  }, [location.pathname, location.search, navigate]);
  
  
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white' >
       {isSellerPath ? null : <Navbar/>} 
       {showUserLogin ? <Login/> : null}
       

       <Toaster/>

       <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
          
          <Routes>
           
            <Route path='/' element={<Home/>} />
            <Route path='/contact' element={<Contact/>} />
            <Route path='/help' element={<Help/>} />
            <Route path='/products' element={<AllProducts/>} />
            <Route path='/products/:category' element={<ProductCategory/>} />
            <Route path='/products/:category/:id' element={<ProductDetails/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/add-address' element={<AddAddress/>} />
            <Route path='/my-orders' element={<MyOrders/>} />
            <Route path='/payment-test' element={<PaymentTest/>} />
            
            <Route path='/seller' element={ isSeller ? <SellerLayout/> : <SellerLogin/> } >
               <Route index element={isSeller ? <AddProduct/> : null} />
               <Route path='product-list' element={<ProductList/>} />
               <Route path='orders' element={<Orders/>} />
            </Route>
          
          </Routes>

       </div>
      {!isSellerPath && <Footer/>}
    </div>
  )
}

export default App;