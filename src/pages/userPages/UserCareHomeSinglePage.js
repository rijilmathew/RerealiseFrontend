import React from 'react'
import Header from '../../header/Header'
import CareHomeSingleView from '../../components/user/CareHomeSingleView'
import Footer from '../../components/footer/Footer'

const UserCareHomeSinglePage = () => {
  return (
    <>
    <Header/>
    <div style={{marginTop:'65px'}} >
    <CareHomeSingleView/>
    </div>
    <Footer/>
    </>
  )
}

export default UserCareHomeSinglePage