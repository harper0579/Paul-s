export const CONTACT = {
  phoneHref: "tel:+15062714162",
  phoneDisplay: "(506) 271-4162",
  email: "paul@paulroofs.com",
  emailHref: "mailto:paul@paulroofs.com",
  facebookHref: "https://www.facebook.com/paulsroofingnb",
  googleReviewsHref:
    "https://www.google.com/maps/search/?api=1&query=Paul%27s+Roofing+Quispamsis+NB",
  ikoVisualizerHref: "https://www.iko.com/na/roofviewer/",
  bpVisualizerHref: "https://bpcan.com/visualizer/",
  hours: "Quotes and installs: Mon–Fri 6:00 a.m. to 7:00 p.m. Emergency leaks: call anytime, 24/7.",
} as const;

export const HERO_STATS = [
  { value: "30", label: "Years of experience" },
  { value: "50+ yrs", label: "Metal roof lifespan" },
  { value: "40-yr", label: "Paint warranty" },
  { value: "24/7", label: "Emergency service" },
] as const;

export const WHY_ITEMS = [
  {
    title: "Metal Roofing Specialists",
    description:
      "We don't just install metal roofs; we master them. It's our primary focus and our deepest area of expertise.",
  },
  {
    title: "Licensed & Insured",
    description:
      "Your investment is protected. We carry full liability insurance and WCB coverage for our entire crew.",
  },
  {
    title: "Locally Owned",
    description:
      "We're your neighbours. We understand New Brunswick weather and build roofs to withstand it.",
  },
  {
    title: "Premium Materials",
    description:
      "We only use materials we'd trust on our own homes, sourced from industry leaders like Community Metal & Dairy Town Exteriors.",
  },
] as const;

export interface MetalColour {
  name: string;
  hex: string;
  pairing: string;
  lightSurface?: boolean;
}

export const METAL_COLOURS: MetalColour[] = [
  {
    name: "Charcoal",
    hex: "#36454F",
    pairing: "Pairs cleanly with white, light grey, cedar, or stone siding across Quispamsis & Rothesay.",
  },
  {
    name: "Shiny Black",
    hex: "#101012",
    pairing: "Crisp contrast on white farmhouses, modern board-and-batten, and coastal clapboard.",
  },
  {
    name: "Hartford Green",
    hex: "#1F3D2B",
    pairing: "A New Brunswick classic on white trim, cream siding, and forested Hampton lots.",
  },
  {
    name: "Crimson Red",
    hex: "#B01230",
    pairing: "Traditional country character against stone chimneys, white clapboard, and natural wood.",
  },
  {
    name: "Gallery Blue",
    hex: "#2E4A6B",
    pairing: "Rich slate-blue tone suited to lakeside cottages, grey siding, and Bay of Fundy homes.",
  },
  {
    name: "Burnished Slate",
    hex: "#5A5348",
    pairing: "Warm dark bronze-brown that anchors earth-toned brick, tan siding, and wooded driveways.",
  },
  {
    name: "Galvalume",
    hex: "#B8BCC0",
    pairing: "Reflective bare metallic finish ideal for workshops, barns, and high-efficiency solar reflection.",
    lightSurface: true,
  },
  {
    name: "Bright White",
    hex: "#FFFFFF",
    pairing: "Maximum summer heat reflection and crisp contrast with dark trim and natural stone.",
    lightSurface: true,
  },
];

