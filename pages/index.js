import Head from 'next/head';
import Link from 'next/link'
import Date from '../components/date' ;
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css'; 

import { getSortedPostsData } from '../lib/posts' ;

export const getStaticProps =  async () => {
  //Get all Posts in allPostsData......
  const allPostsData = getSortedPostsData() ;
  return {
    props: {
      allPostsData : allPostsData
    }
  }
}

const Home = (props)  => {
  const allPostsData =  props.allPostsData ;
  console.log(allPostsData)
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello I'm <strong>Petit</strong>.I'm software developer..... You can contact me on <a className= {utilStyles.mya} href="https://github.com/petitsarr " target="_blank"> Github</a></p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a className= {utilStyles.mya} href="https://nextjs.org/learn">Our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>BLOG OF JO as PETIT </h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
      </Layout>
  )
}
export default Home;