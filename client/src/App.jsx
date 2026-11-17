import Navbar from './components/Navbar.jsx'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer.jsx';
import { useAppContext } from './context/AppContext.jsx';
import Login from './components/Login.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const AllProducts = lazy(() => import('./pages/AllProducts.jsx'));
const ProductCategory = lazy(() => import('./pages/ProductCategory.jsx'));
const ProductDetails = lazy(() => import('./pages/ProductDetails.jsx'));
const Cart = lazy(() => import('./pages/Cart.jsx'));
const AddAddress = lazy(() => import('./pages/AddAddress.jsx'));
const MyOrders = lazy(() => import('./pages/MyOrders.jsx'));
const PaymentTest = lazy(() => import('./pages/PaymentTest.jsx'));
const SellerLogin = lazy(() => import('./components/seller/SellerLogin.jsx'));
const SellerLayout = lazy(() => import('./pages/seller/SellerLayout.jsx'));
const AddProduct = lazy(() => import('./pages/seller/AddProduct.jsx'));
const ProductList = lazy(() => import('./pages/seller/ProductList'));
const Orders = lazy(() => import('./pages/seller/Orders'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Help = lazy(() => import('./pages/Help.jsx'));



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
    <div className='text-default min-h-screen flex flex-col text-gray-700 bg-white' >
       {isSellerPath ? null : <Navbar/>} 
       {showUserLogin ? <Login/> : null}
       

       <Toaster/>

       <div className={`flex-1 ${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>
          <Suspense fallback={<div className="min-h-[50vh] mt-16 text-gray-500">Loading...</div>}>
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
          </Suspense>

       </div>
      {!isSellerPath && <Footer/>}
    </div>
  )
}

export default App;