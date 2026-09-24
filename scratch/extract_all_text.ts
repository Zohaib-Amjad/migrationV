import { SERVICES, HELP_STEPS, LEADERSHIP, CORE_TEAM } from '../src/data/site-content';
import { AR_DICTIONARY } from '../src/lib/i18n';

const norm = (s: string) => s.replace(/\s+/g, ' ').replace(/[’‘]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, '-').trim();
const dictMap = new Map<string, string>();
for (const [k, v] of Object.entries(AR_DICTIONARY)) {
  dictMap.set(norm(k), v);
  dictMap.set(k.trim(), v);
}

const allMissing = new Set<string>();

function register(s: string | undefined | null) {
  if (!s) return;
  const trimmed = s.trim();
  if (!trimmed) return;
  if (/^[0-9\s.,/\\+•–—\-_%&()]+$/.test(trimmed)) return;
  if (!/[a-zA-Z]/.test(trimmed)) return;

  const n = norm(trimmed);
  if (!dictMap.has(n) && !dictMap.has(trimmed)) {
    allMissing.add(trimmed);
  }
}

// 1. Static text across pages
const staticTexts = [
  "Home",
  "About Us",
  "Services",
  "Advice built on",
  "the honest answer",
  "Advice built on the honest answer",
  "HOF Migration advises on skilled migration, study, family sponsorship, and investor pathways from Dubai — and declines cases it cannot genuinely help with.",
  "HOF Migration advises on skilled migration, study, family sponsorship, and investor pathways from Dubai - and declines cases it cannot genuinely help with.",
  "Founded in 2020",
  "Dubai, UAE",
  "ICCRC & MARA certified",
  "ICCRC & MARA accredited",
  "Migration advice starts with what you do not qualify for.",
  "HOF Migration is a Dubai-based consultancy that manages immigration files from the first honest assessment through the year after a decision is issued. We are registered with ICCRC and MARA and work across Canada, Australia, the UK, the US, and Europe.",
  "The company was built around one observation: most people do not fail because they are ineligible. They fail because nobody told them early enough and clearly enough which route was right for them, or because the file was sent without saying what it needed to say.",
  "That is why the first conversation is an assessment, not a sales pitch. If the answer is that you need to wait six months, retake a test, or that we are not the right team for your case, that is the answer you get. It costs us short-term work, but it is the only way to make the process worth the effort.",
  "years of Gulf immigration advisory experience",
  "destination systems we work with internally",
  "regulatory bodies we are accredited with — ICCRC and MARA",
  "regulatory bodies we are accredited with - ICCRC and MARA",
  "assessment before any commitment, always",
  "Founded in Dubai · 2020",
  "Founded in Dubai • 2020",
  "Leadership",
  "The people responsible for the cases the firm takes on and how they are managed.",
  "Our Core Team",
  "The people who manage case files on a day-to-day basis.",
  "Read the full profile",
  "Immigration and",
  "education advisory services",
  "Immigration and education advisory services",
  "Five services, each built around a different question: are you eligible, where are you truly competitive, and what the path looks like once a decision is made.",
  "5 services",
  "Canada • Australia • UK • US • Europe",
  "Canada &bull; Australia &bull; UK &bull; US &bull; Europe",
  "Canada", "Australia", "UK", "US", "Europe",
  "See how we can help",
  "Visa categories and routes",
  "The pathways covered by this service, arranged the way regulators and government programs tend to frame them.",
  "What each visa type means",
  "Clear, practical explanations of the routes above and the conditions attached to them.",
  "How we can help",
  "The same process for every case, from the first assessment to the year after a decision.",
  "routes",
  "routes covered",
  "EP", "IN", "L", "CA", "AU", "UK", "PT", "GR", "MT", "EU", "DE",
  "Employment-based self-petition",
  "Investment & business",
  "Corporate transfer",
  "No employer needed",
  "Priority category",
  "Treaty country",
  "10 jobs",
  "Up to 7 years",
  "Up to 5 years",
  "EB-2 National Interest Waiver",
  "EB-1A Extraordinary Ability",
  "E-2 Treaty Investor",
  "EB-5 Investor",
  "L-1A Manager or executive",
  "L-1B Specialized knowledge",
  "Three-part test",
  "Green card",
  "3 out of 10",
  "Treaty country",
  "Unlimited",
  "Spouse can work",
  "10 full-time roles",
  "2 years",
  "1 of last 3 years",
  "7 years",
  "5 years",
  "EB-1C",
  "Outside the US",
  "Maximum",
  "Then",
  "Outcome",
  "Basis",
  "Renewal",
  "Criteria",
  "Jobs",
  "Conditions",
  "Inland or outland sponsorship for a spouse, common-law partner, or conjugal partner, with open work rights while the application is pending.",
  "A capped sponsorship pool with a yearly intake, plus the super visa as a reliable bridge option.",
  "Sponsorship for children under 22 who are unmarried and not in a common-law relationship.",
  "A two-stage visa — temporary then permanent after two years — filed inside or outside the country.",
  "A contributory or non-contributory route, with a much shorter wait on the contributory track for a much higher fee.",
  "For a dependent child of an Australian citizen, permanent resident, or eligible New Zealand citizen.",
  "Inland • Outland",
  "Annual cap",
  "Under 22",
  "820/801 • 309/100",
  "103 • 143",
  "101 • 802",
  "Outland applications are filed through a visa office abroad; inland applications allow open work rights while waiting, but they limit travel.",
  "Invitations are drawn from a sponsorship pool, and income must be demonstrated across three tax years.",
  "The case is straightforward when custody is clear; most complications arise when the second parent must agree.",
  "Granted first on a temporary basis, then reassessed for permanent residence after two years. The same evidence supports both stages.",
  "Much faster than the non-contributory list but with a substantially higher fee.",
  "A permanent visa for a dependent child, usually filed outside the country, with onshore options in some cases.",
  "Commitment",
  "3 years",
  "20 years",
  "Inland",
  "Open work rights",
  "Permanent residence",
  "Income",
  "3 tax years",
  "Alternative",
  "Super visa",
  "Age",
  "Need",
  "Proof of dependency",
  "Stage 1",
  "Stage 2",
  "+2 years",
  "Wait",
  "Shorter",
  "Cost",
  "Higher",
  "Filed",
  "Outside Australia",
  "Onshore",
  "Subclass 802",
  "Spousal sponsorship (Canada)",
  "Parents and grandparents",
  "Dependent child",
  "Partner visa (Australia)",
  "Contributory parent visa",
  "Child visa (Australia)",
  "Partner visa",
  "Parent visa",
  "Child visa",
  "Spouse or partner",
  "Dependent children",
  "Bring the family together",
  "Evidence of relationship, prepared properly, is what decides these cases",
  "Self-petition and investment tracks",
  "Green cards and investor visas are built on evidence, not quotas",
  "Self-petition",
  "Investment routes",
  "Spouse & partner",
  "Parents",
  "Dependent children",
  "we care about you",
  "we move with care",
  "your future deserves clarity",
  "we guide every step",
  "Share your feedback",
];

