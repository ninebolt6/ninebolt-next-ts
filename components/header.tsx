import Link from 'next/link';

export default function Header() {
  return (
    <header className="py-4 bg-gray-800 text-center text-white">
      <div className="mx-auto max-w-screen-md xl:max-w-screen-lg">
        <Link href="/"><a className="font-semibold text-2xl tracking-tight">Ninebolt</a></Link>
        <p>気まぐれ更新ブログ</p>
      </div>
    </header>
  )
}
