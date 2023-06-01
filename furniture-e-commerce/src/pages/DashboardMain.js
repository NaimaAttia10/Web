import React from "react";
import styled from "styled-components";
import { PageHero } from "../components";
import DashboardSideBar from "../components/DashboardSideBar";

const DashboardMain = () => {
  return (
    <main>
      <PageHero title="Dashboard" />
      <Wrapper className="page section section-center">
        <DashboardSideBar />
        <article style={{ width : "100%"}}>
          <div className="title">
            <h2>overview</h2>
            <div className="underline"></div>
          </div><br />
          <div className="stats">
              <div className="box" style={{ border : "1px solid var(--clr-grey-5)", backgroundColor : "var(--clr-grey-6)"}}>
                  <div className="icon" style={{backgroundColor : "var(--clr-grey-5)"}}>
                     <i className="fa-solid fa-user"></i>
                  </div>
                  <div className="dtatDta">
                    <h3>25</h3>
                    <h2 className="statName">Cutomers</h2>
                  </div>
              </div>
              <div className="box" style={{ border : "1px solid var(--clr-primary-4)", backgroundColor : "var(--clr-primary-5)"}}>
                  <div className="icon" style={{backgroundColor : "var(--clr-primary-4)"}}>
                    <i className="fa-solid fa-cart-shopping"></i>
                  </div>
                  <div className="dtatDta">
                    <h3>25</h3>
                    <h2 className="statName">Orders</h2>
                  </div>
              </div>
              <div className="box" style={{ border : "1px solid var(--clr-red-dark)", backgroundColor : "var(--clr-red-light)"}}>
                  <div className="icon" style={{backgroundColor : "var(--clr-red-dark)"}}>
                    <i className="fa-solid fa-box-open"></i>
                  </div>
                  <div className="dtatDta">
                    <h3>25</h3>
                    <h2 className="statName">Products</h2>
                  </div>
              </div>
              <div className="box" style={{ border : "1px solid var(--clr-primary-1)", backgroundColor : "var(--clr-primary-2)"}}>
                  <div className="icon" style={{backgroundColor : "var(--clr-primary-1)"}}>
                    <i className="fa-solid fa-wallet"></i>
                  </div>
                  <div className="dtatDta">
                    <h3>25 $</h3>
                    <h2 className="statName">Profit</h2>
                  </div>
              </div>
          </div>
        </article>
      </Wrapper>
    </main>
  );
};

const Wrapper = styled.section`
  display: flex;
  gap: 4rem;
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
  .stats{
    display : grid;
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
  }
  .box{
    display : flex;
    border-radius : 5px;
    padding : 10px 20px;
    color : var(--clr-primary-7);
  }
  .icon{
    font-size : 2.5rem;
    border-radius : 100%;
    width : 100px;
    height : 75px;
    position : relative;
    display : flex;
    align-items: center;
    justify-content : center;
  }
  .statName {
    font-size : 1rem;
  }
  .dtatDta{
    text-align : center;
    width : 100%;
  }
`;
export default DashboardMain;
