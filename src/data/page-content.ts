export type PageContentSeed = {
  slug: string
  title: string
  contentData: Record<string, unknown>
}

export const PAGE_CONTENT_SEED: PageContentSeed[] = [
  {
    slug: 'home',
    title: 'Home',
    contentData: {
      hero: {
        badge: 'ICCRC & MARA Certified',
        titleLine1: 'The Gulf’s #1',
        titleLine2: 'Trusted Immigration Consultancy',
        subtitle: 'Your Right Migration Starts With The Right Guidance',
        cta: 'Let’s Talk',
        teamAlt: 'The HOF Migration consultant team',
      },
      experience: {
        title: '6 Years of Experience in Immigration Consultancy',
        body: 'Navigate your immigration journey with experienced consultants who provide expert, end-to-end guidance for multiple destinations.',
      },
      services: {
        title: 'Immigration & Education Consultancy Services',
        explore: 'Explore all Services',
        cardCta: 'See how we can help',
      },
      stories: {
        title: 'Success Stories',
        viewAll: 'View All',
        eyebrow: 'Success Story',
        readCta: 'Read Full Story',
      },
    },
  },
  {
    slug: 'about',
    title: 'About Us',
    contentData: {
      hero: {
        eyebrow: 'About Us',
        titleLine1: 'Advice built on',
        titleLine2: 'the honest answer',
        lede: 'HOF Migration advises on skilled migration, study, family sponsorship, and investor pathways from Dubai — and declines cases it cannot genuinely help with.',
        chips: ['Founded in 2020', 'Dubai, UAE', 'ICCRC & MARA certified'],
      },
      intro: {
        title: 'Migration advice starts with what you do not qualify for.',
        paragraphs: [
          'HOF Migration is a Dubai-based consultancy that manages immigration files from the first honest assessment through the year after a decision is issued. We are registered with ICCRC and MARA and work across Canada, Australia, the UK, the US, and Europe.',
          'The company was built around one observation: most people do not fail because they are ineligible. They fail because nobody told them early enough and clearly enough which route was right for them, or because the file was sent without saying what it needed to say.',
          'That is why the first conversation is an assessment, not a sales pitch. If the answer is that you need to wait six months, retake a test, or that we are not the right team for your case, that is the answer you get. It costs us short-term work, but it is the only way to make the process worth the effort.',
        ],
      },
      stats: [
        ['6', 'years of Gulf immigration advisory experience'],
        ['5', 'destination systems we work with internally'],
        ['2', 'regulatory bodies we are accredited with — ICCRC and MARA'],
        ['1', 'assessment before any commitment, always'],
      ],
      leadership: {
        title: 'Leadership',
        body: 'The people responsible for the cases the firm takes on and how they are managed.',
      },
      team: {
        title: 'Our Core Team',
        body: 'The people who manage case files on a day-to-day basis.',
      },
      profileLink: 'Read the full profile',
      brandmarkCaption: 'Founded in Dubai · 2020',
    },
  },
  {
    slug: 'contact',
    title: 'Contact Us',
    contentData: {
      hero: {
        eyebrow: 'Contact',
        titleLine1: 'Speak with a Licensed',
        titleLine2: 'Immigration Consultant',
        lede: 'We review your profile honestly, outline your eligible pathways, and explain every step before any fee is discussed.',
      },
      cards: [
        { eyebrow: 'Email Us', title: 'General Inquiries', body: 'Detailed profile assessments and general queries.', value: 'info@hofmigration.com', href: 'mailto:info@hofmigration.com' },
        { eyebrow: 'Call Us', title: 'Direct Line', body: 'Speak with our client liaison team during UAE office hours.', value: '+971 4 000 0000', href: 'tel:+97140000000' },
        { eyebrow: 'Instant Chat', title: 'WhatsApp Direct', body: 'Quick questions and document verification status.', value: '+971 50 000 0000', href: 'https://wa.me/971500000000' },
      ],
      officesTitle: 'Our Global Presence',
    },
  },
  {
    slug: 'services',
    title: 'Services',
    contentData: {
      hero: {
        eyebrow: 'Services',
        titleLine1: 'Immigration and',
        titleLine2: 'education advisory services',
        lede: 'Five services, each built around a different question: are you eligible, where are you truly competitive, and what the path looks like once a decision is made.',
        destinations: 'Canada • Australia • UK • US • Europe',
      },
      cardCta: 'See how we can help',
    },
  },
  {
    slug: 'success-stories',
    title: 'Success Stories',
    contentData: {
      pageLabel: 'Success Stories',
      hero: {
        titleLine1: 'The People Behind',
        titleLine2: 'the Applications',
        lede: 'Four journeys told as they happened — including the parts that went wrong at first. Names and details are used with their permission.',
        destinations: 'Canada · United States · United Kingdom · Australia',
        countLabel: 'stories',
      },
      storyEyebrow: 'Success story',
      storyCta: 'Read the full story',
      watchStory: 'Watch {name}’s story',
    },
  },
  {
    slug: 'blog',
    title: 'Blog',
    contentData: {
      eyebrow: 'Blog',
      titleLine1: 'Immigration',
      titleLine2: 'Insights',
      lede: 'Guides, updates, and practical advice for your migration journey.',
      empty: 'No published posts yet. Add posts in the Payload admin.',
      readMore: 'Read More →',
    },
  },
]
