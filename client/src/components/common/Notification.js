import React from 'react'
import styled from "styled-components"

const Main = styled.div`
  display : flex;
  align-items : center;
  position :relative;
  width: 50px;
  height: 50px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2 7px rgba(0, 0, 0, 0.2);
  box-sizing : border-box;
  justify-content: center;
  cursor: pointer;
  margin-left : 20px;
  &>i{
   
  font-size : 30px;
  line-height : 60px;
  color: #cecece;
  }

  &>.num{
    position : absolute;
    top : 0;
    right : -5px;

 
   border-radius : 100%;
    background :#ff2c74;
    color : #fff;
    line-height : 25px;
    font-family : sans-serif;
    text-align : center;
  }
`;


 const Notification = ({icon ,num}) => {
    return (
      <>
      <Main>
                   <i class={icon}></i>
              <span  className="num" style={{    width :' 25px',
    height : '25px'}}>{num}</span>
     
        </Main>
       </>
     
    )
}


export default Notification