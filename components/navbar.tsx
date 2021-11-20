import styles from './navbar.module.scss';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className={`${styles.navbar} bg-gray-200`}>
      <div className="mx-auto max-w-screen-md xl:max-w-screen-lg">
        <ul className="flex justify-evenly">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/profile">Profile</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  )
}