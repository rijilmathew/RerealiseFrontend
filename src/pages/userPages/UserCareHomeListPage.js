import React from 'react'
import Header from '../../header/Header'
import Footer from '../../components/footer/Footer'
import UserCareHomesList from '../../components/user/UserCareHomeList'

const UserCareHomeListPage = () => {
  return (
    <>
    <Header/>
    <div style={{marginTop:'80px'}} >
    <UserCareHomesList/>
    </div>
    <Footer/>
    </>
  )
}

export default UserCareHomeListPage