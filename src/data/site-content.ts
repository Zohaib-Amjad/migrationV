export interface ServiceNode {
  title: string
  desc: string
  tag: string
}

export interface ServiceGroup {
  code: string
  name: string
  nodes: [string, string, string][] // [title, desc, tag]
}

export interface ServiceType {
  code: string
  name: string
  desc: string
  badges: [string, string][] // [key, val]
}

export interface ServiceItem {
  slug: string
  routeSlug: string
  navName: string
  title: string
  short: string
  accent: string
  tint: string
  image: string
  alt: string
  plate: [string, string]
  lede: string
  chips: string[]
  cardText: string
  groups: {
    code: string
    name: string
    nodes: [string, string, string][]
  }[]
  types: [string, string, string, [string, string][]][]
}

export interface SuccessStoryItem {
  slug: string
  routeSlug: string
  name: string
  headline: string
  route: string
  caption: string
  excerpt: string
  facts: [string, string][]
  quote: string
  prose: [string, string][]
}

export interface TeamMemberItem {
  slug: string
  routeSlug: string
  name: string
  initials: string
  role: string
  mono: string
  short: string
  facts: [string, string][]
  prose: [string, string][]
}

export const HERO_STATS = [
  { value: '4,200+', label: 'Visas Approved' },
  { value: '98.4%', label: 'Success Rate' },
  { value: '45+', label: 'Countries Covered' },
  { value: '15+', label: 'Years Combined Experience' },
]

export const ABOUT_STATS: [string, string][] = [
  ['6', 'Years advising on migration from the Gulf'],
  ['5', 'Destination systems worked on in-house'],
  ['2', 'Regulatory bodies we are certified by — ICCRC and MARA'],
  ['1', 'Assessment before any engagement, always'],
]

export const HELP_STEPS: [string, string][] = [
  [
    'Profile assessment',
    'We assess your file the way immigration authorities will — age, qualifications, work experience, language results, and the practical picture before discussing any fees.',
  ],
  [
    'Choose the destination and region',
    'Country and province demand shifts over time. We match your profile to the places where you are genuinely competitive, not just the most familiar options.',
  ],
  [
    'Map the route',
    'You get the pathways available to you now, plus the one or two changes that could open the next best option — a language retest, skills assessment, or a few extra months of experience.',
  ],
  [
    'Prepare and submit',
    'We collect, review, and file the documents, language results, police certificates, and supporting evidence while we manage the timeline for you.',
  ],
  [
    'After the decision',
    'Landing, obligations, dependants, and the next move — this is where most advice falls short, and where good planning makes the difference.',
  ],
]

