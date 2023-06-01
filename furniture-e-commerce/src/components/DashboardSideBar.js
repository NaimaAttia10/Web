import React from 'react'
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const links =[
    {
        id : 1,
        title : "Home",
        link : '/admin'
    },
    {
        id : 2, 
        title : "Products",
        link : '/admin/products'
    },
    {
        id : 3, 
        title : "Categories",
        link : '/admin/categories'
    },
    {
        id : 4,
        title : "Brands",
        link : '/admin/brands'
    },
    {
        id : 5,
        title : "Orders",
        link : '/admin/orders'
    }

];

function MenuLink({title , link}){
        const history = useHistory();
        const Redirect = ()=>{
            history.push(link);
        }
        return(
            <div onClick={Redirect} style={{cursor : "pointer", backgroundColor : "var(--clr-primary-4)", textAlign : "center", width : "100%", color: "white", marginTop : "10px", paddingTop: "10px", paddingBottom: "10px", borderRadius : '5px'}}>
                {title}
            </div>
        );

}

function DashboardSideBar() {
  return (
    <Wrapper className="page section section-center">
        <h3 style={{position : 'absolute', textAlign : "center" , marginTop : "10px"}}>Dashboard</h3>
        <div className='links'>
            {
            links.map((element)=>{
                return <MenuLink key={element.id} title={element.title} link={element.link} />
            })
            }

        </div>
    </Wrapper>
  )
};
const Wrapper = styled.section`
position : relative;
  max-width : 300px;
  background-color : var(--clr-primary-5);
  border-radius : 5px;
  padding : 20px;
  color : var(--clr-primary-6);
  text-align : center;
  .links{
    display: flex;
    flex-direction: column;
    display: flex;
    align-items : center;
    justify-content: center;
    height : 100%;
  }
`;

export default DashboardSideBar