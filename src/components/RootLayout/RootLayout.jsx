import { Divider } from '@mui/material'
import Footer from '../Footer'
import Header from '../Header'
import { Outlet } from 'react-router-dom'

export default function RootLayout() {
return (
    <>
        <Header />
        <Divider/>
        <Outlet/>
        <Divider/>
        <Footer/>
       
    </>
  )
}