export const SERVICES: ServiceItem[] = [
  {
    slug: 'service-skilled-migration',
    routeSlug: 'skilled-migration',
    navName: 'Skilled Migration',
    title: 'Skilled Migration to Canada & Australia',
    short: 'Skilled Migration',
    accent: '#0095ff',
    tint: '#dfedf7',
    image: '/assets/services-v2/skilled-migration.jpg',
    alt: 'Toronto skyline, Canada',
    plate: ['Canada & Australia', 'Two points-based systems with very different strategies'],
    lede:
      'Canada and Australia select skilled migrants by score, but the winning threshold shifts as labour demand changes. The task is to read your file honestly and then choose the stream and region where your profile is genuinely competitive.',
    chips: ['Points-based', 'Permanent residence', 'Family inclusion'],
    cardText:
      'Express Entry, provincial streams, and Australian skilled categories — aligned to your real score and practical route, not a marketing script.',
    groups: [
      {
        code: 'CA',
        name: 'Canada',
        nodes: [
          [
            'Express Entry',
            'The federal competition groups three programs together into one CRS score and runs draws every couple of weeks.',
            'FSW • CEC • FST',
          ],
          [
            'Provincial Nominee Program',
            'Your province picks you based on shortage in its labour market. A nomination adds 600 points and often makes the invitation inevitable.',
            '11 provinces',
          ],
          [
            'Atlantic Immigration Program',
            'An employer-led route for New Brunswick, Nova Scotia, Prince Edward Island, and Newfoundland and Labrador, without a points test.',
            'Employer-led',
          ],
        ],
      },
      {
        code: 'AU',
        name: 'Australia',
        nodes: [
          [
            'Skilled Independent',
            'Permanent residence from day one, no sponsor and no regional obligation. The hardest of the three to reach.',
            'Subclass 189',
          ],
          [
            'Skilled Nominated',
            'A state or territory nominates you and adds five points; you then commit to living there.',
            'Subclass 190',
          ],
          [
            'Skilled Regional (491)',
            'A temporary visa for five years in specific regional areas, with a clear route to permanent residence.',
            'Subclass 491',
          ],
        ],
      },
    ],
    types: [
      [
        'FSW',
        'Skilled Worker',
        'The main Express Entry route for applicants with foreign work experience and no Canadian job offer. Your CRS score decides everything.',
        [
          ['Route', 'Express Entry'],
          ['Decision', 'CRS score'],
          ['Outcome', 'Permanent residence'],
        ],
      ],
      [
        'CEC',
        'Canadian Experience Class',
        'For applicants who already hold Canadian skilled work experience. The language bar is lower and there is no proof of funds requirement.',
        [
          ['Requirement', 'One year in Canada'],
          ['Route', 'Express Entry'],
          ['Outcome', 'Permanent residence'],
        ],
      ],
      [
        'PNP',
        'Provincial Nominee Program',
        'Each province runs its own stream based on labour need. Some pull directly from the Express Entry pool; others accept applications separately.',
        [
          ['Adds', '600 CRS points'],
          ['Link', 'Provincial nomination'],
          ['Outcome', 'Permanent residence'],
        ],
      ],
      [
        '189',
        'Skilled Independent',
        'An Australian points-based visa without a sponsor. Permanent on approval, with no regional living obligation.',
        [
          ['Minimum', '65 points'],
          ['Sponsor', 'None'],
          ['Outcome', 'Permanent residence'],
        ],
      ],
      [
        '190',
        'Skilled Nominated',
        'A permanent visa nominated by a state or territory. Nomination adds five points and typically requires your occupation to be on that state list.',
        [
          ['Adds', '5 points'],
          ['Commitment', 'State or territory'],
          ['Outcome', 'Permanent residence'],
        ],
      ],
      [
        '491',
        'Skilled Regional (491)',
        'A temporary visa in specific regional areas, sponsored by a state or eligible relative, and convertible after three years.',
        [
          ['Adds', '15 points'],
          ['Validity', '5 years'],
          ['Then', 'Subclass 191'],
        ],
      ],
    ],
  },
  {
    slug: 'service-study-abroad',
    routeSlug: 'study-abroad',
    navName: 'Study Abroad',
    title: 'Study Abroad & Student Visas',
    short: 'Study Abroad',
    accent: '#ff5900',
    tint: '#f7e9df',
    image: '/assets/services-v2/study-abroad.jpg',
    alt: 'Graduate in cap and gown',
    plate: ['Five study destinations', 'Course, institution, and visa are chosen as one decision'],
    lede:
      'A student visa should be built around the study plan behind it. We work backwards from where you want to land — the course, the institution, and the work rights after study — and only then prepare the application.',
    chips: ['Course selection', 'Post-study work', 'Dependants where allowed'],
    cardText:
      'Australia, the UK, Canada, Germany, and the US — with the post-study work route mapped before the application is filed.',
    groups: [
      {
        code: 'AU',
        name: 'Australia',
        nodes: [
          [
            'Student visa',
            'Covers the full course length, with work rights while studying and a graduate pathway after.',
            'Subclass 500',
          ],
          [
            'Temporary Graduate',
            'A post-study work visa, with its duration tied to qualification level.',
            'Subclass 485',
          ],
        ],
      },
      {
        code: 'UK',
        name: 'United Kingdom',
        nodes: [
          [
            'Student visa',
            'Issued by a licensed education provider through a CAS, with maintenance funds held for 28 days.',
            'CAS required',
          ],
          [
            'Graduate route',
            'Two years of work without sponsorship after a UK degree, or three after a doctorate.',
            '2–3 years',
          ],
        ],
      },
      {
        code: 'CA',
        name: 'Canada',
        nodes: [
          [
            'Study permit',
            'Requires a valid letter of acceptance from a designated institution and a study plan.',
            'PAL required',
          ],
          [
            'Post-graduation work permit',
            'Up to three years of open work, which is the usual bridge to the Canadian experience class.',
            'Up to 3 years',
          ],
        ],
      },
      {
        code: 'DE',
        name: 'Germany',
        nodes: [
          [
            'National student visa',
            'A Type D visa backed by a blocked account, then converted to a residence permit after arrival.',
            'Type D',
          ],
        ],
      },
      {
        code: 'US',
        name: 'United States',
        nodes: [
          [
            'F-1 student visa',
            'Issued on the basis of an SEVP-certified school I-20, with the visa interview often being the real hurdle.',
            'I-20 • SEVIS',
          ],
        ],
      },
    ],
    types: [
      [
        '500',
        'Australian Student Visa',
        'Granted for the duration of the course. Work rights apply while studying, and the need for a coherent study plan matters a lot.',
        [
          ['Work', '48 hours / fortnight'],
          ['Family', 'Dependants allowed'],
          ['Then', 'Subclass 485'],
        ],
      ],
      [
        '485',
        'Temporary Graduate Visa',
        'Post-study work rights for graduates of Australian institutions, with the duration depending on qualification level.',
        [
          ['Validity', '2–4 years'],
          ['Work', 'Unrestricted'],
          ['Route', 'After study'],
        ],
      ],
      [
        'UK',
        'UK Student Visa',
        'Study at a licensed institution. Maintenance funds must be held for 28 consecutive days before the application.',
        [
          ['Sponsor', 'CAS'],
          ['Funds', '28-day rule'],
          ['Then', 'Graduate route'],
        ],
      ],
      [
        'CA',
        'Canadian Study Permit',
        'Requires an offer of admission from a designated learning institution and, in most provinces, a provincial support letter.',
        [
          ['Work', '24 hours / week'],
          ['Family', 'Spouse can work'],
          ['Then', 'PGWP'],
        ],
      ],
      [
        'DE',
        'German Student Visa',
        'A visa issued in exchange for proof of funds held in a blocked account, then converted to a residence permit on local registration.',
        [
          ['Funds', 'Blocked account'],
          ['Tuition', 'Public sector: low'],
          ['Then', 'Job seeker visa'],
        ],
      ],
      [
        'F-1',
        'US F-1 Visa',
        'Academic study on the basis of an I-20. Optional practical training follows the degree and may be extended in STEM fields.',
        [
          ['Work', 'On campus'],
          ['After', 'OPT 12 months'],
          ['STEM', '+24 months'],
        ],
      ],
    ],
  },
  {
    slug: 'service-family-sponsorship',
    routeSlug: 'family-sponsorship',
    navName: 'Family Sponsorship',
    title: 'Family Sponsorship & Reunification',
    short: 'Family Sponsorship',
    accent: '#179b66',
    tint: '#f0f9f4',
    image: '/assets/services-v2/family-sponsorship.jpg',
    alt: 'Family portrait outdoors',
    plate: ['Bring the family together', 'Evidence of relationship, prepared properly, is what decides these cases'],
    lede:
      'Family cases do not win on templates. They win on evidence that a stranger can follow — and that is the part most applicants underestimate, and the part we spend the most time on.',
    chips: ['Spouse & partner', 'Parents', 'Dependent children'],
    cardText:
      'Spouse, parent, and child sponsorship in Canada and Australia, built around the real evidence these applications rely on.',
    groups: [
      {
        code: 'CA',
        name: 'Canada',
        nodes: [
          [
            'Spouse or partner',
            'Inland or outland sponsorship for a spouse, common-law partner, or conjugal partner, with open work rights while the application is pending.',
            'Inland • Outland',
          ],
          [
            'Parents and grandparents',
            'A capped sponsorship pool with a yearly intake, plus the super visa as a reliable bridge option.',
            'Annual cap',
          ],
          [
            'Dependent children',
            'Sponsorship for children under 22 who are unmarried and not in a common-law relationship.',
            'Under 22',
          ],
        ],
      },
      {
        code: 'AU',
        name: 'Australia',
        nodes: [
          [
            'Partner visa',
            'A two-stage visa — temporary then permanent after two years — filed inside or outside the country.',
            '820/801 • 309/100',
          ],
          [
            'Parent visa',
            'A contributory or non-contributory route, with a much shorter wait on the contributory track for a much higher fee.',
            '103 • 143',
          ],
          [
            'Child visa',
            'For a dependent child of an Australian citizen, permanent resident, or eligible New Zealand citizen.',
            '101 • 802',
          ],
        ],
      },
    ],
    types: [
      [
        'CA',
        'Spousal sponsorship (Canada)',
        'Outland applications are filed through a visa office abroad; inland applications allow open work rights while waiting, but they limit travel.',
        [
          ['Commitment', '3 years'],
          ['Inland', 'Open work rights'],
          ['Outcome', 'Permanent residence'],
        ],
      ],
      [
        'PGP',
        'Parents and grandparents',
        'Invitations are drawn from a sponsorship pool, and income must be demonstrated across three tax years.',
        [
          ['Income', '3 tax years'],
          ['Commitment', '20 years'],
          ['Alternative', 'Super visa'],
        ],
      ],
      [
        'DC',
        'Dependent child',
        'The case is straightforward when custody is clear; most complications arise when the second parent must agree.',
        [
          ['Age', 'Under 22'],
          ['Need', 'Proof of dependency'],
          ['Outcome', 'Permanent residence'],
        ],
      ],
      [
        '820',
        'Partner visa (Australia)',
        'Granted first on a temporary basis, then reassessed for permanent residence after two years. The same evidence supports both stages.',
        [
          ['Stage 1', 'Temporary'],
          ['Stage 2', '+2 years'],
          ['Work', 'Full rights'],
        ],
      ],
      [
        '143',
        'Contributory parent visa',
        'Much faster than the non-contributory list but with a substantially higher fee.',
        [
          ['Wait', 'Shorter'],
          ['Cost', 'Higher'],
          ['Outcome', 'Permanent residence'],
        ],
      ],
      [
        '101',
        'Child visa (Australia)',
        'A permanent visa for a dependent child, usually filed outside the country, with onshore options in some cases.',
        [
          ['Filed', 'Outside Australia'],
          ['Onshore', 'Subclass 802'],
          ['Outcome', 'Permanent residence'],
        ],
      ],
    ],
  },
  {
    slug: 'service-usa-visas',
    routeSlug: 'usa-visas',
    navName: 'USA Visas',
    title: 'US NIW & Investor Visas',
    short: 'USA Visas',
    accent: '#6b81cf',
    tint: '#ecf1ff',
    image: '/assets/services-v2/usa-visas.jpg',
    alt: 'Statue of Liberty, USA',
    plate: ['Self-petition and investment tracks', 'Green cards and investor visas are built on evidence, not quotas'],
    lede:
      'The United States has routes that do not require a sponsoring employer. EB-2 NIW and EB-1A reward exceptional work in your field, while E-2 and EB-5 provide investment-based routes. These applications require a disciplined evidentiary case that satisfies legal thresholds.',
    chips: ['Self-petition', 'Green card', 'Investment routes'],
    cardText:
      'EB-2 NIW petitions, EB-1A extraordinary ability, E-2 treaty investor visas, and EB-5 — all built on evidence rather than a generic template.',
    groups: [
      {
        code: 'EP',
        name: 'Employment-based self-petition',
        nodes: [
          [
            'EB-2 National Interest Waiver',
            'A self-petition path that removes the need for a job offer or labour certificate, based on the national importance of your work.',
            'No employer needed',
          ],
          [
            'EB-1A Extraordinary Ability',
            'For people at the forefront of their field, proven against a defined set of criteria.',
            'Priority category',
          ],
        ],
      },
      {
        code: 'IN',
        name: 'Investment & business',
        nodes: [
          [
            'E-2 Treaty Investor',
            'A non-immigrant visa for a substantial investment in a real and active enterprise, renewable indefinitely.',
            'Treaty country',
          ],
          [
            'EB-5 Investor',
            'Permanent residence through a qualifying investment and the creation of ten full-time jobs.',
            '10 jobs',
          ],
        ],
      },
      {
        code: 'L',
        name: 'Corporate transfer',
        nodes: [
          [
            'L-1A Manager or executive',
            'Transfer to a US office of an affiliated company, with a route to permanent residence through EB-1C.',
            'Up to 7 years',
          ],
          [
            'L-1B Specialized knowledge',
            'Transfer for staff with knowledge of a company’s products, operations, or technical processes.',
            'Up to 5 years',
          ],
        ],
      },
    ],
    types: [
      [
        'NIW',
        'EB-2 National Interest Waiver',
        'The case turns on three questions: the value of your work, its national importance, and whether waiving the job offer benefits the United States.',
        [
          ['Employer', 'Not required'],
          ['Basis', 'Three-part test'],
          ['Outcome', 'Green card'],
        ],
      ],
      [
        'EB-1A',
        'Extraordinary ability',
        'Requires evidence meeting at least three out of ten criteria, followed by a final merits assessment of the whole file.',
        [
          ['Criteria', '3 out of 10'],
          ['Employer', 'Not required'],
          ['Outcome', 'Green card'],
        ],
      ],
      [
        'E-2',
        'Treaty investor',
        'The investment must be substantial relative to the business, placed at risk, and directed to a real operating enterprise rather than a passive holding.',
        [
          ['Nationality', 'Treaty country'],
          ['Renewal', 'Unlimited'],
          ['Family', 'Spouse can work'],
        ],
      ],
      [
        'EB-5',
        'Investor immigrant',
        'Direct investment or a regional center project, subject to conditions for two years before removal of conditions.',
        [
          ['Jobs', '10 full-time roles'],
          ['Conditions', '2 years'],
          ['Outcome', 'Green card'],
        ],
      ],
      [
        'L-1A',
        'Manager within the company',
        'Requires a qualifying relationship between the foreign entity and the US entity and at least one year abroad in the last three years.',
        [
          ['Outside the US', '1 of last 3 years'],
          ['Maximum', '7 years'],
          ['Then', 'EB-1C'],
        ],
      ],
      [
        'L-1B',
        'Specialized knowledge',
        'The burden of proof is showing specific knowledge of the company’s work, not only advanced experience.',
        [
          ['Outside the US', '1 of last 3 years'],
          ['Maximum', '5 years'],
          ['Family', 'Spouse can work'],
        ],
      ],
    ],
  },
  {
    slug: 'service-europe-visas',
    routeSlug: 'europe-visas',
    navName: 'Europe',
    title: 'Golden Visa & Visitor Visas in Europe',
    short: 'Europe',
    accent: '#fd0148',
    tint: '#ffe8ef',
    image: '/assets/services-v2/europe-visas.jpg',
    alt: 'Eiffel Tower, Paris',
    plate: ['Europe', 'Residence by investment, skill, or short-term travel'],
    lede:
      'Europe is not one system. Residence by investment, skilled routes, and short-stay Schengen visas all involve different evidentiary standards, and the right answer depends on what you actually want to do.',
    chips: ['Residency by investment', 'European Blue Card', 'Short Schengen visit'],
    cardText:
      'Golden visa programs, European Blue Cards, and short Schengen visas — assessed on what the residence outcome actually is.',
    groups: [
      {
        code: 'RI',
        name: 'Residence by investment',
        nodes: [
          [
            'Portugal Golden Visa',
            'Residence through a qualifying investment, with a lower physical presence requirement and a route to citizenship.',
            'Low stay days',
          ],
          [
            'Greece Golden Visa',
            'A residence permit in exchange for a property investment, renewable while the investment remains active.',
            'Property-based',
          ],
          [
            'Malta residency',
            'A residence program combining a contribution and a property condition.',
            'Contribution',
          ],
        ],
      },
      {
        code: 'SK',
        name: 'Work & talent',
        nodes: [
          [
            'European Blue Card',
            'A work permit tied to a qualified salary and recognised qualifications, often transferable across most member states.',
            'Salary threshold',
          ],
          [
            'Germany Opportunity Card',
            'An income-based residence route for job seekers, allowing time in-country to find suitable work.',
            'Points-based',
          ],
        ],
      },
      {
        code: 'C',
        name: 'Visitor',
        nodes: [
          [
            'Short Schengen visit',
            'Up to 90 days within any 180-day period across the Schengen zone for tourism, family, or business.',
            '90 / 180 days',
          ],
        ],
      },
    ],
    types: [
      [
        'PT',
        'Portugal Golden Visa',
        'Eligible investment routes now lean toward funds and business creation rather than residential property. The presence requirement stays low.',
        [
          ['Residence', 'Low requirement'],
          ['Family', 'Included'],
          ['Then', 'Citizenship route'],
        ],
      ],
      [
        'GR',
        'Greece Golden Visa',
        'Property-based residence with requirements that vary by region. The permit remains valid as long as the investment remains active.',
        [
          ['Basis', 'Property'],
          ['Renewal', 'As long as active'],
          ['Family', 'Included'],
        ],
      ],
      [
        'MT',
        'Malta residency',
        'Combines a government contribution with a lease or property purchase, assessed through a pre-screening process.',
        [
          ['Basis', 'Contribution'],
          ['Check', 'Pre-screening'],
          ['Family', 'Included'],
        ],
      ],
      [
        'EU',
        'European Blue Card',
        'Requires a recognised qualification and a job offer above the salary threshold set by the member state. Transferable after an initial period.',
        [
          ['Need', 'Job offer'],
          ['Salary', 'Threshold applies'],
          ['Then', 'Long-term residence'],
        ],
      ],
      [
        'DE',
        'Opportunity Card',
        'A points-based residence permit allowing entry to Germany to search for suitable work rather than arranging work first.',
        [
          ['Basis', 'Points'],
          ['Goal', 'Find work'],
          ['Then', 'Work permit'],
        ],
      ],
      [
        'C',
        'Short Schengen visit',
        '90 days in any rolling 180-day period across the Schengen area. Refusals usually come from weak evidence of ties or purpose.',
        [
          ['Stay', '90 / 180 days'],
          ['Area', 'Schengen'],
          ['Purpose', 'Visit • Business'],
        ],
      ],
    ],
  },
]

