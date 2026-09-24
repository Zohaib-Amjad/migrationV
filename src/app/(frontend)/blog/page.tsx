import Image from 'next/image'
import Link from 'next/link'

import { getPosts } from '@/lib/cms'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const posts = await getPosts(50)
  const FONT_SERIF = { fontFamily: "'Playfair Display', Georgia, serif" }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[1235px] px-4 md:px-0 py-15 md:py-20 flex flex-col gap-12">
        <div className="flex flex-col gap-3 text-center max-w-[720px] mx-auto">
          <span className="text-[11px] md:text-[16px] font-medium text-[#000000] tracking-widest uppercase">
            [Blog]
          </span>
          <h1 className="text-[34px] sm:text-[44px] md:text-[64px] font-semibold text-[#171A1E] leading-tight tracking-tight">
            Immigration{' '}
            <span style={FONT_SERIF} className="italic font-semibold">
              Insights
            </span>
          </h1>
          <p className="text-[16px] md:text-[18px] text-[#6B6B69] leading-relaxed">
            Guides, updates, and practical advice for your migration journey.
          </p>
        </div>

        {posts.length === 0 ? (
          <p className="text-center text-[#6B6B69] text-[16px] py-20">
            No published posts yet. Add posts in the{' '}
            <Link href="/admin/collections/posts" className="underline text-[#171A1E]">
              Payload admin
            </Link>
            .
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            {posts.map((post) => (
              <article key={post.id} className="flex flex-col gap-4 group">
                <Link
                  href={`/blog/${post.slug}`}
                  className="w-full relative aspect-[4/3] rounded-[12px] overflow-hidden bg-[#EDEDEA]"
                >
                  {post.imageUrl ? (
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#EDEDEA]" />
                  )}
                </Link>
                {post.publishedDate ? (
                  <time className="text-[13px] text-[#8A8A88]">
                    {new Date(post.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                ) : null}
                <h2 className="text-[20px] md:text-[24px] font-medium text-[#171A1E] leading-snug">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                {post.excerpt ? (
                  <p className="text-[15px] text-[#6B6B69] leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                ) : null}
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-[15px] font-medium text-[#171A1E] hover:underline"
                >
                  Read More →
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
