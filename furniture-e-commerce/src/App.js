import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  Home,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  About,
  Login,
  Products,
  PrivateRoute,
  Dashboard,
  DashboardProduct,
  DashboardCategories,
  DashboardAddProduct,
  DashboardEditProduct,
  DashboardBrands,
  DashboardOrders,
  Logout,
  AdminRoute,
  OnlyLogoutRoute
} from "./pages";

function App() {
  return (
      <Router>
        <Navbar />
          <Sidebar />
          <Switch>

            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/cart">
              <Cart />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <OnlyLogoutRoute exact path="/login">
              <Login />
            </OnlyLogoutRoute>
            <PrivateRoute exact path="/logout">
              <Logout />
            </PrivateRoute>


            <AdminRoute exact path="/admin">
              <Dashboard />
            </AdminRoute>
            <AdminRoute exact path="/admin/products">
              <DashboardProduct />
            </AdminRoute>
            <AdminRoute exact path="/admin/products/add">
              <DashboardAddProduct />
            </AdminRoute>
            <AdminRoute exact path="/admin/products/:id">
              <DashboardEditProduct />
            </AdminRoute>
            <AdminRoute exact path="/admin/categories">
              <DashboardCategories />
            </AdminRoute>
            <AdminRoute exact path="/admin/brands">
              <DashboardBrands />
            </AdminRoute>
            <AdminRoute exact path="/admin/orders">
              <DashboardOrders />
            </AdminRoute>

            
            <Route exact path="/products/:id" children={<SingleProduct />} />
            <PrivateRoute exact path="/checkout">
              <Checkout />
            </PrivateRoute>
            <Route path="*">
              <Error />
            </Route>

          </Switch>
        <Footer />
      </Router>
  );
}

export default App;