export const STORIES: SuccessStoryItem[] = [
  {
    slug: 'story-ahmed',
    routeSlug: 'ahmed',
    name: 'Ahmed',
    headline: 'Ahmed’s Journey to the United States',
    route: 'Manufacturing Professional · Dubai, UAE → United States',
    caption: 'Watch Ahmed’s story',
    excerpt:
      'Ahmed had been living and working in Dubai for the past 15 years in the manufacturing industry. He had been considering moving to the United States and wanted professional guidance on the right migration pathway.',
    facts: [
      ['Destination', 'United States'],
      ['Route', 'EB-2 NIW'],
      ['From', 'Dubai, UAE'],
      ['Timeline', '14 months'],
      ['Outcome', 'Petition approved'],
    ],
    quote:
      'I had read everything online and still could not tell which route was mine. The first conversation was the first time anyone told me what I did not qualify for.',
    prose: [
      [
        '',
        'Ahmed had been living and working in Dubai for the past 15 years in the manufacturing industry. He had been considering moving to the United States and wanted professional guidance on the right migration pathway. HOF Migration helped him understand his options and guided him through the process.',
      ],
      [
        'Where he started',
        'Fifteen years of process engineering, three plant commissionings and a handful of internal awards is a strong record — but it is not a record that speaks for itself on paper. The first work was separating what Ahmed had done from what could be evidenced.',
      ],
      [
        'Choosing the route',
        'An employer-sponsored route would have tied the move to a single company and a queue measured in years. The national interest waiver let him petition on his own, provided the argument held. We tested that argument before committing to it.',
      ],
      [
        'Building the file',
        'Six independent letters, a documented record of the plants his process work had improved, and a written case for why the work mattered beyond his own employer. The petition ran to a little over three hundred pages.',
      ],
      [
        'Where he is now',
        'Ahmed relocated with his family the following year. He is working in the same field, in the same role, on the other side of the world.',
      ],
    ],
  },
  {
    slug: 'story-priya',
    routeSlug: 'priya',
    name: 'Priya',
    headline: 'Priya’s Path to Canadian Permanent Residence',
    route: 'Software Engineer · Dubai, UAE → Toronto, Canada',
    caption: 'Watch Priya’s story',
    excerpt:
      'Priya had a competitive Express Entry score that was still short of the cut-off in every recent round. Rather than wait, we mapped the provincial streams where her occupation was actually in demand.',
    facts: [
      ['Destination', 'Canada'],
      ['Route', 'Express Entry • PNP'],
      ['From', 'Dubai, UAE'],
      ['Timeline', '11 months'],
      ['Outcome', 'Permanent residence'],
    ],
    quote:
      'I was twelve points short and had been told to retake my language test again. Nobody had mentioned that a province might simply want me.',
    prose: [
      [
        '',
        'Priya had spent six years as a backend engineer in Dubai and had entered the Express Entry pool on her own. Her score sat consistently below the round cut-offs, and the advice she had been given amounted to waiting and retaking tests she had already done well in.',
      ],
      [
        'Reading the score properly',
        'A CRS score is not one number — it is a set of levers with very different weights. Hers had one obvious gap and several that were not worth the effort of closing. We said so.',
      ],
      [
        'The provincial route',
        'Two provinces were running targeted draws for her occupation at the time. A nomination adds six hundred points, which ends the question of the cut-off entirely. She was nominated within four months of filing.',
      ],
      [
        'Where she is now',
        'Priya landed in Toronto the following spring and has since sponsored her parents for a visit. She is with a fintech company in the same role she held in Dubai.',
      ],
    ],
  },
  {
    slug: 'story-omar',
    routeSlug: 'omar',
    name: 'Omar',
    headline: 'Omar’s Family Reunification in Australia',
    route: 'Civil Engineer · Sharjah, UAE → Melbourne, Australia',
    caption: 'Watch Omar’s story',
    excerpt:
      'Omar had held an Australian skilled visa for two years while his wife and daughter remained in Sharjah. The partner application had already been refused once before he came to us.',
    facts: [
      ['Destination', 'Australia'],
      ['Route', 'Partner visa 309/100'],
      ['From', 'Sharjah, UAE'],
      ['Timeline', '16 months'],
      ['Outcome', 'Visa granted'],
    ],
    quote:
      'We had been married for nine years. It had not occurred to me that I would need to prove it to somebody who had never met us.',
    prose: [
      [
        '',
        'Omar moved to Melbourne on a skilled visa and filed for his wife and daughter himself. The application was refused. Nothing about the relationship was in doubt — the evidence simply did not establish it in the form the department assesses.',
      ],
      [
        'What went wrong the first time',
        'A marriage certificate and a handful of photographs. Genuine, and nowhere near enough. These cases are decided on the four strands the department names, and the first file addressed one of them.',
      ],
      [
        'Rebuilding the evidence',
        'Joint finances going back six years, correspondence, travel records, statements from family on both sides, and a written statement from each of them in their own words. Assembled to be followed by a stranger.',
      ],
      [
        'Where they are now',
        'The visa was granted and the family has been in Melbourne since. Their second child was born there.',
      ],
    ],
  },
  {
    slug: 'story-fatima',
    routeSlug: 'fatima',
    name: 'Fatima',
    headline: 'Fatima’s Student Visa to the United Kingdom',
    route: 'Graduate Student · Abu Dhabi, UAE → Manchester, United Kingdom',
    caption: 'Watch Fatima’s story',
    excerpt:
      'Fatima held offers from three universities and had no idea which one served her actual plan — which was not the degree, but the two years of work that follow it.',
    facts: [
      ['Destination', 'United Kingdom'],
      ['Route', 'Student visa • Graduate Route'],
      ['From', 'Abu Dhabi, UAE'],
      ['Timeline', '5 months'],
      ['Outcome', 'Visa granted'],
    ],
    quote:
      'I was choosing a university. It turned out I was choosing what I would be allowed to do for the three years after it.',
    prose: [
      [
        '',
        'Fatima had three offers and a family decision to make. The question she brought was which course was best. The question that mattered was what she wanted to be doing in 2030.',
      ],
      [
        'Choosing backwards',
        'Work rights after study are set by the qualification and the institution, not by the subject alone. Once she had decided she wanted to stay and work, two of the three offers stopped being serious options.',
      ],
      [
        'The financial requirement',
        'Maintenance funds must sit in an eligible account for twenty-eight consecutive days, and the single most common refusal we see is a balance that dipped on day nineteen. Hers was planned around that rule.',
      ],
      [
        'Where she is now',
        'Fatima completed her masters in Manchester and is working there on the Graduate Route, with a sponsored role under discussion.',
      ],
    ],
  },
]

