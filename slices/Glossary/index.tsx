import { Content } from '@prismicio/client'
import { SliceComponentProps, PrismicRichText } from '@prismicio/react'

/**
 * Props for `Glossary`.
 */
export type GlossaryProps = SliceComponentProps<Content.GlossarySlice>

/**
 * Component for "Glossary" Slices.
 */
const Glossary = ({ slice }: GlossaryProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.items[0].titleglossary} />
      <PrismicRichText field={slice.items[0].contentglossary} />
    </section>
  )
}

export default Glossary
