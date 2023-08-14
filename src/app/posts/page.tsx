import { createClient } from '../../../prismicio'
import * as prismicH from '@prismicio/helpers'
import styles from './styles.module.scss'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '../lib/auth'

async function getPosts() {
  const client = createClient()
  const response = await client.getAllByType('post', {
    pageSize: 100,
  })
  console.log('VAVAVAVAVAVAV', response[0].data)

  const posts = response.map((post) => {
    return {
      slug: post.uid,
      title: prismicH.asText(post.data.title),
      excerpt: post.data.summary,
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
  //   console.log(posts)

  return {
    props: { posts },
  }
}

export default async function Posts() {
  const data = await getPosts()
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