export const LEADERSHIP: TeamMemberItem[] = [
  {
    slug: 'team-hana-al-mansouri',
    routeSlug: 'hana-al-mansouri',
    name: 'Hana Al Mansouri',
    initials: 'HA',
    role: 'Chief Executive Officer & Co-Founder',
    mono: '#2e564d',
    short: 'Founded the firm after a decade of watching good applications fail on bad advice. Sets what the firm will and will not take on.',
    facts: [
      ['Role', 'CEO & Co-Founder'],
      ['Based in', 'Dubai, UAE'],
      ['Focus', 'Practice standards'],
      ['Languages', 'Arabic, English'],
      ['Joined', '2020 — founding'],
    ],
    prose: [
      [
        '',
        'Hana spent ten years inside immigration practice before founding HOF Migration, most of it watching capable applicants lose years to advice that was confident and wrong.',
      ],
      [
        'Why the firm exists',
        'The pattern was always the same: someone had been told they qualified, paid for a filing, and found out eighteen months later that the route had never been open to them. Hana built the firm around refusing that first conversation — the one where a fee is quoted before a profile is read.',
      ],
      [
        'What she does here',
        'She sets the assessment standard every case is held to, and she signs off on the cases the firm declines, which she considers the more important half of the job.',
      ],
    ],
  },
  {
    slug: 'team-omar-farouk',
    routeSlug: 'omar-farouk',
    name: 'Omar Farouk',
    initials: 'OF',
    role: 'Co-Founder & Managing Director',
    mono: '#406d63',
    short: 'Runs the practice day to day. Owns the part of the process where a case stops being advice and becomes a filed file.',
    facts: [
      ['Role', 'Co-Founder & MD'],
      ['Based in', 'Dubai, UAE'],
      ['Focus', 'Case delivery'],
      ['Languages', 'Arabic, English, French'],
      ['Joined', '2020 — founding'],
    ],
    prose: [
      [
        '',
        'Omar co-founded the firm and runs it day to day. His responsibility is the distance between a good assessment and a filed application, which is where most consultancies quietly lose their clients.',
      ],
      [
        'On deadlines',
        'Every deadline on a case sits on the firm’s side of the table, not the client’s. Police clearances expire, language results age out, and pools close on a schedule nobody is reminded about. Tracking that is the job.',
      ],
      [
        'Background',
        'Fifteen years in operations across professional services in the Gulf before moving into migration practice.',
      ],
    ],
  },
  {
    slug: 'team-priya-nair',
    routeSlug: 'priya-nair',
    name: 'Priya Nair',
    initials: 'PN',
    role: 'Director, Skilled Migration',
    mono: '#518579',
    short: 'Leads the Canada and Australia practice. Reads points systems for a living and is unsentimental about scores.',
    facts: [
      ['Role', 'Director, Skilled Migration'],
      ['Based in', 'Dubai, UAE'],
      ['Focus', 'Canada & Australia'],
      ['Languages', 'English, Hindi, Malayalam'],
      ['Joined', '2021'],
    ],
    prose: [
      [
        '',
        'Priya leads the skilled migration practice — Express Entry, the provincial streams, and the Australian subclasses.',
      ],
      [
        'On honest scoring',
        'A points score is a set of levers with very different weights, and most of them are not worth pulling. Telling someone which of their gaps to ignore saves them more time than telling them which to close.',
      ],
      [
        'Background',
        'Registered practitioner with eight years on Canadian and Australian skilled cases, including three years reading provincial nomination streams.',
      ],
    ],
  },
  {
    slug: 'team-daniel-okonkwo',
    routeSlug: 'daniel-okonkwo',
    name: 'Daniel Okonkwo',
    initials: 'DO',
    role: 'Director, U.S. Petitions',
    mono: '#66998d',
    short: 'Builds the evidence files behind national interest waivers and extraordinary ability petitions. Writes cases, not forms.',
    facts: [
      ['Role', 'Director, U.S. Petitions'],
      ['Based in', 'Dubai, UAE'],
      ['Focus', 'EB-2 NIW, EB-1A'],
      ['Languages', 'English'],
      ['Joined', '2021'],
    ],
    prose: [
      [
        '',
        'Daniel runs the United States practice, where the work is closer to building an argument than completing an application.',
      ],
      [
        'On petitions',
        'A national interest waiver is won or lost on whether a stranger, reading three hundred pages cold, can follow why the work matters. That is a drafting problem before it is a legal one.',
      ],
      [
        'Background',
        'Nine years on employment-based petitions, previously with a U.S. firm handling extraordinary ability and national interest cases.',
      ],
    ],
  },
  {
    slug: 'team-layla-haddad',
    routeSlug: 'layla-haddad',
    name: 'Layla Haddad',
    initials: 'LH',
    role: 'Director, Client Practice',
    mono: '#8daba4',
    short: 'Owns the client experience end to end, and the firm’s rule that nobody is left wondering what happens next.',
    facts: [
      ['Role', 'Director, Client Practice'],
      ['Based in', 'Dubai, UAE'],
      ['Focus', 'Client experience'],
      ['Languages', 'Arabic, English'],
      ['Joined', '2022'],
    ],
    prose: [
      [
        '',
        'Layla is responsible for what it actually feels like to be a client here, which she treats as a measurable thing rather than a sentiment.',
      ],
      [
        'The standing rule',
        'No client should ever have to ask what happens next. If a case is waiting on a government queue for four months, that is said plainly, along with the date we will next have something to report.',
      ],
      [
        'Background',
        'A decade in client services across legal and financial practices in the Gulf.',
      ],
    ],
  },
]

