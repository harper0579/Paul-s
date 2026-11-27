export interface BlogTakeawayEntry {
  category: string;
  takeawayText: string;
  tip: string;
  relatedLinks: [string, string];
}

export const DEFAULT_BLOG_TAKEAWAY: BlogTakeawayEntry = {
  category: "New Brunswick Roofing Guide",
  takeawayText:
    "Winter, snow load, and freeze-thaw cycles test every New Brunswick roof. A quick check of shingles, flashing, gutters, and attic ventilation before winter catches the small problems before they become leaks.",
  tip: "Check your gutters and flashing before the first snow.",
  relatedLinks: [
    "Fall Roof Inspection Checklist for New Brunswick Homeowners",
    "Ice Dams in Quispamsis & Rothesay: What Causes Them and How to Stop Them for Good",
  ],
};

export const blogTakeawayData: Record<string, BlogTakeawayEntry> = {
  "roofing-kingston-peninsula": {
    "category": "Towns",
    "takeawayText": "Everything on the Kingston Peninsula runs on ferry timing, steep wooded lots, and wind off the Kennebecasis and Saint John rivers. Fastening to spec, trimming overhanging branches, and planning around ferry crossings keep a peninsula roof dry.",
    "tip": "Ask how your roofer schedules ferry deliveries and trim overhanging branches first.",
    "relatedLinks": [
      "Roofing in Quispamsis & Rothesay: Local Guide to Replacements, Repairs & Metal Roofs",
      "Metal vs. Shingles: An Honest Comparison for NB Homeowners"
    ]
  },
  "storm-damage-insurance-claim": {
    "category": "Repairs & Leaks",
    "takeawayText": "Take clear photos of missing shingles, bent metal, fallen branches, and interior stains before cleaning anything up. A written itemized quote that separates material, labour, tear-off, and disposal gives your adjuster real line items to approve.",
    "tip": "Photograph all storm damage before cleanup and call 24/7 for a tarp if water is coming in.",
    "relatedLinks": [
      "Roof Leaking in Winter in NB? What to Do in the First 24 Hours",
      "Emergency Roof Repair in Saint John: Storm Damage, Fallen Branches & Sudden Leaks"
    ]
  },
  "flat-low-slope-roofs-nb": {
    "category": "Repairs & Leaks",
    "takeawayText": "Architectural shingles rely on gravity and will leak on a flat or low-slope roof under a 4 in 12 pitch. Low-slope additions and porches need a continuous sealed membrane system with clear drains before winter.",
    "tip": "Never shingle a flat or low-slope roof — use a proper sealed membrane system.",
    "relatedLinks": [
      "Roof Repair vs Full Replacement: An Honest Roofer's Decision Guide",
      "Ice & Water Shield: The Layer Under Your Roof That Saves NB Homes Every Winter"
    ]
  },
  "how-to-pick-roofing-contractor-nb": {
    "category": "Cost & Financing",
    "takeawayText": "A good install on average shingles beats a bad install on the best metal panel every time. Always insist on a written itemized quote, proof of liability and workers' compensation coverage, and local Southern NB references.",
    "tip": "Never pay the full job upfront and walk away from vague one-line verbal quotes.",
    "relatedLinks": [
      "Making Your Roof Affordable",
      "Roof Replacement: What It Involves"
    ]
  },
  "solar-panels-metal-roof-nb": {
    "category": "Metal Roofing",
    "takeawayText": "A metal roof lasts 50+ years while solar panels last around 25 years — putting the metal roof on first avoids paying to remove and reinstall panels later. Standing seam clamps attach to the raised seam with zero roof penetrations.",
    "tip": "Coordinate snow guard placement and panel layout with your roofer before anyone drills.",
    "relatedLinks": [
      "Standing Seam vs Screw-Down Metal Roofing: Which Is Right for Your NB Home?",
      "Snow Rails on a Metal Roof: Do You Need Them in New Brunswick?"
    ]
  },
  "gutter-guards-nb-winter": {
    "category": "Gutters & Exterior",
    "takeawayText": "Gutter guards keep fall leaves out, but in a New Brunswick winter they can hold a sheet of ice across the top of the gutter and will never cure attic-driven ice dams.",
    "tip": "Fix sagging gutters and attic ventilation first — gutter guards do not stop ice dams.",
    "relatedLinks": [
      "Gutters in New Brunswick: Cleaning, Repair & When Clogged Gutters Damage Your Roof",
      "Ice Dams in Quispamsis & Rothesay: What Causes Them and How to Stop Them for Good"
    ]
  },
  "roof-valleys-leaks": {
    "category": "Repairs & Leaks",
    "takeawayText": "A roof valley carries twice the water flow of a single slope, making it the first place debris settles and winter ice backs up. Sealant smears fail fast — a lasting fix rebuilds the ice-and-water shield and metal liner.",
    "tip": "Check ceilings beneath roof valleys first when tracking down a mystery leak.",
    "relatedLinks": [
      "Chimney Flashing Leaks: Why the Chimney Is the #1 Leak Source We Fix",
      "Ice & Water Shield: The Layer Under Your Roof That Saves NB Homes Every Winter"
    ]
  },
  "cottage-roofs-nb-winterizing": {
    "category": "Ice Dams & Winter",
    "takeawayText": "A seasonal cottage roof sits unwatched for 5 or 6 months through snow load and freeze-thaw cycles. Cleaning gutters, trimming branches, and checking flashing before closing up keeps a minor fall gap from becoming a spring rebuild.",
    "tip": "Walk the fall close-up roof checklist before locking the cottage for winter.",
    "relatedLinks": [
      "Winterizing Your Roof: The Fall Checklist That Prevents Winter Leaks",
      "Spring Roof Check: What Winter Did to Your Roof (and What to Fix First)"
    ]
  },
  "coastal-bay-of-fundy-roofing": {
    "category": "Metal Roofing",
    "takeawayText": "Salt fog and Fundy gusts attack roof edges, ridge caps, and cheap fasteners first. Using quality pre-painted steel with a 40-year paint warranty on most colours and coastal-rated fasteners keeps ocean weather out.",
    "tip": "Check fastener ratings and coastal warranty rules when roofing near the Bay of Fundy.",
    "relatedLinks": [
      "Roofing in Grand Bay-Westfield, Sussex & St. Martins: One Crew, All of Southern NB",
      "How Long Does a Metal Roof Last in Atlantic Canada's Climate?"
    ]
  },
  "attic-insulation-roof-health": {
    "category": "Ice Dams & Winter",
    "takeawayText": "Escaping indoor heat warms the roof deck from below, triggering eave ice dams and winter attic frost. Sealing attic air leaks and keeping soffit baffles open lets cold air sweep cleanly from eaves to ridge.",
    "tip": "Keep attic insulation baffled back so it never blocks your soffit intake vents.",
    "relatedLinks": [
      "Attic Ventilation in NB Homes: Why Your Roof Is Cooking From the Inside",
      "Ice Dams in Quispamsis & Rothesay: What Causes Them and How to Stop Them for Good"
    ]
  },
  "ridge-vents-vs-box-vents-nb": {
    "category": "Maintenance",
    "takeawayText": "Never mix a continuous ridge vent with box vents or gable vents on the same attic space — the ridge vent pulls air from the nearest upper opening instead of drawing cool dry air up from the soffits.",
    "tip": "Use one exhaust vent system matched with open soffit intake along the eaves.",
    "relatedLinks": [
      "Attic Ventilation in NB Homes: Why Your Roof Is Cooking From the Inside",
      "Fall Roof Inspection Checklist for New Brunswick Homeowners"
    ]
  },
  "rotten-roof-decking-sheathing": {
    "category": "Repairs & Leaks",
    "takeawayText": "Shingle nails and metal fasteners cannot hold wind and snow load in soft, delaminated wood. Stripping down to bare decking lets us cut out hidden rot along eaves and valleys before new underlayment goes down.",
    "tip": "Make sure your quote spells out how rotten decking is replaced if uncovered during tear-off.",
    "relatedLinks": [
      "Roof Replacement: What It Involves",
      "Roof Overlay vs Full Tear-Off: Why Layering New Shingles Over Old Fails in NB"
    ]
  },
  "roofing-sussex-kings-county": {
    "category": "Towns",
    "takeawayText": "Inland Kings County farmhouses and rural buildings carry deep winter snowpack, making snow guards above verandas, steps, and barn doors essential when upgrading to a metal roof.",
    "tip": "Plan snow guard placement over porches and doorways before your metal roof goes on.",
    "relatedLinks": [
      "Snow Rails on a Metal Roof: Do You Need Them in New Brunswick?",
      "Roofing in Grand Bay-Westfield, Sussex & St. Martins: One Crew, All of Southern NB"
    ]
  },
  "plumbing-vents-pipe-boot-leaks": {
    "category": "Repairs & Leaks",
    "takeawayText": "A small ceiling stain near an upstairs bathroom often comes from a sun-cracked rubber plumbing vent collar rather than worn shingles. Installing a new metal-base pipe boot fixes it cleanly without messy tar patches.",
    "tip": "Check rubber plumbing vent collars first when a stain shows up near an upstairs bath.",
    "relatedLinks": [
      "Skylight & Vent Leaks: The Small Openings That Cause Big Stains",
      "Chimney Flashing Leaks: Why the Chimney Is the #1 Leak Source We Fix"
    ]
  },
  "roof-overlay-vs-full-tear-off": {
    "category": "Cost & Financing",
    "takeawayText": "Nail-over shingle overlays trap heat, hide soft wood decking, and prevent ice-and-water shield from bonding directly to bare wood at the eaves. A full tear-off protects your home and warranty.",
    "tip": "Always insist on a full tear-off down to bare wood rather than layering over old shingles.",
    "relatedLinks": [
      "Roof Replacement: What It Involves",
      "How to Pick a Roofing Contractor in Southern NB and the Red Flags That Should Stop You"
    ]
  },
  "garage-shed-workshop-roofs": {
    "category": "Cost & Financing",
    "takeawayText": "Quoting your detached garage, workshop, or shed alongside your house roof saves a second crew mobilization and keeps metal panels or shingles in the exact same colour run.",
    "tip": "Ask for an optional garage or shed line item while we are quoting your main roof.",
    "relatedLinks": [
      "Making Your Roof Affordable",
      "How to Choose the Perfect Metal Roof Colour for Your Home"
    ]
  },
  "steep-pitch-heritage-roofs-saint-john": {
    "category": "Towns",
    "takeawayText": "Tall steep-pitch roofs in Saint John need proper roof staging, lifeline rigging, and custom metal step flashing around dormers and brick chimneys to stand up to harbour wind and driving rain.",
    "tip": "Verify that quotes for steep multi-storey homes include full staging and custom flashing.",
    "relatedLinks": [
      "Chimney Flashing Leaks: Why the Chimney Is the #1 Leak Source We Fix",
      "How to Pick a Roofing Contractor in Southern NB and the Red Flags That Should Stop You"
    ]
  },
  "roof-raking-new-brunswick": {
    "category": "Ice Dams & Winter",
    "takeawayText": "Pulling heavy snow off the bottom few feet of a shingle roof from the ground helps reduce ice dam backup — just leave a thin snow cushion so the rake never scrapes brittle frozen shingles.",
    "tip": "Work strictly from the ground, watch power lines, and leave a thin protective layer of snow.",
    "relatedLinks": [
      "Snow Load & Winter Roof Damage in New Brunswick: How Much Snow Is Too Much?",
      "Ice Dams in Quispamsis & Rothesay: What Causes Them and How to Stop Them for Good"
    ]
  },
  "metal-roof-colour": {
    category: "Metal Roofing",
    takeawayText:
      "A metal roof colour looks different in full New Brunswick sun than it does on a sample card. Try it against your siding, trim, and trees first, because light, shade, and your home's style all change how the colour reads.",
    tip: "Hold the colour sample against your siding in daylight before you decide.",
    relatedLinks: [
      "Metal vs. Shingles: An Honest Comparison for NB Homeowners",
      "Metal Roof Myths: Noise, Lightning, Rust & Cell Signal — What's Actually True",
    ],
  },
  "metal-vs-shingles-guide": {
    category: "Metal Roofing",
    takeawayText:
      "Metal sheds snow and ice in sheets, while shingles hold it longer. That difference matters in New Brunswick winters, and it is why snow rails matter more on metal roofs.",
    tip: "Ask where snow will slide before you pick metal or shingles.",
    relatedLinks: [
      "How Long Does a Metal Roof Last in Atlantic Canada's Climate?",
      "Snow Rails on a Metal Roof: Do You Need Them in New Brunswick?",
    ],
  },
  "preparing-for-installation": {
    category: "Maintenance",
    takeawayText:
      "Preparing your home in advance helps the installation go faster and safer. Moving cars, trailers, and patio items 5 to 10 feet from the house the day before saves the crew time on install day.",
    tip: "Clear the driveway the day before.",
    relatedLinks: [
      "Roof Replacement: What It Involves",
      "What Paul Actually Checks on a Free Roof Inspection",
    ],
  },
  "winterizing-your-roof": {
    category: "Ice Dams & Winter",
    takeawayText:
      "Most winter leaks start with small fall fixes left undone, like clogged gutters and tired flashing. A fall check catches them before snow and ice test the roof.",
    tip: "Clean gutters and check flashing in the fall.",
    relatedLinks: [
      "Fall Roof Inspection Checklist for New Brunswick Homeowners",
      "Ice Dams in Quispamsis & Rothesay: What Causes Them and How to Stop Them for Good",
    ],
  },
  "roof-replacement-involves": {
    category: "Repairs & Leaks",
    takeawayText:
      "A full replacement includes a deck inspection under the old roof, not just new shingles on top. Tear-off, deck check, underlayment, flashing, and a final walk-through are all part of the job.",
    tip: "Ask what the deck inspection covers before work starts.",
    relatedLinks: [
      "Roof Repair vs Full Replacement: An Honest Roofer's Decision Guide",
      "What to Expect: Preparing for Your New Roof Installation",
    ],
  },
  "making-roof-affordable": {
    category: "Cost & Financing",
    takeawayText:
      "Roof cost is built from size, pitch, tear-off, trim, and access, not just the material you pick. Understanding those pieces helps you plan, instead of waiting while a leak gets worse.",
    tip: "Get a quote early, before a small leak becomes a big repair.",
    relatedLinks: [
      "How Much Does a Metal Roof Cost in New Brunswick? What Actually Drives the Price",
      "When Is the Best Time to Book a Roof Replacement in New Brunswick?",
    ],
  },
  "metal-roof-cost-nb": {
    category: "Cost & Financing",
    takeawayText:
      "Two same-size houses can price very differently because pitch, valleys, tear-off, trim, and access change the labour. There is no single price for a metal roof in New Brunswick.",
    tip: "Compare quotes on the same scope, not just the material.",
    relatedLinks: [
      "Standing Seam vs Screw-Down Metal Roofing: Which Is Right for Your NB Home?",
      "Making Your Roof Affordable",
    ],
  },
  "standing-seam-vs-screw-down": {
    category: "Metal Roofing",
    takeawayText:
      "Standing seam hides its fasteners, screw-down leaves them exposed. That is the core difference, and it is why the maintenance and long-term performance are different.",
    tip: "Ask how each system handles fasteners over time.",
    relatedLinks: [
      "How Much Does a Metal Roof Cost in New Brunswick? What Actually Drives the Price",
      "Metal Roof Maintenance: The Short List That Gets You to 50 Years",
    ],
  },
  "how-long-metal-roof-lasts": {
    category: "Metal Roofing",
    takeawayText:
      "A properly installed metal roof can last 50+ years in Atlantic Canada, with a 40-year paint warranty on the finish. Salt air, snow load, and freeze-thaw are the factors that decide it here.",
    tip: "Keep fasteners, sealants, and valleys checked to reach the full life.",
    relatedLinks: [
      "Metal Roof Maintenance: The Short List That Gets You to 50 Years",
      "Metal Roof Myths: Noise, Lightning, Rust & Cell Signal — What's Actually True",
    ],
  },
  "signs-shingles-need-replacing": {
    category: "Shingles",
    takeawayText:
      "Granules in the gutters are often the first sign shingles are wearing out, before any leak shows inside. Curling, bald spots, and granule loss together mean the roof is near end of life.",
    tip: "Check your gutters for granules after a heavy rain.",
    relatedLinks: [
      "Granules in Your Gutters: What Your Shingles Are Telling You",
      "Roof Repair vs Full Replacement: An Honest Roofer's Decision Guide",
    ],
  },
  "iko-vs-bp-shingles": {
    category: "Shingles",
    takeawayText:
      "IKO and BP both make architectural shingles for New Brunswick. The real difference is in the profile, colour, and warranty details, not just the brand name.",
    tip: "Use the IKO and BP visualizers to try colours on your own house.",
    relatedLinks: [
      "How to Choose the Perfect Metal Roof Colour for Your Home",
      "9 Signs Your Shingles Need Replacing — Before the Leak Starts",
    ],
  },
  "ice-dams-explained": {
    category: "Ice Dams & Winter",
    takeawayText:
      "Ice dams start with heat loss from the attic, not just cold weather outside. Insulation, ventilation, and ice-and-water shield are the permanent fixes.",
    tip: "Check attic insulation and ventilation, not just the eaves.",
    relatedLinks: [
      "Attic Ventilation in NB Homes: Why Your Roof Is Cooking From the Inside",
      "Ice & Water Shield: The Layer Under Your Roof That Saves NB Homes Every Winter",
    ],
  },
  "roof-leaking-winter": {
    category: "Repairs & Leaks",
    takeawayText:
      "In the first 24 hours of a winter leak, containing the water inside matters more than climbing on an icy roof. Protect the house first, then call for help.",
    tip: "Contain the water inside, do not climb an icy roof.",
    relatedLinks: [
      "Emergency Roof Repair in Saint John: Storm Damage, Fallen Branches & Sudden Leaks",
      "Ice Dams in Quispamsis & Rothesay: What Causes Them and How to Stop Them for Good",
    ],
  },
  "emergency-roof-repair-saint-john": {
    category: "Repairs & Leaks",
    takeawayText:
      "A proper emergency tarp buys time and stops more damage. It is not a permanent repair, but it protects the house until a proper fix can be done.",
    tip: "Call for a tarp fast after storm damage, do not wait.",
    relatedLinks: [
      "Roof Leaking in Winter in NB? What to Do in the First 24 Hours",
      "Roof Replacement: What It Involves",
    ],
  },
  "fall-roof-inspection-checklist": {
    category: "Maintenance",
    takeawayText:
      "An October check of shingles, flashing, gutters, and vents catches the problems winter will test. Fall is the time to find them, not January.",
    tip: "Walk the checklist in October, before winter.",
    relatedLinks: [
      "Winterizing Your Roof: The Fall Checklist That Prevents Winter Leaks",
      "What Paul Actually Checks on a Free Roof Inspection",
    ],
  },
  "roof-ventilation-guide": {
    category: "Maintenance",
    takeawayText:
      "Poor attic airflow can cook shingles from the inside in summer and build ice dams in winter. Soffit and ridge vents need to work together.",
    tip: "Look for attic moisture and hot spots, not just roof damage.",
    relatedLinks: [
      "Ice Dams in Quispamsis & Rothesay: What Causes Them and How to Stop Them for Good",
      "How Old Is Too Old? Roof Age Guide for Shingle & Metal Roofs in NB",
    ],
  },
  "gutter-guide-nb": {
    category: "Gutters & Exterior",
    takeawayText:
      "Clogged gutters can back water under shingles, rot fascia, and feed ice dams. Cleaning schedule and repairs matter as much as the roof itself.",
    tip: "Clean gutters before winter and after leaf fall.",
    relatedLinks: [
      "Drip Edge, Fascia & Soffit: The Roof Edge Nobody Looks At (Until It Rots)",
      "Winterizing Your Roof: The Fall Checklist That Prevents Winter Leaks",
    ],
  },
  "moss-algae-shingles": {
    category: "Shingles",
    takeawayText:
      "Moss holds moisture against shingles and can lift them. Algae is usually just a stain. Knowing which one you have decides whether it needs cleaning or a closer look.",
    tip: "Do not pressure-wash moss off shingles.",
    relatedLinks: [
      "Granules in Your Gutters: What Your Shingles Are Telling You",
      "Metal Roof Maintenance: The Short List That Gets You to 50 Years",
    ],
  },
  "roof-repair-vs-replacement": {
    category: "Repairs & Leaks",
    takeawayText:
      "A repair is a waste when the damage is widespread, the deck is soft, or leaks keep coming back in different spots. Age, damage spread, deck condition, and leak history decide it.",
    tip: "Ask if the damage is local or across the whole roof.",
    relatedLinks: [
      "Roof Replacement: What It Involves",
      "How Old Is Too Old? Roof Age Guide for Shingle & Metal Roofs in NB",
    ],
  },
  "metal-roof-hampton": {
    category: "Towns",
    takeawayText:
      "Hampton homeowners often ask about snow load and colour first, before cost. Farmhouses and older homes in Hampton have their own roof questions.",
    tip: "Ask about snow load for your Hampton home first.",
    relatedLinks: [
      "Roofing in Quispamsis & Rothesay: Local Guide to Replacements, Repairs & Metal Roofs",
      "Snow Load & Winter Roof Damage in New Brunswick: How Much Snow Is Too Much?",
    ],
  },
  "roofing-quispamsis-rothesay": {
    category: "Towns",
    takeawayText:
      "The most common local leak causes in Quispamsis and Rothesay are flashing and valleys, not the field shingles. A local quote should cover those details.",
    tip: "Ask what a local quote includes for flashing and valleys.",
    relatedLinks: [
      "Metal Roofing in Hampton, NB: What Hampton Homeowners Ask Us Most",
      "Roofing in Grand Bay-Westfield, Sussex & St. Martins: One Crew, All of Southern NB",
    ],
  },
  "winter-roof-damage-snow-load": {
    category: "Ice Dams & Winter",
    takeawayText:
      "The warning signs of snow overload are new creaks, sagging, and doors that suddenly stick. Do not wait for a visible sag to act.",
    tip: "Watch for creaks, sagging, and sticking doors after heavy snow.",
    relatedLinks: [
      "Spring Roof Check: What Winter Did to Your Roof (and What to Fix First)",
      "Ice Dams in Quispamsis & Rothesay: What Causes Them and How to Stop Them for Good",
    ],
  },
  "spring-roof-check": {
    category: "Maintenance",
    takeawayText:
      "Lifted shingles and flashing damage from winter often show up first in spring, before the next big rain. Spring is the time to fix what winter did.",
    tip: "Do a spring check for lifted shingles and flashing.",
    relatedLinks: [
      "Snow Load & Winter Roof Damage in New Brunswick: How Much Snow Is Too Much?",
      "Chimney Flashing Leaks: Why the Chimney Is the #1 Leak Source We Fix",
    ],
  },
  "chimney-flashing-leaks": {
    category: "Repairs & Leaks",
    takeawayText:
      "The chimney is the #1 leak source we fix. Step flashing, counterflashing, and a cricket matter — caulk is not a flashing repair.",
    tip: "Do not caulk a chimney leak and call it fixed.",
    relatedLinks: [
      "Skylight & Vent Leaks: The Small Openings That Cause Big Stains",
      "Fall Roof Inspection Checklist for New Brunswick Homeowners",
    ],
  },
  "metal-roof-noise-myths": {
    category: "Metal Roofing",
    takeawayText:
      "A metal roof does not attract lightning, and properly installed metal is no noisier than shingles in rain. Rust, noise, lightning, and cell signal are the myths homeowners ask about most.",
    tip: "Ask for the facts on noise and lightning, not the myths.",
    relatedLinks: [
      "How Long Does a Metal Roof Last in Atlantic Canada's Climate?",
      "Metal vs. Shingles: An Honest Comparison for NB Homeowners",
    ],
  },
  "new-roof-before-selling": {
    category: "Cost & Financing",
    takeawayText:
      "Buyers, inspectors, and lenders all look at roof age. Sometimes a repair plus a condition report is the smarter move than a full replacement before a sale.",
    tip: "Get a condition report before you decide to replace to sell.",
    relatedLinks: [
      "How Old Is Too Old? Roof Age Guide for Shingle & Metal Roofs in NB",
      "Roof Repair vs Full Replacement: An Honest Roofer's Decision Guide",
    ],
  },
  "roof-age-guide": {
    category: "Maintenance",
    takeawayText:
      "Condition matters more than birthday. A well-kept older roof can outlast a neglected newer one, so age alone does not decide replacement.",
    tip: "Judge condition, not just age.",
    relatedLinks: [
      "9 Signs Your Shingles Need Replacing — Before the Leak Starts",
      "What Paul Actually Checks on a Free Roof Inspection",
    ],
  },
  "grand-bay-sussex-st-martins": {
    category: "Towns",
    takeawayText:
      "Coastal wind, valley snow, and village roofs each need a different detail, even from the same crew. One local crew covers metal, shingles, repairs, and emergencies across Southern NB.",
    tip: "Tell the crew your town — wind and snow differ by area.",
    relatedLinks: [
      "Roofing in Quispamsis & Rothesay: Local Guide to Replacements, Repairs & Metal Roofs",
      "Metal Roofing in Hampton, NB: What Hampton Homeowners Ask Us Most",
    ],
  },
  "snow-rails-metal-roof": {
    category: "Metal Roofing",
    takeawayText:
      "Snow rails belong where snow slides onto doors, decks, and walkways, not necessarily on the whole roof. Metal sheds snow in one slide, so placement matters.",
    tip: "Put rails over doors, decks, and walkways first.",
    relatedLinks: [
      "Metal vs. Shingles: An Honest Comparison for NB Homeowners",
      "Snow Load & Winter Roof Damage in New Brunswick: How Much Snow Is Too Much?",
    ],
  },
  "ice-and-water-shield": {
    category: "Ice Dams & Winter",
    takeawayText:
      "Ice and water shield is a self-sealing membrane at eaves and valleys. Skipping it is false economy in New Brunswick winters.",
    tip: "Make sure eaves and valleys get ice-and-water shield.",
    relatedLinks: [
      "Ice Dams in Quispamsis & Rothesay: What Causes Them and How to Stop Them for Good",
      "Drip Edge, Fascia & Soffit: The Roof Edge Nobody Looks At (Until It Rots)",
    ],
  },
  "drip-edge-fascia-soffit": {
    category: "Gutters & Exterior",
    takeawayText:
      "Drip edge, fascia, and soffit are the roof edge nobody looks at, until rot starts there. Each piece protects the eave line, and rot there spreads to the roof.",
    tip: "Check the eave line for rot before the roof.",
    relatedLinks: [
      "Gutters in New Brunswick: Cleaning, Repair & When Clogged Gutters Damage Your Roof",
      "Skylight & Vent Leaks: The Small Openings That Cause Big Stains",
    ],
  },
  "skylight-vent-leaks": {
    category: "Repairs & Leaks",
    takeawayText:
      "Most mystery ceiling stains trace back to a cracked vent boot or a tired skylight seal, not the main roof. The small openings cause the big stains.",
    tip: "Check vent boots and skylight seals first for a mystery stain.",
    relatedLinks: [
      "Chimney Flashing Leaks: Why the Chimney Is the #1 Leak Source We Fix",
      "Fall Roof Inspection Checklist for New Brunswick Homeowners",
    ],
  },
  "what-paul-checks-inspection": {
    category: "Maintenance",
    takeawayText:
      "A free inspection covers shingles or panels, flashing, valleys, gutters, eaves, and the attic, with a straight report at the end. No sales pitch, just what was found.",
    tip: "Book a free inspection before winter, not after a leak.",
    relatedLinks: [
      "Fall Roof Inspection Checklist for New Brunswick Homeowners",
      "When Is the Best Time to Book a Roof Replacement in New Brunswick?",
    ],
  },
  "metal-roof-maintenance": {
    category: "Metal Roofing",
    takeawayText:
      "The short list that gets a metal roof to 50 years is fasteners, sealants, valleys, scratches, and debris. Small, regular checks carry it to its full life.",
    tip: "Check fasteners and sealants every year.",
    relatedLinks: [
      "How Long Does a Metal Roof Last in Atlantic Canada's Climate?",
      "Snow Rails on a Metal Roof: Do You Need Them in New Brunswick?",
    ],
  },
  "best-time-book-roof-nb": {
    category: "Cost & Financing",
    takeawayText:
      "Spring quotes beat fall scrambles. Roofer calendars fill fast, and waiting can cost more than booking, especially in Saint John.",
    tip: "Book in spring, before the fall rush.",
    relatedLinks: [
      "Making Your Roof Affordable",
      "What Paul Actually Checks on a Free Roof Inspection",
    ],
  },
  "granules-in-gutters": {
    category: "Shingles",
    takeawayText:
      "Some granule loss is normal wear. Heavy loss on a younger roof is the roof asking to be replaced, while light loss on an older roof can be normal.",
    tip: "Note how much granule loss, and how old the roof is.",
    relatedLinks: [
      "9 Signs Your Shingles Need Replacing — Before the Leak Starts",
      "Moss & Algae on Shingles: Harmless Stain or Roof Problem?",
    ],
  },
};