staticTexts.forEach(register);

// 2. Add all SERVICES data
SERVICES.forEach(svc => {
  register(svc.title);
  register(svc.navName);
  register(svc.short);
  register(svc.lede);
  register(svc.cardText);
  svc.chips.forEach(register);
  if (svc.plate) {
    register(svc.plate[0]);
    register(svc.plate[1]);
  }
  svc.groups.forEach(g => {
    register(g.name);
    register(g.code);
    g.nodes.forEach(([t, d, tg]) => {
      register(t);
      register(d);
      register(tg);
    });
  });
  svc.types.forEach(([code, name, desc, facts]) => {
    register(code);
    register(name);
    register(desc);
    facts.forEach(([lbl, val]) => {
      register(lbl);
      register(val);
    });
  });
});

// 3. Add HELP_STEPS
HELP_STEPS.forEach(([t, d]) => {
  register(t);
  register(d);
});

// 4. Add LEADERSHIP & CORE_TEAM
LEADERSHIP.forEach(p => {
  register(p.name);
  register(p.role);
  register(p.short);
});
CORE_TEAM.forEach(p => {
  register(p.name);
  register(p.role);
  register(p.short);
});

console.log(`Total missing strings found: ${allMissing.size}`);
for (const item of allMissing) {
  console.log(`- "${item}"`);
}
