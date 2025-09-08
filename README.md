# MyMart =>

## FrontEnd => (npm run dev)

- Create a clent folder using - npm create vite@latest

- Install all dependencies -> npm install

- Install ES7 React/Redux/GraphQL extension 

- Install TailwindCSS -> 
  - npm install tailwindcss @tailwindcss/vite
  - Add the @tailwindcss/vite plugin to your Vite configuration.
  - Add an @import to your CSS file that imports Tailwind CSS. => @import "tailwindcss".

- Install the packages =>
  - react-router-dom , react-hot-toast

- Add Google font embed code - Outfit font  

- We will use prebuiltui for navbar

- Created Navbar of the project

- Created Banner and categories in Home page

- Install the packages => npm i react-hot-toast axios

- Created Best Seller section in Home Page

- created Bottom Banner in Home Page

- Created Newsletter section in Home Page

- Created Footer section

- Created Login Page 

- Created All Products Page

- Created Product Category Page

- Created Products Detail Page 

- Created Cart Page

- Created Address page 

- Created My Orders page 

- Created Seller Login Page 

- For Seller Layout , We will use Prebuilt UI's 'Sidebar with Navbar' code

- Created Add Products Page in Seller Dashboard Section

- Created ProductList Page in Seller Dashboard Section

- Created Orders List Page in Seller Dashboard Section



## Backend => (npm run server) =>

- Install the packages using the command -> npm install bcryptjs cloudinary cookie-parser cors dotenv express jsonwebtoken mongoose multer 

- Install Nodemon -> npm install nodemon --save-dev

- Connected MongoDB database

- Created API for User Registration  

- Created API for Login   

- Created API for Authentication   

- Created API for Logout

- Created APIs for Seller's Login , Authentication and Logged Out

- Setup of Cloudinary Secret API , API Key

- Created APIs for product (add , list ,id , inStock)

- Created API for updating the cart data.

- Created API for update the user's address.

- Created APIs for "placing a new order" , "To get the order details for any user" and "To get all order details for seller or admin".

- Now we have successfully created the Backend.

- Connect Frontend with Backend =>

- Install axios package in Client -> npm i axios (Using the axios package we can make the API calls).

- Created the feature for products upload and Product in stock or not toggle fuction

- Added Feature of Fetch User Auth Status , User Data and Cart Items

- Created the Function for Logout

- Adfded the feature of "Update the State of Cart Items in the Database when cartItems change"

- Added the Functionality to add the delivery address

- We used the Loading component to show a temporary loading state and then redirect the user to the appropriate page