import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import DashboardSideBar from "../components/DashboardSideBar";
import axios from "axios";


function TableRow({name, nb, id, setShowDeleteError}){

  const handleDelete = ()=>{
    axios.delete(`http://localhost:5000/brand/${id}`)
    .then(response => {
      setShowDeleteError(false)
      window.location.href = '/admin/brands'
    })
    .catch(err => {
      setShowDeleteError(true)
    });
  }

  return <li class="table-row">
            <div className="col col-2" data-label="Job Id">{name}</div>
            <div className="col col-2" data-label="Amount">{nb}</div>
            <div className="col col-1" data-label="Payment Status">
              <button className="deleteButton" onClick={handleDelete}><i class="fa-solid fa-trash"></i></button>
            </div>
          </li>  
}

const DashboardBrands = () => {

  const [brands, setData] = useState(null);
  useEffect(()=>{
    axios.get("http://localhost:5000/brand")
        .then(response => {
          console.log(response.data)
          setData(response.data)
        })
        .catch(err => {
          console.log(err)
          window.location.href = '/admin/brands'
        });
  },[])

  const [addBrand, setAddBrand] = useState("");
  const [showError, setShowError] = useState(false);
  const [showDeleteError, setShowDeleteError] = useState(false);
  const addBrandHandler = (e)=>{
    setAddBrand(e.target.value);
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    axios.post("http://localhost:5000/brand/add", {
          addBrand
        })
        .then(response => {
          setShowError(false)
          window.location.href = '/admin/brands'
        })
        .catch(err => {
          setShowError(true)
        });
  }

  return (
    <main>
      <PageHero title="Dashboard" />
      <Wrapper className="page section section-center">
        <DashboardSideBar />
        <article style={{ width : "100%"}}>
          <div className="title">
            <h2>brands managment</h2>
            <div className="underline"></div>
          </div>
          { showError ? 
          (<div className="errorMessage">
              Brand already exists !
          </div>) : null}
          { showDeleteError ? 
          (<div className="errorMessage">
              An Error has occured please try again !
          </div>) : null}
          <form onSubmit={handleSubmit} style={{display : "flex" , justifyContent : "center", alignItems : "center", width : "100%", gap : "1rem"}}>
            <div style={{ flexGrow : 1}}>
                <input
                type="text"
                name="addBrand"
                placeholder="Brand Name"
                className="signup-input"
                value={addBrand}
                onChange={addBrandHandler}
                required
                />
            </div>
            <button type="submit" className="addButton">Add <i class="fa-solid fa-plus"></i></button>
          </form>
          <div className="dataBox">
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-2">Brand Name</div>
                <div className="col col-2">Number of Products</div>
                <div className="col col-1">Actions</div>
              </li>
              {brands?.map((brand)=>(<TableRow key={brand.id} id={brand.id} name={brand.name} nb={brand.product.length} setShowDeleteError={setShowDeleteError}/>))}
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
export default DashboardBrands;
