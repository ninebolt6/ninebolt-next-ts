import styles from './navbar.module.scss';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className={`${styles.navbar} bg-gray-200`}>
      <li className="flex">
        <ul><Link href="/">Home</Link></ul>
        <ul><Link href="/profile">Profile</Link></ul>
        {/* <ul><Link href="/lesson">Lesson</Link></ul>
        <ul><Link href="/event">Event</Link></ul>
        <ul><Link href="/lesson-room">Lesson Room</Link></ul> */}
        <ul><Link href="/contact">Contact</Link></ul>
      </li>
    </nav>
  )
}