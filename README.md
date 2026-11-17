# 🛒 MyMart — Full-Stack Grocery Shopping Platform

<p align="center">
  <b>A full-stack online grocery shopping application with customer shopping flows and a seller dashboard.</b>
</p>

<p align="center">
  <a href="https://mymart-s6xs.onrender.com/">Live Application</a> •
  <a href="https://github.com/VikasKumar281/MyMart">Frontend & Main Repository</a> •
  <a href="https://github.com/VikasKumar281/MyMart-backend">Separate Backend Repository</a>
</p>

---

## 📌 Overview

**MyMart** is a grocery shopping web application built with React, Node.js, Express, and MongoDB. Customers can browse grocery products, view product details, manage a shopping cart, save delivery addresses, and place orders. The application also includes a seller/admin area for adding products, managing product availability, and viewing orders.

The codebase is maintained in two GitHub repositories:

| Repository | Purpose |
|---|---|
| [MyMart](https://github.com/VikasKumar281/MyMart) | Main repository containing the React client and an embedded Express server |
| [MyMart-backend](https://github.com/VikasKumar281/MyMart-backend) | Separately maintained backend repository |

The main repository's backend is in the `server/` directory. The separate backend repository contains the equivalent backend application as a standalone project. Choose one backend deployment/source for a given frontend environment; do not run two copies against production data unintentionally.

## 🌐 Live Demo

- **Application:** https://mymart-s6xs.onrender.com/
- **Frontend repository:** https://github.com/VikasKumar281/MyMart
- **Backend repository:** https://github.com/VikasKumar281/MyMart-backend

> The live URL is provided as the deployment address. Availability may depend on the hosting service and its current deployment state.

## ✨ Features

### 🛍️ Customer experience
- Browse the home page and grocery categories.
- View the complete product catalogue.
- Filter products by category using category routes.
- Open individual product detail pages.
- Add products to the cart and update cart quantities.
- Keep cart data associated with the signed-in user.
- Register, log in, check authentication status, and log out.
- Add and retrieve delivery addresses.
- Place Cash on Delivery orders.
- Use the built-in online payment demo, or Stripe Checkout when a Stripe test key is configured.
- View customer order history.

### 🧑‍💼 Seller and admin experience
- Seller/admin login and authentication checks.
- Add products with product information and images.
- View seller product listings.
- Change product stock availability.
- View orders in the seller dashboard.
- The backend includes an admin login configured through environment variables.

### 🔐 Application and backend capabilities
- JWT-based customer and seller authentication.
- HTTP-only authentication cookies, with token-header support in backend cookie utilities.
- MongoDB persistence through Mongoose.
- Product image upload support through Multer and Cloudinary.
- CORS configuration for approved frontend origins.
- Server-side product and stock validation when building orders.
- Online payment flow restricted to Stripe test keys; live Stripe secret keys are rejected by the current backend logic.

## 🧰 Technology Stack

| Area | Technologies |
|---|---|
| Frontend | React 19, Vite 7, JavaScript |
| Routing | React Router |
| Styling | Tailwind CSS 4, `@tailwindcss/vite` |
| HTTP requests | Axios |
| Notifications | React Hot Toast |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Authentication | JSON Web Token, bcryptjs |
| Image uploads | Multer, Cloudinary |
| Payments | Stripe Checkout (test mode) and built-in payment demo |
| Deployment configuration | Vercel configuration files; live URL supplied on Render |

## 🏗️ Architecture

MyMart follows a client-server architecture.

```text
Customer / Seller
       |
       v
React + Vite Frontend
       |
       | HTTP requests (Axios)
       v
Express REST API
       |
       +-------------------+
       |         |         |
       v         v         v
    MongoDB  Cloudinary  Stripe
    (data)   (images)   (test checkout)
```

1. The React application renders customer and seller pages.
2. Axios sends API requests to the backend configured by `VITE_BACKEND_URL`.
3. Express routes pass requests to controllers.
4. Authentication middleware checks customer or seller credentials for protected operations.
5. Controllers read and update MongoDB documents using Mongoose models.
6. Product images are processed through Multer and Cloudinary when Cloudinary is configured.
7. The order controller handles COD, built-in demo payment, and Stripe test checkout flows.

## 📁 Project Structure

### Main repository — `MyMart`

```text
MyMart/
├── client/
│   ├── public/
│   │   ├── _redirects
│   │   ├── favicon.svg
│   │   └── logo.png
│   ├── src/
│   │   ├── assets/
│   │   │   └── images, icons and assets.js
│   │   ├── components/
│   │   │   ├── seller/
│   │   │   └── shared UI components
│   │   ├── context/
│   │   │   └── AppContext.jsx
│   │   ├── pages/
│   │   │   ├── seller/
│   │   │   └── customer pages
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── vercel.json
│
├── server/
│   ├── configs/
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── multer.js
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   ├── package.json
│   ├── server.js
│   └── vercel.json
│
└── README.md
```

### Separate backend repository — `MyMart-backend`

```text
MyMart-backend/
├── configs/
│   ├── cloudinary.js
│   ├── db.js
│   └── multer.js
├── controllers/
│   ├── addressController.js
│   ├── cartController.js
│   ├── orderController.js
│   ├── productController.js
│   ├── sellerController.js
│   └── userController.js
├── middlewares/
│   ├── authSeller.js
│   └── authUser.js
├── models/
│   ├── Address.js
│   ├── Order.js
│   ├── Product.js
│   └── User.js
├── routes/
│   ├── addressRoute.js
│   ├── cartRoute.js
│   ├── orderRoute.js
│   ├── productRoute.js
│   ├── sellerRoute.js
│   └── userRoute.js
├── utils/
│   └── cookies.js
├── .env.example
├── package.json
├── server.js
└── vercel.json
```

## 🧭 How the Main Folders Work

### Frontend — `client/src`

- **`components/`** — reusable interface pieces such as navigation, footer, product cards, login UI, banners, and seller login.
- **`context/AppContext.jsx`** — shared application state and actions used across pages, including user/seller state and shopping data.
- **`pages/`** — route-level screens for browsing products, cart, address, orders, contact/help, payment demo, and seller operations.
- **`assets/`** — product images, banners, logos, and interface icons.
- **`App.jsx`** — defines application routes, lazy-loaded pages, notifications, and common layout.
- **`main.jsx`** — mounts React and wraps the app with BrowserRouter and AppContextProvider.

### Backend

- **`configs/`** — database connection, Cloudinary configuration, and Multer upload configuration.
- **`controllers/`** — request handlers containing business logic.
- **`middlewares/`** — authentication checks for customers and sellers.
- **`models/`** — Mongoose schemas for users, products, orders, and addresses.
- **`routes/`** — maps HTTP methods and API paths to controller functions.
- **`utils/`** — shared helpers, including authentication-cookie options and token extraction.
- **`server.js`** — configures Express, CORS, database/cloudinary initialization, API routes, and the local listener.

## ⚙️ Requirements

Install the following before running the project locally:

- Node.js (a current LTS release is recommended)
- npm
- MongoDB database (local MongoDB or MongoDB Atlas)
- Cloudinary account for product image hosting
- Stripe test account/key only when using Stripe Checkout rather than the built-in demo

## 🚀 Run the Project Locally

You can run the frontend and backend in separate terminal windows.

### Step 1 — Clone the main repository

```bash
git clone https://github.com/VikasKumar281/MyMart.git
cd MyMart
```

### Step 2 — Configure the backend

Open a terminal:

```bash
cd server
npm install
```

Create a local environment file by copying the example:

**Windows PowerShell**
```powershell
Copy-Item .env.example .env
```

**macOS / Linux**
```bash
cp .env.example .env
```

Set the values in `server/.env`:

```env
PORT=4000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
JWT_SECRET=replace_with_a_long_random_secret
SELLER_EMAIL=admin@mymart.com
SELLER_PASSWORD=replace_with_a_strong_password
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLIENT_URL=http://localhost:5173
STRIPE_SECRET_KEY=
STRIPE_CURRENCY=inr
```

**Environment variable details**

| Variable | Purpose |
|---|---|
| `PORT` | Local Express server port; defaults to `4000` |
| `NODE_ENV` | Set to `development` locally and `production` in deployment |
| `MONGODB_URI` | MongoDB connection string; the backend selects the `MyMart` database |
| `JWT_SECRET` | Secret used to sign and verify JWTs |
| `SELLER_EMAIL` | Configured admin/seller login email |
| `SELLER_PASSWORD` | Configured admin/seller login password |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `CLIENT_URL` | Frontend origin allowed by backend CORS |
| `CLIENT_URLS` | Optional comma-separated list of additional allowed frontend origins |
| `STRIPE_SECRET_KEY` | Optional Stripe test secret key; leave empty for built-in demo payment |
| `STRIPE_CURRENCY` | Stripe checkout currency; configured as `inr` |

> 🔒 Never commit your real `.env` file, MongoDB credentials, JWT secret, Cloudinary credentials, or Stripe keys. Use the example file as a template and configure secrets in the deployment provider.

### Step 3 — Start the backend

From the `server/` directory:

```bash
npm run server
```

The backend uses port `4000` by default. Open the following address to check the root API response:

```text
http://localhost:4000/
```

Expected response:

```text
API is Working
```

The `npm start` command runs the server with Node.js:

```bash
npm start
```

### Step 4 — Configure the frontend

Open a second terminal from the project root:

```bash
cd client
npm install
```

Create the frontend environment file:

**Windows PowerShell**
```powershell
Copy-Item .env.example .env
```

**macOS / Linux**
```bash
cp .env.example .env
```

Set `client/.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
VITE_CURRENCY=₹
```

- `VITE_BACKEND_URL` points the frontend to the Express API.
- `VITE_CURRENCY` controls the currency symbol used by the frontend.
- Vite exposes variables prefixed with `VITE_` to client-side code. Do not put private credentials in this file.

### Step 5 — Start the frontend

From the `client/` directory:

```bash
npm run dev
```

Vite normally serves the development frontend at:

```text
http://localhost:5173
```

Open the shown local URL in your browser. Keep both terminal processes running while developing.

### Step 6 — Build and preview the frontend

```bash
cd client
npm run build
npm run preview
```

The production build is generated in `client/dist/`. The preview command serves that built output locally.

### Step 7 — Run lint checks

```bash
cd client
npm run lint
```

## 🔌 API Reference

The backend mounts the following route groups:

| Base path | Purpose |
|---|---|
| `/api/user` | Customer registration, login, authentication status, and logout |
| `/api/seller` | Seller/admin login, authentication status, and logout |
| `/api/product` | Product listing, details, seller listing, product creation, and stock updates |
| `/api/cart` | Persist customer cart changes |
| `/api/address` | Add and retrieve customer addresses |
| `/api/order` | Payment mode, order placement, payment verification, and order listing |

### 👤 User endpoints

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/user/register` | Public | Register a customer |
| POST | `/api/user/login` | Public | Log in a customer |
| GET | `/api/user/is-auth` | Customer | Check customer authentication |
| POST | `/api/user/logout` | Customer/session | Log out and clear auth cookie |

### 🧑‍💼 Seller endpoints

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/seller/login` | Public | Seller/admin login |
| GET | `/api/seller/is-auth` | Seller | Check seller authentication |
| POST | `/api/seller/logout` | Seller/session | Log out and clear seller cookie |

### 📦 Product endpoints

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/product/add` | Seller | Add a product; accepts up to four uploaded images |
| GET | `/api/product/list` | Public | Get the product list |
| GET | `/api/product/seller` | Seller | Get products for the logged-in seller |
| GET | `/api/product/id` | Public | Get a product by ID |
| POST | `/api/product/stock` | Seller | Change product stock availability |

### 🛒 Cart endpoints

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/cart/update` | Customer | Update the authenticated customer's cart |

### 📍 Address endpoints

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| POST | `/api/address/add` | Customer | Add a delivery address |
| GET | `/api/address/get` | Customer | Retrieve saved addresses |

### 🧾 Order and payment endpoints

| Method | Endpoint | Access | Purpose |
|---|---|---|---|
| GET | `/api/order/payment-mode` | Public | Check available payment mode |
| POST | `/api/order/cod` | Customer | Place a Cash on Delivery order |
| POST | `/api/order/pay-test` | Customer | Complete the built-in demo payment flow |
| POST | `/api/order/stripe` | Customer | Create a Stripe test checkout session |
| POST | `/api/order/verify-stripe` | Customer | Verify a Stripe checkout session |
| GET | `/api/order/user` | Customer | Retrieve the logged-in customer's orders |
| GET | `/api/order/seller` | Seller/admin | Retrieve eligible seller/admin orders |

> The route tables describe paths and access middleware visible in the source. Request payload details and response schemas are defined by the individual controllers; inspect those files when integrating another client.

## 💳 Payment Behaviour

The current order controller supports three payment-related paths:

1. **Cash on Delivery (COD):** creates an unpaid COD order and clears the customer's cart after successful order creation.
2. **Built-in demo payment:** when no Stripe secret key is configured, the backend accepts the test card number `4242 4242 4242 4242` with a future `MM/YY` expiry and a three-digit CVC. This is a demonstration flow and does not charge real money.
3. **Stripe Checkout test mode:** when `STRIPE_SECRET_KEY` begins with `sk_test_`, the backend creates a Stripe Checkout session and later verifies its payment status.

⚠️ The current backend explicitly rejects keys beginning with `sk_live_`. Do not describe this implementation as live card processing.

## 🗃️ Database Models

The backend defines the following Mongoose models:

- **User:** customer name, unique email, password hash, and cart items.
- **Product:** name, description, price, offer price, image list, category, stock status, and seller identifiers.
- **Address:** customer reference and delivery/contact fields such as name, email, street, city, state, ZIP code, country, and phone.
- **Order:** customer, ordered products and quantities, amount, delivery address, order status, payment type, and paid status.

The database connection selects the `MyMart` database from the configured MongoDB connection.

## ☁️ Deployment

The repositories contain Vercel configuration files, while the supplied live application URL uses the Render domain. Configure the hosting provider to match the repository and folder you actually deploy.

### Option A — Deploy the embedded backend from the main repository

Create a backend service/project connected to `VikasKumar281/MyMart`:

- Root directory: `server`
- Runtime: Node.js
- Install command: `npm install`
- Start command for a persistent Node host: `npm start`
- Set all backend environment variables from the table above.
- Set `CLIENT_URL` to the exact deployed frontend origin.

### Option B — Deploy the standalone backend repository

Connect [MyMart-backend](https://github.com/VikasKumar281/MyMart-backend):

- Root directory: repository root
- Install command: `npm install`
- Start command for a persistent Node host: `npm start`
- Add the backend environment variables.
- Set `CLIENT_URL` to the deployed frontend origin.

### Frontend deployment

Connect [MyMart](https://github.com/VikasKumar281/MyMart) as a separate frontend project:

- Root directory: `client`
- Framework/build tool: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables:
  - `VITE_BACKEND_URL` = deployed backend base URL, without a trailing slash
  - `VITE_CURRENCY` = `₹`

After changing `VITE_BACKEND_URL`, rebuild and redeploy the frontend because Vite embeds this value during the build.

### MongoDB Atlas network access

The deployed backend must be able to reach the MongoDB cluster. Configure Atlas network access for the backend host using an appropriate restricted network rule where possible. Avoid leaving broad network access enabled longer than necessary.

### CORS

Set `CLIENT_URL` to the exact frontend origin (scheme and hostname, no path). The backend also accepts localhost origins and any additional origins supplied through the comma-separated `CLIENT_URLS` variable.

### Deployment notes

- The root route `/` responds with `API is Working` when the API is reachable and initialization succeeds.
- The frontend's `client/vercel.json` rewrites routes to `index.html` for client-side routing.
- The backend's `server/vercel.json` configures a Vercel Node function route.
- Keep frontend and backend environment variables separate.
- Never place backend secrets in frontend hosting settings.

## 🧪 Basic Verification Checklist

After starting the application, check the following:

- [ ] Frontend opens at the Vite development URL.
- [ ] Backend root URL responds with `API is Working`.
- [ ] Product list loads from the backend.
- [ ] Customer registration and login work.
- [ ] Cart updates persist for the signed-in customer.
- [ ] Delivery address can be added and retrieved.
- [ ] Seller/admin login works with configured credentials.
- [ ] Seller can add a product and change its stock status.
- [ ] COD order can be placed.
- [ ] Demo payment works only with the documented test card details.
- [ ] Customer and seller order lists load as expected.

## 🛠️ Common Setup Issues

| Issue | What to check |
|---|---|
| MongoDB connection fails | Confirm `MONGODB_URI`, database user/password, cluster status, and Atlas network access |
| Browser reports a CORS error | Confirm `CLIENT_URL` exactly matches the deployed frontend origin |
| Frontend cannot reach API | Confirm `VITE_BACKEND_URL` is correct and redeploy the frontend |
| Authentication does not persist | Check cookie settings, HTTPS in production, CORS credentials, and browser cookie policy |
| Product images do not upload | Confirm Cloudinary environment values and upload request configuration |
| Stripe Checkout is unavailable | Configure a Stripe test secret key beginning with `sk_test_`; otherwise use the built-in demo path |
| Deep frontend route returns 404 | Ensure the host serves the Vite app with the SPA rewrite in `client/vercel.json` |

## 🔐 Security Notes

- Use a long, random `JWT_SECRET`.
- Use a strong, unique seller/admin password.
- Keep `.env` files out of Git.
- Never expose Cloudinary or Stripe secret keys in frontend variables.
- Use Stripe test credentials for test transactions.
- The built-in test-card flow is for demonstration only; it is not a production payment processor.
- Restrict database network access to trusted sources where your host supports stable outbound IPs.
- Review authentication, authorization, validation, and rate limiting before exposing the application to production users.

## 👨‍💻 Author

**Vikas Kumar**

- GitHub: [@VikasKumar281](https://github.com/VikasKumar281)
- MyMart Frontend & Main Repository: [VikasKumar281/MyMart](https://github.com/VikasKumar281/MyMart)
- MyMart Backend Repository: [VikasKumar281/MyMart-backend](https://github.com/VikasKumar281/MyMart-backend)

## 📄 License

No license file is currently listed in the inspected repositories. Unless a license is added, all rights remain with the repository owner and reuse permissions are not explicitly granted.

---

<p align="center">
  Made with ❤️ using React, Node.js, Express, and MongoDB.
</p>
