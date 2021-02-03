import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head' ;
import Date from '../../components/date' ;
import utilStyles from '../../styles/utils.module.css'

/*
La page de publication utilise maintenant la fonction getPostData
 in getStaticProps pour obtenir les données de publication et les renvoyer comme accessoires.
*/
export async function getStaticProps(props) {
    const params = props.params ;
  const postData = getPostData(params.id)
  return {
    props: {
      postData : postData
    }
  } 
}
// paths contient le tableau des chemins connus renvoyés par getAllPostIds(). 
// On retourne une liste de valeur possible for id..
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths  : paths,
    fallback: false 
  }
}


export default function Post(props) {
    const postData = props.postData ;
    return (
      <Layout>
        <Head>
          <title>{postData.title}</title>
        </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>
            <Date dateString={postData.date} />
          </div>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </article>
      </Layout>
    )
  }