import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <hr className="my-2"/>
      <div className="mx-auto max-w-screen-md xl:max-w-screen-lg text-center">
        <Link href="/privacy"><a className="my-2">プライバシーポリシー</a></Link>
        <p className="my-2">Copyright © 2021 Ninebolt</p>
      </div>
    </footer>
  )
}