export const CORE_TEAM: TeamMemberItem[] = [
  {
    slug: 'team-yusuf-rahman',
    routeSlug: 'yusuf-rahman',
    name: 'Yusuf Rahman',
    initials: 'YR',
    role: 'Senior Case Manager',
    mono: '#2e564d',
    short: 'Carries skilled migration files from assessment through to decision.',
    facts: [
      ['Role', 'Senior Case Manager'],
      ['Based in', 'Dubai, UAE'],
      ['Focus', 'Canada — Express Entry'],
      ['Languages', 'Arabic, English, Urdu'],
      ['Joined', '2022'],
    ],
    prose: [
      [
        '',
        'Yusuf manages skilled migration files end to end, which means he is the person who notices that a language result expires three weeks before an expected draw.',
      ],
      [
        'What the job is',
        'Most of case management is arithmetic with dates. The rest is making sure a document that was correct in March is still correct in September.',
      ],
    ],
  },
  {
    slug: 'team-mariam-saleh',
    routeSlug: 'mariam-saleh',
    name: 'Mariam Saleh',
    initials: 'MS',
    role: 'Case Manager, Family & Partner',
    mono: '#406d63',
    short: 'Handles sponsorship and partner cases, and the evidence they turn on.',
    facts: [
      ['Role', 'Case Manager'],
      ['Based in', 'Dubai, UAE'],
      ['Focus', 'Family & partner visas'],
      ['Languages', 'Arabic, English'],
      ['Joined', '2023'],
    ],
    prose: [
      [
        '',
        'Mariam works on family and partner cases, the part of the practice where the facts are never in doubt and the evidence usually is.',
      ],
      [
        'On relationship evidence',
        'Asking a couple to prove a marriage they have lived in for nine years is an uncomfortable conversation. Having it early is what keeps it from becoming a refusal later.',
      ],
    ],
  },
  {
    slug: 'team-arjun-mehta',
    routeSlug: 'arjun-mehta',
    name: 'Arjun Mehta',
    initials: 'AM',
    role: 'Education Counsellor',
    mono: '#518579',
    short: 'Matches students to courses, institutions and the work rights that follow.',
    facts: [
      ['Role', 'Education Counsellor'],
      ['Based in', 'Dubai, UAE'],
      ['Focus', 'Study abroad'],
      ['Languages', 'English, Hindi'],
      ['Joined', '2023'],
    ],
    prose: [
      [
        '',
        'Arjun advises students choosing between offers, which is rarely a choice about the course.',
      ],
      [
        'Choosing backwards',
        'What a student can do in the three years after graduating is set by the institution and the qualification. That decision is being made when the offer is accepted, whether or not anyone realises it.',
      ],
    ],
  },
  {
    slug: 'team-sara-abdullah',
    routeSlug: 'sara-abdullah',
    name: 'Sara Abdullah',
    initials: 'SA',
    role: 'Documentation Specialist',
    mono: '#66998d',
    short: 'Assembles and checks the file itself, down to the certified translations.',
    facts: [
      ['Role', 'Documentation Specialist'],
      ['Based in', 'Dubai, UAE'],
      ['Focus', 'File preparation'],
      ['Languages', 'Arabic, English'],
      ['Joined', '2023'],
    ],
    prose: [
      [
        '',
        'Sara prepares the files that go in — assessments, clearances, translations and the order they are presented in.',
      ],
      [
        'Why it matters',
        'A complete file that is hard to read is still a hard file to approve. Sequence and labelling are not administrative details.',
      ],
    ],
  },
  {
    slug: 'team-khalid-nasser',
    routeSlug: 'khalid-nasser',
    name: 'Khalid Nasser',
    initials: 'KN',
    role: 'Client Liaison',
    mono: '#8daba4',
    short: 'The person clients actually reach, and the one who chases what is outstanding.',
    facts: [
      ['Role', 'Client Liaison'],
      ['Based in', 'Dubai, UAE'],
      ['Focus', 'Client communication'],
      ['Languages', 'Arabic, English'],
      ['Joined', '2024'],
    ],
    prose: [
      [
        '',
        'Khalid is the first person most clients speak to and the one who follows up when something is outstanding.',
      ],
      [
        'On chasing',
        'A case stalled for three weeks waiting on one document is the most avoidable delay in this business, and avoiding it is somebody’s actual job.',
      ],
    ],
  },
]

