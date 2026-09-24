import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'

type Props = {
  data: SerializedEditorState | Record<string, unknown> | null | undefined
}

export function RichText({ data }: Props) {
  if (!data) return null
  return (
    <PayloadRichText
      data={data as SerializedEditorState}
      className="[&_p]:mb-4 [&_p]:leading-relaxed [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-xl [&_h3]:font-semibold [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:underline"
    />
  )
}
