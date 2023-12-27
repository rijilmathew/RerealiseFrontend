import React from 'react'
import AdminHeader from '../../components/provider/AdminHeader'
import ProviderPersonSingleView from '../../components/provider/ProviderPersonSingleView'
import Footer from '../../components/footer/Footer'

const ProviderPersonSingleViewPage = () => {
  return (
    <>
    <AdminHeader/>
    <div style={{marginTop:'65px'}}>
    <ProviderPersonSingleView/>
    </div>
    <Footer/>
    </>
  )
}

export default ProviderPersonSingleViewPage