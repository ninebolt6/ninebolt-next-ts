import Header from './header';
import Footer from './footer';
import Navbar from './navbar';

export default function Layout({ children } : { children: any}) {
  return (
    <>
      <Header/>
      <Navbar/>
      <main>{children}</main>
      <Footer/>
    </>
  )
}