import React from 'react'
import Header from '../../header/Header'
import Footer from '../../components/footer/Footer'
import UserPersonsList from '../../components/user/UserPersonsList'

const UserPersonListPage = () => {
  return (
    <>
    <Header/>
    <div style={{marginTop:'80px'}} >
    <UserPersonsList/>
    </div>
    <Footer/>
    </>
  )
}

export default UserPersonListPage