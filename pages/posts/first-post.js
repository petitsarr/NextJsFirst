import Head from 'next/head';
import Link from 'next/link';
import layout from '../../components/layout';
const  FirstPost = () => {
    return (
       <layout>
        <Head>
          <title>MY FIRST POST </title>
       </Head>
        <h1>My first post </h1>
          <h2>
           <Link href="/">
            <a>BACK TO HOME</a>
           </Link>
          </h2>
       </layout>         
    )
}
export default FirstPost ;