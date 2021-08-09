import Header from './header';
import Footer from './footer';
import Navbar from './navbar';
import styles from './layout.module.scss';

export default function Layout({ children } : { children: any }) {
  return (
    <>
      <Header/>
      <Navbar/>
      <main id="main-content">{children}</main>
      <Footer/>
    </>
  )
}