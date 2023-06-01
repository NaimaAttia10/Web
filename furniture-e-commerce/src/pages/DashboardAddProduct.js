import React, { useEffect, useState }  from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import DashboardSideBar from "../components/DashboardSideBar";
import axios from "axios";

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



const DashboardAddProduct = () => {

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
  //Product Image
  const [productImage, setProductImage] = useState();
  const productImageHandler = (e)=>{
    if (e.target.files) {
      setProductImage(e.target.files[0]);
    }
  }

  //Category Select
  //the Value is going to be sent by the form So put the id in the value field

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
          window.location.href = '/admin/products/add'
        });
  },[])

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  //Brand Select
  //the Value is going to be sent by the form So put the id in the value field
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
          window.location.href = '/admin/products/add'
        });
  },[])

  const handleBrandChange = (event) => {
    setBrand(event.target.value);
  };




  //Form Submit
  const [showError, setShowError] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const handleSubmit = (e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append("productImage", productImage);
    axios.post("http://localhost:5000/product/upload",formData)
      .then(response => {
        setShowError(false)
        setShowInfo(true)
        console.log(response.data)
        axios.post("http://localhost:5000/product/add", {
          productName,
          productPrice,
          productQty,
          productImage : response.data,
          productDescription,
          brand,
          category
        })
        .then(response => {
          setShowInfo(false)
          setShowError(false)
          window.location.href = '/admin/products'
        })
        .catch(err => {
          setShowInfo(false)
          setShowError(true)
        });
      })
      .catch(err => {
        setShowError(true)
        setShowInfo(false)
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
          { showInfo ? 
          (<div className="infoMessage">
              Uploading Image Please Wait !
          </div>) : null}
          { showError ? 
          (<div className="errorMessage">
              An Error has occured please try again !
          </div>) : null}
          <form encType="multipart/form-data" onSubmit={handleSubmit} style={{justifyContent : "center", alignItems : "center", width : "100%", gap : "1rem"}}>
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


                <label htmlFor="productImage">Product Image : </label>
                <input
                type="file"
                name="productImage"
                className="signup-input"
                onChange={productImageHandler}
                required
                
                />


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
            <button type="submit" className="addButton">Add <i class="fa-solid fa-plus"></i></button>
          </form>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: flex;
  gap: 4rem;
  .errorMessage{
    background-color : #C0392B ;
    width : 100%;
    padding : 0.5rem 1rem;
    color : white;
    border-radius : 5px;
    text-align : center ;
    font-size : 1.15rem;
    margin-top: 1rem;
  }
  .infoMessage{
    background-color : #F7DC6F ;
    width : 100%;
    padding : 0.5rem 1rem;
    color : white;
    border-radius : 5px;
    text-align : center ;
    font-size : 1.15rem;
    margin-top: 1rem;
  }
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
export default DashboardAddProduct;
