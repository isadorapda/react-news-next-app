import { Content } from '@prismicio/client'
import { SliceComponentProps, PrismicRichText } from '@prismicio/react'

/**
 * Props for `Content`.
 */
export type ContentProps = SliceComponentProps<Content.ContentSlice>

/**
 * Component for "Content" Slices.
 */
const Content = ({ slice }: ContentProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.items[0].titlecontent} />
      <PrismicRichText field={slice.items[0].body} />
    </section>
  )
}

export default Content
