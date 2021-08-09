import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <p>SiteName</p>
      <Link href="/contact">お問い合わせ</Link>
    </header>
  )
}