import fs from 'fs'
import path from 'path'
import matter from 'gray-matter' ;
import remark from 'remark' ;
import html from 'remark-html' ;

const postsDirectory = path.join(process.cwd(), 'posts') ;

// cette fonction récupére les données de mes deux fichiers .md
export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}
// cette fonction renvoie la liste des noms de fichiers(à l'execution .md) dans le dossier post
/*
Chaque objet doit avoir la paramsclé et contenir un objet avec la clé id 
(car nous utilisons [id]dans le nom du fichier). Sinon, getStaticPaths échouera.
*/
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map( fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}
// cette fonction renvoi les données de publication en fonction de l'id
export function getPostData(id) {
  const fullPath = path.join(postsDirectory,`${id}.md`)
  const fileContents = fs.readFileSync(fullPath,'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with the id
  return {
    id,
    ...matterResult.data
  }
}

/*
getAllPostIds(qui est utilisé par getStaticPaths)
 peut récupérer à partir d'un point de terminaison d'API
export async function getAllPostIds() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..')
  const posts = await res.json()
  return posts.map(post => {
    return {
      params: {
        id: post.id
      }
    }
  })
}
*/