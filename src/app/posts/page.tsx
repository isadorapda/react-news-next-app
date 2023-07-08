import { createClient } from '../../../prismicio'
import * as prismicH from '@prismicio/helpers'
import styles from './styles.module.scss'

export default async function Posts() {
  const data = await getData()

  return (
    <main className={styles.container}>
      <div className={styles.posts}>
        {data.props.posts.map((post) => (
          <a key={post.slug} href="">
            <time>{post.updatedAt}</time>
            <strong>{post.title}</strong>
            <p>{post.excerpt}</p>
          </a>
        ))}
      </div>
    </main>
  )
}

export async function getData() {
  const client = createClient()
  const response = await client.getAllByType('post', {
    fetch: ['post.title', 'post.content'],
    pageSize: 100,
  })

  const posts = response.map((post) => {
    return {
      slug: post.uid,
      title: prismicH.asText(post.data.title),
      excerpt: prismicH.asText(post.data.content),
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'en-GB',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        }
      ),
    }
  })

  return {
    props: { posts },
  }
}
