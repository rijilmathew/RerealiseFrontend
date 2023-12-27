import React from 'react'
import Header from '../../header/Header'
import UserPersonSingleView from '../../components/user/UserPersonSingleView'
import Footer from '../../components/footer/Footer'

const UserPersonSinglePage = () => {
  return (
    <>
    <Header/>
    <div style={{marginTop:'65px'}} >
    <UserPersonSingleView/>
    </div>
    <div  style={{marginTop:'50px'}}>
    <Footer/>
    </div>
    </>
  )
}

export default UserPersonSinglePage