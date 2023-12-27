import React from 'react'
import Header from '../../header/Header'
import Footer from '../../components/footer/Footer'
import UserProfile from '../../components/user/UserProfile'

const UserProfilePage = () => {
  return (
    <>
    <Header/>
    <div style={{marginTop:'65px'}} >
    <UserProfile/>
    </div>
    <Footer/>
    </>
  )
}

export default UserProfilePage