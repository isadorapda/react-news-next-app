// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from '@prismicio/client'

type Simplify<T> = {
  [KeyType in keyof T]: T[KeyType]
}
/** Content for Post documents */
interface PostDocumentData {
  /**
   * Title field in *Post*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: post.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  title: prismic.RichTextField
  /**
   * Content field in *Post*
   *
   * - **Field Type**: Rich Text
   * - **Placeholder**: *None*
   * - **API ID Path**: post.content
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/rich-text-title
   *
   */
  content: prismic.RichTextField
  /**
   * Slice Zone field in *Post*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: post.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/core-concepts/slices
   *
   */
  slices: prismic.SliceZone<PostDocumentDataSlicesSlice>
  /**
   * Meta Description field in *Post*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: post.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_description: prismic.KeyTextField
  /**
   * Meta Image field in *Post*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: post.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/image
   *
   */
  meta_image: prismic.ImageField<never>
  /**
   * Meta Title field in *Post*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: post.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/core-concepts/key-text
   *
   */
  meta_title: prismic.KeyTextField
}
/**
 * Slice for *Post → Slice Zone*
 *
 */
type PostDocumentDataSlicesSlice = never
/**
 * Post document from Prismic
 *
 * - **API ID**: `post`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/core-concepts/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PostDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithUID<Simplify<PostDocumentData>, 'post', Lang>
export type AllDocumentTypes = PostDocument
declare module '@prismicio/client' {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig
    ): prismic.Client<AllDocumentTypes>
  }
  namespace Content {
    export type {
      PostDocumentData,
      PostDocumentDataSlicesSlice,
      PostDocument,
      AllDocumentTypes,
    }
  }
}
