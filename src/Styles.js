// import React from 'react';
import styled from 'styled-components';

export const Form = styled.form`
  background: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 30%;
  padding: 1rem;
  gap: 1rem;
  @media screen and (max-width: 767px) {
      padding: 1.5rem;
      width: 70%
  }
`;

export const FormDiv = styled.div`
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`

export const Input = styled.input`
  width: 80%;
  border: none;
  border-bottom: 1px solid black;
  padding: 0.5rem;
  @media screen and (max-width: 767px) {
      width: 100%;
  }
`

export const FormBtn = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0.5rem;
  border: none;
  font - size: 14px;
  color: #F5F5DC;
  margin-top: 1rem;
  cursor: pointer;
`

export const H1 = styled.h1`
  color: #7272df;
  margin-bottom: 1rem;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 24px;
  @media screen and (max-width: 767px) {
      font-size: 20px
  }
`

export const P = styled.p`
  margin-top: 1rem
`