import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import DashboardSideBar from "../components/DashboardSideBar";

import { useHistory } from "react-router-dom";
import axios from "axios";


function TableRow({name, category, price, id, qty}){

  const handleDeleteClick = (e)=>{
    e.preventDefault();
    axios.delete(`http://localhost:5000/product/${id}`)
        .then(response => {
          window.location.href = '/admin/products'
        })
        .catch(err => {
          console.log(err)
          window.location.href = '/admin/products'
        });
  }


  const history = useHistory();
  const EditLink = ()=>{
      history.push(`/admin/products/${id}`);
  }
  return <li class="table-row">
  <div className="col col-2">{name}</div>
  <div className="col col-2">{category}</div>
  <div className="col col-3">{qty}</div>
  <div className="col col-3">{price}</div>
  <div className="col col-2">
    <button className="editButton" onClick={EditLink}><i class="fa-solid fa-pencil"></i> Edit</button> <button onClick={handleDeleteClick} className="deleteButton"><i class="fa-solid fa-trash"></i></button>
  </div>
</li>  
}

const DashboardProduct = () => {

  const [products, setProductsData] = useState(null);
  useEffect(()=>{
    axios.get("http://localhost:5000/product")
        .then(response => {
          setProductsData(response.data)
        })
        .catch(err => {
          console.log(err)
          window.location.href = '/admin/products'
        });
  },[])

  const history = useHistory();
  const AddButton = ()=>{
      history.push(`/admin/products/add`);
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
          </div>
          <button onClick={AddButton} className="addButton"><i class="fa-solid fa-plus"></i> Add Product</button>
          <div className="dataBox">
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-2">Product Name</div>
                <div className="col col-2">Category</div>
                <div className="col col-3">Qty</div>
                <div className="col col-3">Price</div>
                <div className="col col-2">Actions</div>
              </li>
              {products?.map((product)=>(<TableRow key={product.id} id={product.id} name={product.name} category={product.categoryName}  price={product.price} qty={product.quantity}/>))}
            </ul>
          </div>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: flex;
  gap: 4rem;
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
  .editButton{
    border : none;
    border-radius : 5px;
    padding : 1rem 1.5rem;
    cursor : pointer;
    color : white;
    background-color : var(--clr-primary-1);
  }
  .deleteButton{
    border : none;
    border-radius : 5px;
    padding : 1rem;
    cursor : pointer;
    color : white;
    margin-left : 5px;
    background-color : var(--clr-red-dark);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  .dataBox{
    max-height : 500px;
    overflow-y: auto;
  }
  .responsive-table {
    li {
      border-radius: 3px;
      padding: 25px 30px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 25px;
      max-height : 100vh;
    }
    .table-header {
      background-color: #95A5A6;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .table-row {
      background-color: #ffffff;
      box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.1);
      align-items : center ;
    }
    .col-1 {
      flex-basis: 10%;
    }
    .col-2 {
      flex-basis: 40%;
    }
    .col-3 {
      flex-basis: 25%;
    }
    .col-4 {
      flex-basis: 25%;
    }
    
    @media all and (max-width: 767px) {
      .table-header {
        display: none;
      }
      .table-row{
        
      }
      li {
        display: block;
      }
      .col {
        
        flex-basis: 100%;
        
      }
      .col {
        display: flex;
        padding: 10px 0;
        &:before {
          color: #6C7A89;
          padding-right: 10px;
          content: attr(data-label);
          flex-basis: 50%;
          text-align: right;
        }
      }
    }
  }
`;
export default DashboardProduct;