export const SECONDARY_SERVICES = [
  {
    title: "Architectural Shingles",
    description:
      "High-performance architectural shingles from Canada's top manufacturers, including IKO and BP — durability, curb appeal, and value.",
    bullets: [
      "Proven durability & weather resistance",
      "Wide range of designer colours & styles",
      "Cost-effective roofing solution",
      "Excellent manufacturer warranties",
    ],
    hasVisualizers: true,
  },
  {
    title: "Exterior Maintenance: Soffit, Fascia, Drip Edge, Gutters",
    description:
      "Beyond roofing, we offer extensive exterior maintenance and remodelling services to keep your entire home protected and looking its best.",
    bullets: [
      "Siding repair and installation",
      "Gutter cleaning and repair",
      "Fascia and soffit maintenance",
      "Comprehensive exterior inspections",
    ],
    hasVisualizers: false,
  },
  {
    title: "Chimney Flashing & Leak Repair",
    description:
      "Comprehensive repairs for chimneys, flashing, and vents to keep your home dry and secure from the elements.",
    bullets: [
      "Chimney inspection and repair",
      "Flashing installation & waterproofing",
      "Vent and skylight repair",
      "Emergency leak sealing",
    ],
    hasVisualizers: false,
  },
] as const;

export const WINTER_SERVICES = [
  {
    id: "ice-dam",
    title: "Ice Dam Help",
    description:
      "Ice building at your eaves, water backing up inside? We find where the heat is escaping and where the water is getting in — and fix the cause, not just the ice.",
    ctaLabel: "Read the ice dam guide",
    action: "ice-guide" as const,
  },
  {
    id: "emergency",
    title: "Emergency Leak Repair — 24/7",
    description:
      "Active leak, storm damage, or a branch through the roof. We answer around the clock for emergencies across Southern New Brunswick.",
    ctaLabel: "Call (506) 271-4162",
    action: "call" as const,
  },
  {
    id: "snow-rails",
    title: "Snow Rails for Metal Roofs",
    description:
      "Metal sheds snow in one slide. Snow rails over doors, decks and walkways hold it back so it melts in place instead of coming down all at once.",
    ctaLabel: "Ask about snow rails",
    action: "quote-snow" as const,
  },
  {
    id: "winter-inspection",
    title: "Winter Roof Inspection",
    description:
      "A free look at the roof, flashing, gutters and attic signs before deep winter — so a small fix now doesn't become water damage later.",
    ctaLabel: "Book a free inspection",
    action: "quote-inspection" as const,
  },
] as const;

export interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  caption: string;
  wide?: boolean;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: "/images/work-green-farmhouse.jpg",
    alt: "White farmhouse with a green standing-seam metal roof under a blue sky",
    title: "Built to Protect. Built to Last.",
    caption: "Green standing-seam metal on a white farmhouse.",
  },
  {
    src: "/images/work-white-summer.jpg",
    alt: "White house with a bright white metal roof in summer sun",
    title: "Cooler in Summer. Savings Year-Round.",
    caption: "Reflective metal roofing that reflects solar heat.",
  },
  {
    src: "/images/work-blue-trim.jpg",
    alt: "Close-up of a blue metal roof panel and trim, fastened with precision",
    title: "Meticulous Precision. Expert Installation.",
    caption: "Clean trim work and fasteners, done right.",
  },
  {
    src: "/images/work-red-chimney.jpg",
    alt: "House with a red metal roof and stone chimney",
    title: "Free Roof Inspections",
    caption: "Red standing-seam metal — tap Quote or Call to book yours.",
  },
  {
    src: "/images/work-colour-panels.jpg",
    alt: "Stacked metal roofing panels in red, blue, green, gold, orange, charcoal and silver with the Paul's Roofing logo",
    title: "Every Colour Family. One System.",
    caption:
      "Stacked panels in reds, blues, greens and neutrals — popular colours are previewed under Services.",
  },
  {
    src: "/images/work-sunrise-roofs.jpg",
    alt: "Rooftops silhouetted at sunrise — just rooftops against the morning sky",
    title: "Early Risers, Better Roofs",
    caption: "24/7 emergency service across Southern New Brunswick.",
  },
  {
    src: "/images/work-lakeside.jpg",
    alt: "Lakeside house with a blue-grey premium metal roof among tall pines in New Brunswick",
    title: "Premium Metal, Lakeside",
    caption: "Durable, weather-ready, built to last — serving Quispamsis, NB & surrounding areas.",
    wide: true,
  },
];

