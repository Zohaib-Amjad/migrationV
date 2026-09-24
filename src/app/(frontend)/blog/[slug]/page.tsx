import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getPostBySlug } from '@/lib/cms'
import { RichText } from '@/components/RichText'

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const FONT_SERIF = { fontFamily: "'Playfair Display', Georgia, serif" }

  return (
    <div className="w-full flex flex-col items-center">
      <article className="w-full max-w-[800px] px-4 md:px-0 py-15 md:py-20 flex flex-col gap-8">
        <Link href="/blog" className="text-[14px] text-[#6B6B69] hover:text-[#171A1E] w-fit">
          ← Back to Blog
        </Link>

        <header className="flex flex-col gap-4">
          {post.publishedDate ? (
            <time className="text-[13px] text-[#8A8A88] uppercase tracking-wide">
              {new Date(post.publishedDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          ) : null}
          <h1
            className="text-[32px] sm:text-[40px] md:text-[52px] font-semibold text-[#171A1E] leading-tight tracking-tight"
            style={FONT_SERIF}
          >
            {post.title}
          </h1>
          {post.excerpt ? (
            <p className="text-[18px] text-[#6B6B69] leading-relaxed">{post.excerpt}</p>
          ) : null}
        </header>

        {post.imageUrl ? (
          <div className="relative w-full aspect-[16/9] rounded-[12px] overflow-hidden bg-[#EDEDEA]">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 800px) 100vw, 800px"
              priority
            />
          </div>
        ) : null}

        {post.content ? (
          <div className="prose prose-neutral max-w-none text-[#171A1E]">
            <RichText data={post.content} />
          </div>
        ) : null}
      </article>
    </div>
  )
}
