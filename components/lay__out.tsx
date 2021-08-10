import Header from './hea__der';
import Footer from './foo__ter';
import Navbar from './nav__bar';

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