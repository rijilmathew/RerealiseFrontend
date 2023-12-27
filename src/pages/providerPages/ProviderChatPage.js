import React from "react";
import AdminHeader from "../../components/provider/AdminHeader";
import Footer from "../../components/footer/Footer";
import ChatApp from "../../components/chat/ProviderMessages";

const ProviderChatPage =()=>{

    return(
        <>
         <AdminHeader/>
         <div style={{marginTop:'65px'}}>
          <ChatApp/>
         </div>
        
         <Footer/>

        </>
    )

}

export default ProviderChatPage