import React, { useState } from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import DashboardSideBar from "../components/DashboardSideBar";

const Select = ({value, options, onChange }) => {
  return (
    <label style={{ width : "100%"}}>
      <select value={value} onChange={onChange} >
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  );
};


function TableRow({id, user, price, status}){
  //SELECT STATUS
  const orderStates = [
    { label: 'Pending', value: 'pending' },
    { label: 'Delivered', value: 'delivered' },
    { label: 'Cancelled', value: 'cancelled' },
  ];

  const [orderState, setOrderState] = useState(status);
  const handleOrderStateChange = (event) => {
    setOrderState(event.target.value);
    //CALL THE API TO CHANGE THE STATUS OF THE ORDER 

    //.....


  };
  return <li class="table-row">
            <div className="col col-2" data-label="Job Id">{id}</div>
            <div className="col col-2" data-label="Job Id">{user}</div>
            <div className="col col-2" data-label="Amount">{price}</div>
            <div className="col col-2" data-label="Payment Status">
            <Select
                    options={orderStates}
                    value={orderState}
                    onChange={handleOrderStateChange}
                  />
            </div>
          </li>  
}

const DashboardOrders = () => {
  const orders = [
    {
      id : 1,
      user : "John Doe",
      price : 50,
      satus : "Pending"
    },
    {
      id : 3,
      user : "John Doe",
      price : 50,
      satus : "Pending"
    },
    {
      id : 2,
      user : "John Doe",
      price : 50,
      satus : "Pending"
    }
  ]

  return (
    <main>
      <PageHero title="Dashboard" />
      <Wrapper className="page section section-center">
        <DashboardSideBar />
        <article style={{ width : "100%"}}>
          <div className="title">
            <h2>orders managment</h2>
            <div className="underline"></div>
          </div>
          <br />
          <div className="dataBox">
            <ul className="responsive-table">
              <li className="table-header">
                <div className="col col-2">ID</div>
                <div className="col col-2">USER</div>
                <div className="col col-2">Price</div>
                <div className="col col-2">Status</div>
              </li>
              {orders.map((order)=>(<TableRow key={order.id} id={order.id} user={order.user} price={order.price} status={order.satus}/>))}
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
export default DashboardOrders;
