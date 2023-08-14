import { createClient } from '../../../prismicio'
import * as prismicH from '@prismicio/helpers'
import styles from './styles.module.scss'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/auth'

export default async function Posts() {
  const data = await getData()
  const session = await getServerSession(authOptions)

  return (
    <main className={styles.container}>
      <div className={styles.posts}>
        {data.props.posts.map((post) => (
          <Link
            key={post.slug}
            href={
              session?.activeSubscription
                ? `/posts/${post.slug}`
                : `/posts/preview/${post.slug}`
            }
          >
            <time>{post.updatedAt}</time>
            <strong>{post.title}</strong>
            <p>{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}

async function getData() {
  const client = createClient()
  const response = await client.getAllByType('post', {
    pageSize: 100,
  })

  const posts = response.map((post) => {
    return {
      slug: post.uid,
      title: prismicH.asText(post.data.title),
      excerpt: post.data.content[0]?.text,
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
