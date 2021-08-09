import Header from './header';
import Footer from './footer';
import Navbar from './navbar';
import styles from './layout.module.scss';

export default function Layout({ children } : { children: any }) {
  return (
    <>
      <Header/>
      <Navbar/>
      <main className="mx-auto my-4 max-w-screen-md xl:max-w-screen-lg">{children}</main>
      <Footer/>
    </>
  )
}