export const COMPARISON_ROWS = [
  {
    feature: "Lifespan",
    metal: "50–70+ years",
    shingle: "15–30 years",
    advantage: "metal" as const,
  },
  {
    feature: "Initial cost",
    metal: "Higher initial cost",
    shingle: "Lower initial cost",
    advantage: "shingle" as const,
  },
  {
    feature: "Maintenance",
    metal: "Very low",
    shingle: "Moderate",
    advantage: "metal" as const,
  },
  {
    feature: "Weather resistance",
    metal: "Excellent",
    shingle: "Good to very good",
    advantage: "metal" as const,
  },
  {
    feature: "Energy efficiency",
    metal: "High (reflects heat)",
    shingle: "Moderate",
    advantage: "metal" as const,
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Paul's Roofing did an incredible job on our new metal roof in Quispamsis. Professional, efficient, and the quality is outstanding. Highly recommend!",
    author: "Sarah L., Quispamsis, NB",
  },
  {
    quote:
      "Emergency repair in the middle of winter — Paul came out the same day and fixed our leak. Saved us from thousands in water damage!",
    author: "Mike T., Saint John, NB",
  },
  {
    quote:
      "30 years experience really shows. Our shingle roof looks amazing and hasn't had a single issue in 3 years. Paul's is the best!",
    author: "Jennifer R., Hampton, NB",
  },
] as const;

export const PROCESS_STEPS = [
  {
    num: "01",
    title: "Consultation",
    description: "We discuss your needs and assess your property.",
  },
  {
    num: "02",
    title: "Detailed Quote",
    description: "You receive a clear, itemized, no-obligation estimate.",
  },
  {
    num: "03",
    title: "Expert Installation",
    description: "Our experienced crew completes the work efficiently.",
  },
  {
    num: "04",
    title: "Final Walk-through",
    description: "We ensure your complete satisfaction with the final result.",
  },
] as const;

export const SERVICE_AREAS = [
  {
    town: "Quispamsis",
    note: "Home base. Subdivision roofs aging together, metal upgrades, and ice dam calls all winter.",
  },
  {
    town: "Rothesay",
    note: "Larger, steeper, more complex roofs — flashing, valleys and chimneys done right.",
  },
  {
    town: "Saint John",
    note: "Bay wind, older housing stock, storm repairs and full replacements across the city.",
  },
  {
    town: "Hampton",
    note: "Farmhouses and newer builds in the Kennebecasis valley — metal is a Hampton favourite.",
  },
  {
    town: "Grand Bay-Westfield",
    note: "River and bay wind on exposed slopes — secure fastening and flashing that holds.",
  },
  {
    town: "Sussex",
    note: "Valley snow country. Ice-and-water protection, ventilation and honest deck checks.",
  },
  {
    town: "St. Martins",
    note: "Fundy coast — salt air and serious weather. Coating quality and detailing matter most here.",
  },
  {
    town: "Kingston Peninsula",
    note: "Rural homes, shaded slopes and moss country — inspections, cleaning advice and re-roofs.",
  },
] as const;