export const ALL_TEAM: TeamMemberItem[] = [...LEADERSHIP, ...CORE_TEAM]

export const REVIEWS = [
  {
    name: 'Sarah & Marcus Jenkins',
    nameAr: 'سارة وماركوس جنكينز',
    initial: 'S',
    initialAr: 'س',
    avatarBg: '#4A90E2',
    date: '14 August 2026',
    dateAr: '14 أغسطس 2026',
    platform: 'Google',
    text:
      'HOF Migration made my move to Canada seamless. Their team explained every step clearly and kept me updated throughout the entire process. I couldn’t have asked for better guidance through such a big life decision.',
    textAr:
      'جعلت إتش أو إف مايجريشن انتقالي إلى كندا سلسًا وميسرًا للغاية. شرح فريقهم كل خطوة بوضوح وأبقاني على اطلاع مستمر طوال العملية. لم أكن لأتمنى إرشادًا أفضل في مثل هذا القرار المصيري الكبير.',
  },
  {
    name: 'Sara K.',
    nameAr: 'سارة ك.',
    initial: 'S',
    initialAr: 'س',
    avatarBg: '#16A085',
    date: '2 September 2026',
    dateAr: '2 سبتمبر 2026',
    platform: 'Google',
    text:
      'From our first consultation to the final visa approval, the HOF team was incredibly professional. They helped my whole family relocate to Australia without any stress at all — truly grateful for their support.',
    textAr:
      'من استشارتنا الأولى حتى الموافقة النهائية على التأشيرة، كان فريق إتش أو إف في غاية الاحترافية. لقد ساعدوا عائلتي بأكملها على الانتقال إلى أستراليا دون أي توتر على الإطلاق — ممتنون حقًا لدعمهم الكبير.',
  },
  {
    name: 'Michael D.',
    nameAr: 'مايكل د.',
    initial: 'M',
    initialAr: 'م',
    avatarBg: '#E67E22',
    date: '20 July 2026',
    dateAr: '20 يوليو 2026',
    platform: 'Google',
    text:
      'Excellent service from start to finish. My US investor visa application was handled with real expertise — highly recommend HOF Migration to anyone considering the move.',
    textAr:
      'خدمة ممتازة من البداية إلى النهاية. تم التعامل مع طلب تأشيرة المستثمر الأمريكي الخاص بي بخبرة واحترافية حقيقية — أوصي بشدة بـ إتش أو إف مايجريشن لكل من يفكر في الانتقال.',
  },
  {
    name: 'Fatima A.',
    nameAr: 'فاطمة ع.',
    initial: 'F',
    initialAr: 'ف',
    avatarBg: '#E84393',
    date: '5 June 2026',
    dateAr: '5 يونيو 2026',
    platform: 'Google',
    text:
      'Professional, responsive, and genuinely caring about our situation. HOF Migration guided us through the UK study visa process with total clarity from day one.',
    textAr:
      'فريق احترافي وسريع الاستجابة ومهتم بصدق بوضعنا. أرشدتنا إتش أو إف مايجريشن خلال عملية تأشيرة الدراسة في المملكة المتحدة بوضوح تام منذ اليوم الأول.',
  },
]