const SLUG_ALIASES: Record<string, string> = {
  "how-to-choose-perfect-metal-roof-colour": "metal-roof-colour",
  "metal-vs-shingles-honest-comparison-nb": "metal-vs-shingles-guide",
  "what-to-expect-preparing-new-roof-installation": "preparing-for-installation",
  "winterizing-roof-fall-checklist-prevents-winter-leaks": "winterizing-your-roof",
  "roof-replacement-what-it-involves": "roof-replacement-involves",
  "making-your-roof-affordable": "making-roof-affordable",
  "how-much-metal-roof-cost-new-brunswick": "metal-roof-cost-nb",
  "standing-seam-vs-screw-down-metal-roofing": "standing-seam-vs-screw-down",
  "how-long-metal-roof-last-atlantic-canada": "how-long-metal-roof-lasts",
  "9-signs-shingles-need-replacing": "signs-shingles-need-replacing",
  "ice-dams-quispamsis-rothesay": "ice-dams-explained",
  "roof-leaking-winter-nb-first-24-hours": "roof-leaking-winter",
  "fall-roof-inspection-checklist-new-brunswick": "fall-roof-inspection-checklist",
  "attic-ventilation-nb-homes": "roof-ventilation-guide",
  "gutters-new-brunswick-cleaning-repair": "gutter-guide-nb",
  "roof-repair-vs-full-replacement": "roof-repair-vs-replacement",
  "metal-roofing-hampton-nb": "metal-roof-hampton",
  "roofing-quispamsis-rothesay-local-guide": "roofing-quispamsis-rothesay",
  "snow-load-winter-roof-damage-new-brunswick": "winter-roof-damage-snow-load",
  "spring-roof-check-what-winter-did": "spring-roof-check",
  "metal-roof-myths-noise-lightning-rust": "metal-roof-noise-myths",
  "selling-nb-home-new-roof": "new-roof-before-selling",
  "how-old-too-old-roof-age-guide": "roof-age-guide",
  "roofing-grand-bay-westfield-sussex-st-martins": "grand-bay-sussex-st-martins",
  "snow-rails-metal-roof-new-brunswick": "snow-rails-metal-roof",
  "ice-water-shield-layer-under-roof": "ice-and-water-shield",
  "what-paul-checks-free-roof-inspection": "what-paul-checks-inspection",
  "metal-roof-maintenance-short-list-50-years": "metal-roof-maintenance",
  "best-time-book-roof-replacement-new-brunswick": "best-time-book-roof-nb",
  "granules-in-gutters-shingles-telling-you": "granules-in-gutters",
};

export function getBlogTakeaway(slug: string): BlogTakeawayEntry {
  const normalizedSlug = SLUG_ALIASES[slug] || slug;
  return blogTakeawayData[normalizedSlug] || DEFAULT_BLOG_TAKEAWAY;
}
