import Image from 'next/image';
import blogLogo from '@/public/blog-logo.png';
import navbarCss from '@/app/navbar.module.css';
import { Suspense } from 'react';
import Link from 'next/link';

async function Data() {
  const res = await fetch('https://dcb7a8e3-965b-4d6a-8a40-ff96b332a2fc.mock.pstmn.io/hi');

  const jsonData = await res.json();

  const { a } = jsonData;

  return <div>{a}</div>;
}

export default function Home() {
  return (
    <>
      <Suspense fallback={<div>loading...</div>}>
        <Data />
      </Suspense>
      <header className={navbarCss.navbarHeader}>
        <nav className={navbarCss.navbarLayout}>
          <div className={navbarCss.navbarCategoryArea}>
            <Link href='/'>
              <Image src={blogLogo} alt='블로그 로고' />
            </Link>
            <p>Home</p>
            <p>Post</p>
            <p>TEMPT</p>
            <p>TEMPT</p>
            <p>TEMPT</p>
          </div>
          {/* search */}
          <div className={navbarCss.navbarSearchArea}>
            <button className={navbarCss.navbarSearchBox}>
              검색
              <p className={navbarCss.navbarSearchBoxButton}>검색</p>
            </button>
            <a href='' className={navbarCss.navbarContactButton}>
              <p className={navbarCss.navbarContactButtonFont}>Contact</p>
            </a>
          </div>
        </nav>
      </header>
      <main>
        <div className='max-w-screen-xl mx-auto p-10 flex flex-row w-full'>
          {/* sidebar */}
          <div className='sticky h-[100vh] flex-shrink-0 flex-col justify-between w-72'>
            <ul>1</ul>
            <ul>2</ul>
            <ul>3</ul>
            <ul>4</ul>
            <ul>5</ul>
          </div>
          <article className='w-full'>2</article>
          <p>HIHIHIHIHI</p>
        </div>
      </main>
    </>
  );
}
