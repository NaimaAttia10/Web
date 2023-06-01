import React, { useEffect, useState }  from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import DashboardSideBar from "../components/DashboardSideBar";
import axios from "axios";
import { useParams } from 'react-router';

const Select = ({ label, value, options, onChange }) => {
  return (
    <label style={{ width : "100%"}}>
      {label}<br />
      <select value={value} onChange={onChange} >
        {options?.map((option) => (
          <option value={option.id}>{option.name}</option>
        ))}
      </select>
    </label>
  );
};



const DashboardEditProduct = () => {
  const params= useParams()
  
  //Product Name
  const [productName, setProductName] = useState("");
  const productNameHandler = (e)=>{
    setProductName(e.target.value);
  }
  //Product Price
  const [productPrice, setProductPrice] = useState(0);
  const productPriceHandler = (e)=>{
    setProductPrice(e.target.value);
  }
  //Product Description
  const [productDescription, setProductDescription] = useState("");
  const productDescriptionHandler = (e)=>{
    setProductDescription(e.target.value);
  }
  //Product Qty
  const [productQty, setProductQty] = useState(0);
  const productQtyHandler = (e)=>{
    setProductQty(e.target.value);
  }

  //Category Select

  const [categories, setCategoriesData] = useState(null);
  const [category, setCategory] = useState(null);
  useEffect(()=>{
    axios.get("http://localhost:5000/category")
        .then(response => {
          setCategoriesData(response.data)
          if(!category){
            setCategory(response.data[0].id)
          }
        })
        .catch(err => {
          console.log(err)
          window.location.href = '/admin/products'
        });
  },[])

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  //Brand Select

  const [brands, setBrandsData] = useState(null);
  const [brand, setBrand] = useState(null);
  useEffect(()=>{
    axios.get("http://localhost:5000/brand")
        .then(response => {
          setBrandsData(response.data)
          if(!brand){
            setBrand(response.data[0].id)
          }
        })
        .catch(err => {
          console.log(err)
          window.location.href = '/admin/products'
        });
  },[])

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };

  //GET THE PRODUCT INFOS

  const [product, setProductData] = useState(null);
  useEffect(()=>{
    axios.get(`http://localhost:5000/product/${params.id}`)
        .then(response => {
          setProductData(response.data)
          setProductName(response.data.name)
          setProductPrice(response.data.price)
          setProductDescription(response.data.description)
          setProductQty(response.data.quantity)
          setCategory(response.data.categoryId)
          setBrand(response.data.brandId)
        })
        .catch(err => {
          console.log(err)
          window.location.href = '/admin/products'
        });
  },[])

  //Form Submit
  const handleSubmit = (e)=>{
    e.preventDefault()
    axios.patch(`http://localhost:5000/product/${params.id}`,{
      productName,
      productDescription,
      productPrice,
      productQty,
      brand,
      category
    })
        .then(response => {
          window.location.href = '/admin/products'
        })
        .catch(err => {
          console.log(err)
          window.location.href = '/admin/products'
        });
  }
  return (
    <main>
      <PageHero title="Dashboard" />
      <Wrapper className="page section section-center">
        <DashboardSideBar />
        <article style={{ width : "100%"}}>
          <div className="title">
            <h2>products managment</h2>
            <div className="underline"></div>
          </div><br />
          <form onSubmit={handleSubmit} style={{justifyContent : "center", alignItems : "center", width : "100%", gap : "1rem"}}>
            <div style={{ flexGrow : 1}}>

                <label htmlFor="productName">Product Name : </label>
                <input
                type="text"
                name="productName"
                placeholder="Product Name"
                className="signup-input"
                value={productName}
                onChange={productNameHandler}
                required
                style={{ width : "100%"}}
                />
                <div style={{ display : "flex" , width: "100%", gap : "1rem"}}>
                  <div style={{ width : "100%"}}>
                    <label htmlFor="productPrice">Product Price : </label>
                    <input
                    type="number"
                    name="productPrice"
                    placeholder="Product Price"
                    className="signup-input"
                    value={productPrice}
                    onChange={productPriceHandler}
                    required
                    />
                  </div>
                  <div style={{ width : "100%"}}>
                    <label htmlFor="productQty">Product Quantity : </label>
                    <input
                    type="number"
                    name="productQty"
                    placeholder="Product Qty"
                    className="signup-input"
                    value={productQty}
                    onChange={productQtyHandler}
                    required
                    />
                  </div>
                </div>
                <div style={{ display : "flex" , width: "100%", gap : "1rem"}}>
                  <Select
                    label="Category : "
                    options={categories}
                    value={category}
                    onChange={handleCategoryChange}
                  /><br />
                  
                  <Select
                    label="Brand : "
                    options={brands}
                    value={brand}
                    onChange={handleBrandChange}
                  /><br />
                </div>

                <label htmlFor="productDescription">Product Description : </label>
                <textarea rows={10}
                name="productDescription"
                placeholder="Product Description"
                className="signup-input"
                value={productDescription}
                onChange={productDescriptionHandler}
                required
                />

            </div>
            <button type="submit" className="addButton">Submit <i class="fa-solid fa-check"></i></button>
          </form>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: flex;
  gap: 4rem;
  select {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.5rem;
    width : 100%;
  }
  .addButton{
    background-color : var(--clr-grey-5);
    color : white;
    font-size : 1rem;
    padding : 0.5rem 1.5rem;
    margin: 1rem auto;
    border : none;
    cursor : pointer;
    border-radius : 5px;
  }
  .signup-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
    width: 100%;
  }
  label{
    color: var(--clr-grey-4);
    line-height: 2;
  }

  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
    opacity:0;
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
`;
export default DashboardEditProduct;
