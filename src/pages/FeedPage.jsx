import React from 'react';
import { Navigate } from 'react-router-dom';
import Tabs from '../layout/Tabs';
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";


const FeedPage = () => {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" />;
  }
  return (
    <><Tabs></Tabs></>
  )
}

export default FeedPage;
