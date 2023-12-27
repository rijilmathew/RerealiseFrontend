import React from 'react'
import AdminHeader from '../../components/provider/AdminHeader'
import Footer from '../../components/footer/Footer'
import ProviderCareHomeSingleView from '../../components/provider/ProviderCareHomeSingleView'

const ProviderCareHomeSinglePage = () => {
  return (
    <>
    <AdminHeader/>
    <div style={{marginTop:'65px'}}>
    <ProviderCareHomeSingleView/>
    </div>
    <Footer/>
    </>
  )
}

export default ProviderCareHomeSinglePage