import React from 'react'
import AdminHeader from '../../components/provider/AdminHeader'
import BookingListComponent from '../../components/provider/BookingListComponent '
import Footer from '../../components/footer/Footer'

const ProviderBookingListPage = () => {
  return (
    <>
    <AdminHeader/>
    <div style={{marginTop:'65px'}}>
    <BookingListComponent/>
    </div>
    <Footer/>
    </>
  )
}

export default ProviderBookingListPage