
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './pages/Home';
import RootLayout from './components/RootLayout/RootLayout';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import ShopPage from './pages/Shop';
import BlogPost from './pages/BlogPost';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import ProductDetail from './pages/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import {loader as ProductDetailLoader} from './pages/ProductDetail';
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <HomePage/>,
      },
      // Authentication
      {
        path: "/login",
        element: <LoginPage/>
      },
      {
        path: "/SignUp",
        element: <SignUpPage />
      },
      // Products
      {
        path: "/shop",
        children: [
          {
            index: true,
            element: <ShopPage/>
          },
          {
            id: "product-detail",
            path: ":id",
            element: <ProductDetail/>,
            loader: ProductDetailLoader
          }
        ]
      }
      ,
      {
        path: "/about",
        element: <About/>
      }
      ,
      {
        path: "/contact",
        element: <Contact/>
      }
      ,
      {
        path: "/blog",
        children: [
          {
            index: true,
            element: <BlogPost/>
          },
          {
            path:":id",
            element: <BlogDetail/>
          }
        ]
      }
      ,
      {
        path: "/viewcart",
        element: <Cart/>
      }
      ,
      {
        path: "/checkout",
        element: <Checkout/>
      }
      ,
      {
        path: "/viewcart",
        element: <Cart/>
      }
      ,
      {
        path: "/wishlist",
        element: <Cart/>
      }
      ,
      {
        path: "/wishlist",
        element: <Cart/>
      }
    ]
    ,
},
]);

function App() {

  return (
    <RouterProvider router={router}/>
  )
}

export default App
