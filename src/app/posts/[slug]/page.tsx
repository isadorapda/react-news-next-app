import * as prismicH from '@prismicio/helpers'
import { PrismicRichText } from '@prismicio/react'
import { createClient } from '../../../../prismicio'
import styles from '../post.module.scss'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/app/lib/auth'

export default async function Post({
  params: { slug },
}: {
  params: { slug: string }
}) {
  const session = await getServerSession(authOptions)
  const data = await getData(slug)
  if (!session?.activeSubscription) {
    return redirect(`/posts/preview/${slug}`)
  }
  return (
    <main className={styles.container}>
      <article className={styles.post}>
        <h1>{data.props.post.title}</h1>
        <time>{data.props.post.updatedAt}</time>
        <PrismicRichText field={data.props.post.content} />
      </article>
    </main>
  )
}

async function getData(slug: string) {
  const client = createClient()
  const response = await client.getByUID('post', slug, {})

  const post = {
    slug,
    title: prismicH.asText(response.data.title),
    content: response.data.content,
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