export interface FaqItem {
  slug: string;
  question: string;
  answer: string;
  linkToCompare?: boolean;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    slug: "new-roof-cost",
    question: "How much does a new roof cost?",
    answer:
      "It depends on your roof — size, pitch, layers to tear off, deck condition, material and trim. Anyone posting a flat price without seeing your house is guessing. Paul measures your roof and gives you a clear, itemized, no-obligation quote for free, so you can compare line by line. Financing is coming soon if you'd rather spread it out monthly — ask Paul about it at your free estimate.",
  },
  {
    slug: "metal-roof-lifespan",
    question: "How long does a metal roof last?",
    answer:
      "50+ years when it's installed properly, with a 40-year paint warranty on most colours against chipping, cracking and peeling, and a lifetime material warranty on the steel panels against defects. The upkeep along the way is mostly fasteners, sealants and flashing — not the panels.",
  },
  {
    slug: "shingle-lifespan-nb",
    question: "How long do shingles last in New Brunswick?",
    answer:
      "Architectural shingles typically serve 15 to 30 years here, depending on sun exposure, ventilation and storm history. Curling edges, heavy granule loss and leaks in new places are the signs the roof — not just a spot on it — is done.",
  },
  {
    slug: "metal-or-shingles",
    question: "Metal or shingles — which should I pick?",
    answer:
      "Staying long term? Metal usually wins on lifetime value and low upkeep. Selling in a few years, or working with a tighter budget today? Quality architectural shingles from IKO or BP can be the smarter spend. Paul installs both, so the advice isn't steered by what's on the truck.",
    linkToCompare: true,
  },
  {
    slug: "free-inspections-and-quotes",
    question: "Do you offer free inspections and quotes?",
    answer:
      "Yes — free roof inspections and detailed, itemized quotes across our whole service area: Quispamsis, Rothesay, Saint John, Hampton, Grand Bay-Westfield, Sussex, St. Martins and the Kingston Peninsula. Use the quote form below, or tap Call or Email.",
  },
  {
    slug: "active-roof-leak-emergency",
    question: "My roof is leaking right now. What do I do?",
    answer:
      "Move belongings out from under the drip, set a bucket under it, and keep clear of any bulging ceiling. Don't climb on the roof — especially in winter. Then call: Paul's Roofing answers 24/7 for emergencies, and you'll be told plainly what can happen right away and what happens next.",
  },
  {
    slug: "ice-dams-causes-and-fix",
    question: "What causes ice dams, and can they be stopped?",
    answer:
      "Heat escaping into your attic melts snow on the upper roof; the water refreezes at the cold eave and backs up under the roofing. The lasting fix is attic air sealing, proper insulation and ventilation, plus ice-and-water shield at the eaves on your next roof. There's a full guide in the blog below.",
  },
  {
    slug: "small-jobs-gutters-chimneys",
    question: "Do you do small jobs — gutters, chimneys, flashing?",
    answer:
      "Yes. Exterior maintenance is part of the work: gutter cleaning and repair, fascia and soffit, chimney inspection and repair, flashing and waterproofing, and vent and skylight repair. No job too small to keep water out.",
  },
  {
    slug: "what-free-inspection-checks",
    question: "What does a free inspection actually check?",
    answer:
      "The whole system, not just the shingles: roof surface condition, flashing at chimneys, walls, valleys and vents, vent boots and skylights, ridge caps, gutters and downspouts, the eave line — drip edge, fascia and soffit — and the attic, where water stains, damp insulation and blocked vents tell the truth about how the roof is aging. You get a straight report in plain language: what is fine, what needs a small fix now, and what to plan for, with an itemized quote if work is warranted.",
  },
  {
    slug: "winter-roof-replacement",
    question: "Can a roof be replaced in winter?",
    answer:
      "Emergency repairs happen year-round — if water is coming in, call. Full replacements are scheduled in workable weather, for quality and safety, so a winter call usually means a sound repair now and a booked installation when conditions allow. The practical move is to get the free inspection and itemized quote as soon as you suspect the roof is near end of life, even if the work itself lands months later — a booked job with a date beats a fall scramble.",
  },
  {
    slug: "financing-coming-soon",
    question: "Do you offer financing?",
    answer:
      "Coming soon. We're setting up financing so a roof that needs doing now doesn't have to wait on a drained savings account. It's not available yet — ask Paul during your free estimate and he'll let you know as soon as it launches.",
  },
  {
    slug: "how-long-replacement-takes",
    question: "How long does a roof replacement take?",
    answer:
      "It depends on the roof — size, pitch, layers to remove and weather. Paul gives you a realistic window in your written quote and updates you if hidden deck damage changes the plan. On installation days, plan for the driveway to be a work zone, and expect noise and vibration during tear-off. You don't need to leave the house, but being reachable by phone helps if the crew finds something that needs a decision.",
  },
];