export const FAQS = [
  {
    q: 'What immigration programs does HOF Migration specialize in?',
    a:
      'We specialize in skilled migration, study visas, family sponsorship, investor and golden visa programs, and USA EB-2 NIW petitions — covering pathways to Canada, Australia, the UK, the USA, and Europe.',
  },
  {
    q: 'Are you licensed immigration consultants?',
    a:
      'Yes. Our consultants are ICCRC/CICC and MARA certified, meeting the regulatory standards required to represent clients in Canadian and Australian immigration matters.',
  },
  {
    q: 'How long does the immigration process usually take?',
    a:
      'Timelines vary by pathway and destination. Express Entry profiles can receive invitations within weeks, while skilled nomination and family sponsorship routes typically take 3 to 6 months. We outline a clear timeline for your specific case from the start.',
  },
  {
    q: 'Can my spouse and family members be included in the application?',
    a:
      'In most programs, yes — eligible spouses, partners, and dependent children can usually be included as part of your application. We’ll confirm exactly who qualifies under your chosen pathway.',
  },
  {
    q: 'What documents do I need to get started?',
    a:
      'Requirements differ by program, but you’ll typically need valid identification, education and work history records, language test results, and financial documentation. We provide a personalized checklist once we understand your goals.',
  },
  {
    q: 'How can I verify that HOF Migration is legitimate?',
    a:
      'You can verify our credentials directly with the relevant regulatory bodies (ICCRC/CICC, MARA), and we’re happy to share our registration details and client references on request.',
  },
  {
    q: 'Do immigration consultants guarantee visa approval?',
    a:
      'No consultancy can guarantee a visa outcome, as final decisions rest with government authorities. What we guarantee is honest advice, a properly prepared application, and dedicated support at every step.',
  },
]

export const OFFICES = [
  {
    city: 'Dubai',
    country: 'United Arab Emirates',
    address: 'Office 402, Al Saaha Offices, Downtown Dubai',
    phone: '+971 4 000 0000',
  },
  {
    city: 'London',
    country: 'United Kingdom',
    address: '1 Fore Street Avenue, London EC2Y 9DT',
    phone: '+44 20 0000 0000',
  },
  {
    city: 'Toronto',
    country: 'Canada',
    address: '100 King Street West, Suite 5600, Toronto, ON M5X 1C9',
    phone: '+1 416 000 0000',
  },
  {
    city: 'Sydney',
    country: 'Australia',
    address: 'Level 25, 100 Barangaroo Avenue, Sydney NSW 2000',
    phone: '+61 2 0000 0000',
  },
  {
    city: 'Islamabad',
    country: 'Pakistan',
    address: 'Beverly Centre, Blue Area, Islamabad',
    phone: '+92 51 000 0000',
  },
  {
    city: 'Doha',
    country: 'Qatar',
    address: 'Tornado Tower, West Bay, Doha',
    phone: '+974 4000 0000',
  },
]
