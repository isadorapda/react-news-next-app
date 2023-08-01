import * as prismicH from '@prismicio/helpers'
import styles from '../../post.module.scss'
import { createClient } from '../../../../../prismicio'
import { Markup } from 'interweave'
import { polyfill } from 'interweave-ssr'
import Link from 'next/link'
import { authOptions } from '@/app/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

polyfill()

export default async function PostPreview({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const data = await getData(slug)
  const session = await getServerSession(authOptions)

  if (session?.activeSubscription) {
    return redirect(`/posts/${slug}`)
  }

  return (
    <main className={styles.container}>
      <article className={styles.post}>
        <h1>{data.props.post.title}</h1>
        <time>{data.props.post.updatedAt}</time>
        <div className={styles.preview}>
          <Markup content={data.props.post.content} tagName="div" />
        </div>
        <div className={styles.continueReading}>
          To read the full content
          <Link href={'/'}>subscribe now 🤗</Link>
        </div>
      </article>
    </main>
  )
}

export async function getData(slug: string) {
  const client = createClient()
  const response = await client.getByUID('post', slug, {})

  const post = {
    slug,
    title: prismicH.asText(response.data.title),
    content: prismicH.asHTML(response.data.content.splice(0, 5)),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      'en-GB',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }
    ),
  }

  return {
    props: { post },
  }
}
export const revalidate = 60 * 30 // 30 min
