import React from 'react'
import Header from "components/headers/light.js";
import "../App.css";

export default function Home() {
  return (
    <div className='home'>
      <div className='container'>
      <Header></Header>
      <h1 className='h1' >Hoş Geldiniz</h1>
      </div>      
    </div>
  )
}
