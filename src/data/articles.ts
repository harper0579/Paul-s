export interface TextSegment {
  text: string;
  href?: string;
  external?: boolean;
}

export type ArticleBlock =
  | { type: "h4"; text: string }
  | { type: "p"; segments: TextSegment[] }
  | { type: "ul"; items: TextSegment[][] };

export interface Article {
  id: string;
  title: string;
  cat: string;
  town: string;
  date: string;
  read: number;
  excerpt: string;
  blocks: ArticleBlock[];
  faq: [string, string][];
}

export const ARTICLE_CATEGORIES = [
  "All",
  "Metal Roofing",
  "Shingles",
  "Ice Dams & Winter",
  "Repairs & Leaks",
  "Cost & Financing",
  "Maintenance",
  "Gutters & Exterior",
  "Towns",
] as const;

export const ARTICLES: Article[] = [
  {
    "id": "metal-roof-colour",
    "title": "How to Choose the Perfect Metal Roof Colour for Your Home",
    "cat": "Metal Roofing",
    "town": "Quispamsis",
    "date": "2025-07-12",
    "read": 6,
    "excerpt": "Metal roof colours for Quispamsis and Rothesay homes — how light, siding, trees and NB sun change the colour you pick, plus how to try colours on your own house first.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Picking a metal roof colour is a long decision. A metal roof from Paul's Roofing carries a 40-year paint warranty on most colours and a 50+ year lifespan, so the colour you choose in Quispamsis or Rothesay is the colour you will live with for decades. That is good news if you choose well, and a long reminder if you rush it."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Start with the house, not the swatch"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Look at what is not changing: brick, stone, siding, trim and driveway. Warm siding usually sits better with warm roof tones like browns, bronzes and deep reds. Cool grey or white siding usually suits charcoals, blacks and blues. If your home has a strong feature — a stone chimney, for example — pull a tone from it rather than fighting it."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Light changes everything in New Brunswick. A colour that looks soft on a cloudy morning in Saint John can look much brighter in full summer sun and much darker under snow light in January. Always look at a larger sample outside, in morning and late-day light, propped against the house — never decide from a tiny chip indoors."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Hold the sample beside siding, trim and brick at the same time"
            }
          ],
          [
            {
              "text": "Check it in sun and in shade before deciding"
            }
          ],
          [
            {
              "text": "Consider trees: heavy shade makes dark colours read darker"
            }
          ],
          [
            {
              "text": "Think about heat: lighter colours reflect more solar heat"
            }
          ],
          [
            {
              "text": "Ask how the colour weathers — the 40-year paint warranty covers chipping, cracking and peeling on most colours"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "Try it on your house first"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Use the manufacturer visualizers linked under "
          },
          {
            "text": "Services",
            "href": "#services",
            "external": false
          },
          {
            "text": " — the IKO Roof Viewer and BP Canada Visualizer — to see colours on a photo of a home. Paul can walk through real options at your free estimate."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Neighbourhood matters too. In Rothesay and Quispamsis, most streets lean traditional: charcoals, blacks, deep greens and barn reds fit in without shouting. A bold colour can work, but check sightlines — your roof is one of the largest surfaces your neighbours see."
          }
        ]
      }
    ],
    "faq": [
      [
        "What is the most popular metal roof colour?",
        "Charcoal and black are the most requested colours we see in the Quispamsis and Saint John area because they suit most siding colours and hide dirt well. Deep greens and reds are also common on rural and traditional homes."
      ],
      [
        "Does metal roof colour affect energy bills?",
        "Lighter colours reflect more solar heat, which can help keep the attic cooler in summer. The bigger factors are ventilation and insulation, which Paul checks during a free inspection."
      ],
      [
        "Can I change my mind after ordering?",
        "Talk to us before panels are ordered. Once material is cut and delivered for your roof, colour changes are difficult, so take the time to view samples outside first."
      ]
    ]
  },
  {
    "id": "metal-vs-shingles-guide",
    "title": "Metal vs. Shingles: An Honest Comparison for NB Homeowners",
    "cat": "Metal Roofing",
    "town": "Saint John",
    "date": "2025-07-05",
    "read": 7,
    "excerpt": "Metal vs shingles in New Brunswick: lifespan, upkeep, weather resistance and energy — an honest side-by-side from a Saint John area roofer with no sales pitch.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Homeowners in Saint John, Quispamsis and Hampton ask this every week: metal or shingles? There is no single right answer. There is a right answer for your house, your plans and how long you expect to stay. Here is the honest comparison we use at kitchen tables across Southern New Brunswick — the same one in our "
          },
          {
            "text": "comparison table",
            "href": "#compare",
            "external": false
          },
          {
            "text": "."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Lifespan and upkeep"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "A metal roof is built to last 50+ years with very low maintenance. Architectural shingles typically serve 15 to 30 years depending on exposure, ventilation and storm history, and they need moderate upkeep — checking for lifted, curled or missing tabs after big winds. If this is your forever home, metal usually wins on lifetime value. If you plan to sell in a few years, quality shingles can be the smarter spend."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Weather in Atlantic Canada"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Both materials handle NB weather when installed properly. Metal sheds snow well, resists wind uplift with correct fastening, and will not rot or curl. Modern architectural shingles from IKO and BP carry strong wind ratings and perform well, but they are more vulnerable to ice dam backup and granule loss as they age. Installation quality matters more than the brochure for either system."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Choose metal for: longest lifespan, lowest upkeep, heavy snow shedding"
            }
          ],
          [
            {
              "text": "Choose shingles for: lower upfront cost, classic look, shorter time horizon"
            }
          ],
          [
            {
              "text": "Either way: ventilation and ice-and-water protection decide how the roof ages"
            }
          ],
          [
            {
              "text": "Either way: flashing at chimneys and valleys is where leaks start"
            }
          ]
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Energy is a real difference. Metal reflects solar heat and can keep an attic cooler in summer. Shingles absorb more heat. Neither replaces proper attic insulation and ventilation, which we check on every "
          },
          {
            "text": "free estimate",
            "href": "#quote",
            "external": false
          },
          {
            "text": "."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Our recommendation is simple: decide how long the roof needs to serve, then price both honestly. Paul installs both — premium metal is our specialty, and architectural shingles are a service we stand behind — so the advice is not steered by what is on the truck."
          }
        ]
      }
    ],
    "faq": [
      [
        "Is a metal roof worth it in New Brunswick?",
        "For homeowners staying long term, usually yes: a 50+ year lifespan and very low maintenance spread the higher upfront cost over decades. For shorter stays, architectural shingles often make more financial sense."
      ],
      [
        "Which is better for snow, metal or shingles?",
        "Metal sheds snow faster, which reduces load and ice dam risk, but snow guards may be needed over doors and walkways. Shingles hold snow longer, which makes attic insulation and ventilation even more important."
      ],
      [
        "Do metal roofs make a house hotter or colder?",
        "No. Metal reflects summer heat and, with proper underlayment and ventilation, performs well in winter. Attic insulation does most of the temperature work in both systems."
      ]
    ]
  },
  {
    "id": "preparing-for-installation",
    "title": "What to Expect: Preparing for Your New Roof Installation",
    "cat": "Maintenance",
    "town": "Hampton",
    "date": "2025-06-28",
    "read": 5,
    "excerpt": "Getting a new roof in Hampton or Quispamsis? A simple day-before and day-of checklist: vehicles, pets, attic items, neighbours and what the crew needs from you.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "A new roof is a construction day at your house. A little preparation the day before makes installation in Hampton, Quispamsis or anywhere in Southern New Brunswick smoother, safer and faster. Here is exactly what to expect when the Paul's Roofing crew arrives."
          }
        ]
      },
      {
        "type": "h4",
        "text": "The day before"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Move vehicles out of the driveway so material and the crew can get close to the house. Clear patio furniture, planters and anything fragile near the walls — tear-off shakes a house more than most people expect. Inside, take down loose pictures and protect anything stored in the attic you care about, because dust and vibration are normal during tear-off."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Move cars, trailers and toys clear of the driveway and eaves"
            }
          ],
          [
            {
              "text": "Bring pets inside or arrange a quiet spot away from the noise"
            }
          ],
          [
            {
              "text": "Cover or move attic storage near the roof deck"
            }
          ],
          [
            {
              "text": "Tell neighbours a roof is going on — it is a noisy day"
            }
          ],
          [
            {
              "text": "Mark any sprinkler heads, septic parts or garden features the crew should avoid"
            }
          ],
          [
            {
              "text": "Keep a clear path to an outdoor outlet if asked"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "Installation day"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "The crew starts with protection: tarps and boards where needed, then tear-off of the old roof, inspection of the deck, and repair of any soft or rotted sections found. Underlayment, ice-and-water protection in the right places, flashing, then your new metal or shingle roof. Our process is consultation, detailed quote, expert installation, and a final walk-through — see "
          },
          {
            "text": "our process",
            "href": "#about",
            "external": false
          },
          {
            "text": "."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "You do not need to be home all day, but being reachable by phone helps if the crew finds hidden deck damage that needs a decision. At the end of the day the crew cleans up, runs a magnet for nails, and walks the job with you. If weather turns, Paul will tell you plainly what is watertight and what waits for morning — no surprises left on your roof overnight."
          }
        ]
      }
    ],
    "faq": [
      [
        "How long does a roof installation take?",
        "Timing depends on roof size, pitch, layers to remove and weather. Paul gives a realistic window in your written quote and updates you if hidden deck damage changes the plan."
      ],
      [
        "Do I need to leave the house during a re-roof?",
        "No. Most families stay. Expect noise and vibration, keep pets settled, and plan for the driveway to be a work zone for the day."
      ],
      [
        "What if you find rotted decking?",
        "The crew shows you the damage, explains the repair, and confirms the approach before covering it. Decking is only visible after tear-off, which is why honest communication on the day matters."
      ]
    ]
  },
  {
    "id": "winterizing-your-roof",
    "title": "Winterizing Your Roof: The Fall Checklist That Prevents Winter Leaks",
    "cat": "Ice Dams & Winter",
    "town": "Rothesay",
    "date": "2025-11-08",
    "read": 5,
    "excerpt": "Winterizing your roof in Rothesay and Quispamsis before the snow: gutters, flashing, attic ventilation and the small fixes that stop ice dams and January leaks.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Winterizing a house in Rothesay or Quispamsis usually means pipes and drafty doors — but the roof is where winter does its real damage. A November hour spent on the roof system pays you back all winter: fewer ice dams, no surprise leaks, and no emergency call in the worst week of January."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Start at the eaves"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Clean the gutters and downspouts after the leaves drop. A clogged gutter holds water at the eave, and that water becomes ice weight, backs up under the first course of roofing, and feeds ice dams all winter. Check that gutters sit tight to the fascia and slope to drain — standing water in a gutter in November is an ice problem in December. Our "
          },
          {
            "text": "exterior maintenance",
            "href": "#services",
            "external": false
          },
          {
            "text": " work covers gutters, fascia and soffit together, because the eave line works as one system."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Flashing, vents and the roof surface"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "From the ground with binoculars, look for lifted or missing shingles, cracked vent boots, and flashing that has pulled loose at chimneys and walls. Those are the entry points winter water uses. On a metal roof, check that trim sits flat and no debris is piled in the valleys. Small fixes now are cheap; the same gaps under snow load and freeze-thaw are leak calls later."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Clean gutters and confirm downspouts run clear"
            }
          ],
          [
            {
              "text": "Look for lifted shingles, cracked vent boots and loose flashing"
            }
          ],
          [
            {
              "text": "Clear leaves and branches out of valleys"
            }
          ],
          [
            {
              "text": "Trim branches that touch or overhang the roof"
            }
          ],
          [
            {
              "text": "Check the attic for stains, damp insulation and blocked soffit vents"
            }
          ],
          [
            {
              "text": "Book repairs before freeze-up — sealants and shingles need workable weather"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "The attic is half the job"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Most winter roof trouble starts inside the attic: heat escaping through gaps melts snow on the roof, and that water refreezes into ice dams at the cold eave. Consistent insulation, sealed gaps around hatches and pipes, and clear soffit ventilation keep the roof deck cold so snow melts evenly. Paul checks attic conditions on every inspection and will tell you plainly whether your winter risk is a roof problem, an attic problem, or both."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Do the work before deep cold sets in. Once snow is on the roof and temperatures stay below freezing, most fixes wait for spring — which is why fall is the season that decides how your winter goes."
          }
        ]
      }
    ],
    "faq": [
      [
        "When should I winterize my roof in New Brunswick?",
        "In the fall, after the leaves drop and before sustained freezing weather — October and November are the practical window in Southern NB, while repairs can still be done properly."
      ],
      [
        "What is the most important winterizing step?",
        "Clear gutters and a sound eave line, plus an attic check. Clogged gutters feed ice dams, and attic heat loss is what builds them — together they cause most of the winter leaks we see."
      ],
      [
        "Can winter roof prep prevent ice dams?",
        "It prevents most of them. Clean drainage, sealed attic air leaks, proper insulation and ventilation, and ice-and-water shield at the eaves are the full defence — the ice dam guide in this blog explains the whole picture."
      ]
    ]
  },
  {
    "id": "roof-replacement-involves",
    "title": "Roof Replacement: What It Involves",
    "cat": "Repairs & Leaks",
    "town": "Quispamsis",
    "date": "2025-09-14",
    "read": 6,
    "excerpt": "What a full roof replacement actually involves in Quispamsis NB — tear-off, deck inspection, underlayment, flashing, installation and the final walk-through, step by step.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Roof replacement sounds simple — old roof off, new roof on. In practice it is a sequence, and skipping steps is where bad roofs come from. Here is what a proper replacement in Quispamsis or Saint John involves when Paul's Roofing does it, so you can judge any quote you are holding."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Step by step"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "First, a consultation and detailed, itemized quote — no obligation, and no pressure. On installation day the crew protects landscaping and the house, then tears off the old roofing down to the deck. That deck inspection is the moment of truth: soft, rotted or delaminated sections are shown to you and repaired before anything new goes on. A new roof over a bad deck is money wasted."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Next comes the water management layer: underlayment across the deck, ice-and-water shield at eaves, valleys and other vulnerable areas, drip edge, and new flashing at chimneys, walls and vents. Only then does the visible roof go on — metal panels or architectural shingles — followed by ridge venting or caps, cleanup with a nail magnet, and a final walk-through with you. See the four steps on our "
          },
          {
            "text": "About section",
            "href": "#about",
            "external": false
          },
          {
            "text": "."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Tear-off to the deck — never guess what is underneath"
            }
          ],
          [
            {
              "text": "Deck repairs confirmed with you before covering"
            }
          ],
          [
            {
              "text": "Ice-and-water shield where NB winters demand it"
            }
          ],
          [
            {
              "text": "New flashing — reusing old flashing is a common shortcut"
            }
          ],
          [
            {
              "text": "Ventilation checked and corrected as part of the job"
            }
          ],
          [
            {
              "text": "Full cleanup and walk-through before the job is done"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "Metal or shingle for the replacement?"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "That choice is covered honestly in our "
          },
          {
            "text": "metal vs shingle comparison",
            "href": "#compare",
            "external": false
          },
          {
            "text": ". Metal brings a 50+ year lifespan and a 40-year paint warranty on most colours. Shingles from IKO and BP bring a lower upfront cost and a classic look. Either way, the steps above do not change — the system under the surface is what keeps your house dry."
          }
        ]
      }
    ],
    "faq": [
      [
        "Can a new roof go over old shingles?",
        "A layover hides deck problems and shortens the new roof's life. We tear off to the deck so damage is found and fixed, and the new system is installed on a sound base."
      ],
      [
        "What is included in a roof replacement quote?",
        "Our quotes are itemized: tear-off, deck work, underlayment and ice-and-water protection, flashing, material, installation, cleanup and walk-through. Ask any roofer to show you those lines before comparing prices."
      ],
      [
        "How do I know my deck is bad?",
        "You usually cannot until tear-off. Soft spots, past leak stains in the attic and sagging lines are warning signs Paul checks during the free inspection."
      ]
    ]
  },
  {
    "id": "making-roof-affordable",
    "title": "Making Your Roof Affordable",
    "cat": "Cost & Financing",
    "town": "Saint John",
    "date": "2025-08-19",
    "read": 5,
    "excerpt": "A needed roof in Saint John should not wait on a leak getting worse. How roof cost is built, what affects it, and how to plan for it — financing is coming soon.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "A roof that needs replacing does not get cheaper by waiting — it gets wetter. In Saint John and across Southern New Brunswick, the most expensive roof is the one put off until deck rot and interior damage join the bill. Here is how to think about affordability honestly, without invented numbers."
          }
        ]
      },
      {
        "type": "h4",
        "text": "What actually drives the cost"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Roof cost is built from size and pitch, the number of layers to tear off, deck repairs found underneath, material choice, flashing and chimney work, and access for the crew. Metal costs more upfront than shingles and lasts far longer — 50+ years against a typical shingle service life — so compare cost per year of service, not just the quote total. Our "
          },
          {
            "text": "comparison table",
            "href": "#compare",
            "external": false
          },
          {
            "text": " lays out the trade-offs."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Get the quote itemized so you can see where money goes"
            }
          ],
          [
            {
              "text": "Price metal and shingles side by side before deciding"
            }
          ],
          [
            {
              "text": "Fix active leaks now even if full replacement is planned later"
            }
          ],
          [
            {
              "text": "Ask about staging: urgent sections first when it is safe to do so"
            }
          ],
          [
            {
              "text": "Keep the written quote — it is your comparison document"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "Financing — coming soon"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Financing is coming soon. We're setting it up so a needed roof can become a planned monthly cost instead of a drained savings account. It's not available yet — ask about it during your free estimate and Paul will let you know as soon as it launches."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "The other affordability lever is timing. Booking outside peak season when possible, keeping gutters and flashing maintained so a roof reaches its full service life, and repairing small problems early all protect your wallet more than any discount. Get a "
          },
          {
            "text": "free, itemized quote",
            "href": "#quote",
            "external": false
          },
          {
            "text": " first — then decide with real numbers in hand."
          }
        ]
      }
    ],
    "faq": [
      [
        "Does Paul's Roofing offer financing?",
        "Financing is coming soon — it's not available yet. Ask during your free estimate and Paul will let you know as soon as it launches."
      ],
      [
        "Why do roof quotes vary so much between companies?",
        "Scope. One quote may include tear-off, ice-and-water shield, new flashing and deck repairs while another quietly leaves them out. Compare itemized quotes line by line, not just totals."
      ],
      [
        "Is it cheaper to repair or replace?",
        "A repair is cheaper today; repeated repairs on a roof at end of life are not. Paul will tell you honestly which side of that line your roof is on after an inspection."
      ]
    ]
  },
  {
    "id": "metal-roof-cost-nb",
    "title": "How Much Does a Metal Roof Cost in New Brunswick? What Actually Drives the Price",
    "cat": "Cost & Financing",
    "town": "Quispamsis",
    "date": "2026-01-18",
    "read": 7,
    "excerpt": "Metal roof cost in New Brunswick explained without fake numbers: the size, pitch, tear-off, trim and access factors that drive a Quispamsis metal roof quote.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Every homeowner in Quispamsis asks it, and every honest roofer answers the same way: it depends on your roof — and anyone posting a flat price online without seeing your house is guessing with your money. We will not invent a dollar figure here. Instead, here is exactly what drives a metal roof price in New Brunswick, so your quotes make sense."
          }
        ]
      },
      {
        "type": "h4",
        "text": "The real cost factors"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Size is first: material and labour scale with roof area. Pitch is second: steep roofs are slower and need more safety setup. Complexity is third — valleys, hips, dormers, chimneys and skylights all add custom trim and flashing labour. Metal roofing is a trim-heavy system: ridge caps, rake trim, eave trim, valley flashing and snow rails are individual pieces, each measured and fitted to your roof."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Tear-off matters too. Removing one layer of tired shingles is one job; removing two layers plus repairing rotted decking is another, and deck condition is only fully known after tear-off. Access matters as well — a tight Rothesay lot or a long carry in Hampton changes crew time. Colour and finish can affect material cost, and snow retention over doors and decks is worth including in NB rather than adding after the first slide-off."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Roof area, pitch and complexity (valleys, hips, dormers)"
            }
          ],
          [
            {
              "text": "Tear-off layers and deck repairs found underneath"
            }
          ],
          [
            {
              "text": "Trim package: ridge, rake, eave, valley and snow rails"
            }
          ],
          [
            {
              "text": "Flashing work at chimneys, walls and vents"
            }
          ],
          [
            {
              "text": "Site access and disposal"
            }
          ],
          [
            {
              "text": "Financing is coming soon — ask Paul at your free estimate"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "Cost per year, not just cost"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Metal costs more upfront than shingles. It also carries a 50+ year lifespan and a 40-year paint warranty on most colours, with very low maintenance. Divide any quote by the years of service it buys and the comparison with a shorter-lived roof changes. Our "
          },
          {
            "text": "metal vs shingle table",
            "href": "#compare",
            "external": false
          },
          {
            "text": " shows the trade-offs, and a "
          },
          {
            "text": "free itemized quote",
            "href": "#quote",
            "external": false
          },
          {
            "text": " gives you real numbers for your house — the only numbers worth using."
          }
        ]
      }
    ],
    "faq": [
      [
        "Why won't roofers post metal roof prices online?",
        "Because no two roofs share size, pitch, trim count and deck condition. A posted price would be wrong for almost every house. An itemized on-site quote is the honest version."
      ],
      [
        "Is metal roofing worth the higher upfront cost?",
        "Over a 50+ year lifespan with low maintenance, cost per year is often competitive with replacing shingles more than once. It depends on how long you plan to stay in the home."
      ],
      [
        "Can I finance a metal roof?",
        "Financing is coming soon — it's not available yet. Ask during your free estimate and Paul will let you know as soon as it launches."
      ]
    ]
  },
  {
    "id": "standing-seam-vs-screw-down",
    "title": "Standing Seam vs Screw-Down Metal Roofing: Which Is Right for Your NB Home?",
    "cat": "Metal Roofing",
    "town": "Rothesay",
    "date": "2025-10-05",
    "read": 7,
    "excerpt": "Standing seam vs screw-down (exposed fastener) metal roofing in New Brunswick — how each system works, where each shines, and what Rothesay homeowners should ask.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Metal roofing in New Brunswick comes in two main families, and the difference is how the panels are held down. Choosing between standing seam and screw-down for a home in Rothesay, Quispamsis or Saint John comes down to budget, roof shape and how you feel about maintenance."
          }
        ]
      },
      {
        "type": "h4",
        "text": "How they differ"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Standing seam panels lock together at raised seams, with fasteners hidden under the seam. No exposed screws means no screw washers aging in the sun, and panels can expand and contract with temperature without fighting their fasteners. It is the premium system: clean lines, excellent weather performance, and the longest track record in harsh climates."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Screw-down — often called exposed-fastener or through-fastened metal — drives screws with rubber washers through the panel face into the deck or strapping. It costs less in material and labour, goes on faster, and is widely used on homes, barns and outbuildings across Southern NB. Its trade-off is maintenance: washers age over the years and screws should be checked and, eventually, serviced to keep the roof tight."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Standing seam: hidden fasteners, premium cost, minimal fastener maintenance"
            }
          ],
          [
            {
              "text": "Screw-down: visible fasteners, lower upfront cost, periodic screw checks needed"
            }
          ],
          [
            {
              "text": "Both: 50+ year panel potential when installed and maintained properly"
            }
          ],
          [
            {
              "text": "Both: need correct trim, closures and flashing to perform in NB weather"
            }
          ],
          [
            {
              "text": "Complex roofs with many cuts often favour standing seam detailing"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "Which one for your house?"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "For a forever home in Rothesay where you want the lowest lifetime upkeep, standing seam is hard to beat. For a solid metal roof at a lower entry price — or for garages and outbuildings — screw-down done properly is a proven NB choice. Either way, installation quality decides the outcome: panel alignment, closure strips, trim laps and fastener pattern are where these roofs succeed or fail. Paul installs premium metal systems sourced from Community Metal and Dairy Town Exteriors and will price both honestly at your "
          },
          {
            "text": "free estimate",
            "href": "#quote",
            "external": false
          },
          {
            "text": "."
          }
        ]
      }
    ],
    "faq": [
      [
        "Do exposed screws on a metal roof leak?",
        "Not when installed correctly with proper washers and pattern. Over many years washers age, so screw-down roofs benefit from periodic fastener checks — part of normal metal roof maintenance."
      ],
      [
        "Is standing seam worth the extra cost?",
        "For long-term homeowners, often yes: concealed fasteners remove the main maintenance item and the system handles temperature movement very well. The value depends on your roof and your time horizon."
      ],
      [
        "Can metal roofing go on a low-slope roof?",
        "Some systems suit lower slopes better than others, and standing seam is usually the safer choice there. Pitch is one of the first things checked at a free inspection."
      ]
    ]
  },
  {
    "id": "how-long-metal-roof-lasts",
    "title": "How Long Does a Metal Roof Last in Atlantic Canada's Climate?",
    "cat": "Metal Roofing",
    "town": "Saint John",
    "date": "2025-09-28",
    "read": 6,
    "excerpt": "How long a metal roof lasts in Atlantic Canada: 50+ years with the right install — and the salt air, snow load and freeze-thaw factors that decide it in Saint John.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "A metal roof in Atlantic Canada is not a short-term purchase. Properly installed, a metal roof lasts 50+ years — long enough that most Saint John homeowners who install one never replace a roof again. But that lifespan is earned by installation details and a little maintenance, not just by the material."
          }
        ]
      },
      {
        "type": "h4",
        "text": "What Atlantic Canada throws at a roof"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Our climate is a stress test: heavy wet snow, freeze-thaw cycles that pry at every seam, wind-driven rain off the Bay of Fundy, and salt air near the coast that tests coatings and cut edges. Metal handles these well because it does not absorb water, rot, curl or grow the kind of surface wear that ages shingles. Snow slides off instead of sitting and refreezing, which also reduces ice dam pressure at the eaves."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "The paint system matters here. Our metal carries a 40-year paint warranty on most colours against chipping, cracking and peeling. That warranty, plus correct handling so panels are not scratched during install, is what keeps a roof looking finished decades in — not just standing, but presentable."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Keep valleys and gutters clear so water keeps moving"
            }
          ],
          [
            {
              "text": "Check exposed fasteners and sealant joints as the roof ages"
            }
          ],
          [
            {
              "text": "Rinse heavy salt build-up near the coast when practical"
            }
          ],
          [
            {
              "text": "Trim branches that rub panels in wind"
            }
          ],
          [
            {
              "text": "Fix any scratch or cut edge promptly to protect the coating"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "What shortens a metal roof's life"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Almost never the panels. It is the details: poor flashing at chimneys and walls, missing closures that let driven snow in, mixed metals that corrode each other, and skipped maintenance on fasteners and sealants. That is why Paul's process ends with a final walk-through and why we source systems from Community Metal and Dairy Town Exteriors — the full system, trims included, is designed to age together. Compare lifespans in our "
          },
          {
            "text": "metal vs shingle table",
            "href": "#compare",
            "external": false
          },
          {
            "text": "."
          }
        ]
      }
    ],
    "faq": [
      [
        "How long does a metal roof really last in New Brunswick?",
        "50+ years is the expected service life for a properly installed metal roof in our climate, with a 40-year paint warranty on most colours. Flashing and fastener maintenance along the way keeps it on track."
      ],
      [
        "Does salt air ruin metal roofs near Saint John?",
        "Quality coated steel is made for it. The paint system and prompt touch-up of any cut edges or scratches are what protect the roof in coastal air."
      ],
      [
        "Will a metal roof rust?",
        "Modern coated panels are designed to resist corrosion for decades. Rust problems usually trace to damaged coating, wrong fasteners or debris left sitting on the roof — all preventable with proper install and basic care."
      ]
    ]
  },
  {
    "id": "signs-shingles-need-replacing",
    "title": "9 Signs Your Shingles Need Replacing — Before the Leak Starts",
    "cat": "Shingles",
    "town": "Hampton",
    "date": "2025-08-31",
    "read": 6,
    "excerpt": "Curling, bald spots, granules in the gutters — 9 signs your shingles in Hampton NB are at end of life, and how to tell repair from replacement.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Shingles rarely fail all at once. They warn you — if you know where to look. Catching these signs in Hampton, Quispamsis or Saint John can be the difference between a planned replacement on your schedule and an emergency leak on the worst weekend of winter."
          }
        ]
      },
      {
        "type": "h4",
        "text": "The 9 signs"
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "1. Curling or clawing shingle edges"
            }
          ],
          [
            {
              "text": "2. Bald spots where granules have worn away"
            }
          ],
          [
            {
              "text": "3. Granules filling gutters and piling at downspouts"
            }
          ],
          [
            {
              "text": "4. Cracked, blistered or torn tabs"
            }
          ],
          [
            {
              "text": "5. Missing shingles after wind — even one or two"
            }
          ],
          [
            {
              "text": "6. Daylight or soft spots felt in the attic"
            }
          ],
          [
            {
              "text": "7. Stains spreading on ceilings or top-floor walls"
            }
          ],
          [
            {
              "text": "8. Moss or algae holding moisture across whole slopes"
            }
          ],
          [
            {
              "text": "9. Neighbours with same-age homes all re-roofing — subdivisions age together"
            }
          ]
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Age frames all of it. Architectural shingles typically serve 15 to 30 years depending on exposure and ventilation. A south-facing slope in full sun ages faster than a shaded north slope, so judge your worst slope, not your best one. Curling plus granule loss together usually means the shingle body itself is done, and patching buys little."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Repair or replace?"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "One damaged area from a fallen branch on an otherwise healthy roof is a repair. Widespread curling, granules everywhere and recurring leaks are a replacement conversation. Ventilation deserves a look either way — a hot attic cooks shingles from below and shortens any roof's life. Paul will inspect free, show you what he finds, and tell you honestly which side of the line your roof is on. See "
          },
          {
            "text": "architectural shingles under Services",
            "href": "#services",
            "external": false
          },
          {
            "text": " for the IKO and BP options we install."
          }
        ]
      }
    ],
    "faq": [
      [
        "How do I know if my shingles are at end of life?",
        "Look for the combination: curling edges, heavy granule loss, and age. Any one sign may be repairable; several together usually mean replacement is the economical choice."
      ],
      [
        "Can I just replace the worst slope?",
        "Sometimes, and it can be a sensible stage on a tight budget — but colours will not match a weathered roof exactly, and the other slopes keep aging. Paul will price both options honestly."
      ],
      [
        "Do missing shingles need immediate attention?",
        "Yes. Even a small gap exposes underlayment and deck to driven rain. It is a small repair now and a deck repair later if it is left."
      ]
    ]
  },
  {
    "id": "iko-vs-bp-shingles",
    "title": "IKO vs BP Shingles: Choosing Architectural Shingles in New Brunswick",
    "cat": "Shingles",
    "town": "Quispamsis",
    "date": "2025-10-19",
    "read": 6,
    "excerpt": "IKO vs BP architectural shingles for New Brunswick homes — what actually differs, what is marketing, and how to use the IKO and BP visualizers to choose a colour.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Paul's Roofing installs architectural shingles from Canada's two big names — IKO and BP — and homeowners in Quispamsis reasonably ask which one belongs on their roof. The honest answer: both are proven Canadian products, and the differences that matter are narrower than the brochures suggest."
          }
        ]
      },
      {
        "type": "h4",
        "text": "What is genuinely similar"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Both make laminated architectural shingles designed for Canadian weather, with strong wind performance when installed to spec with proper starter, underlayment and nailing. Both offer wide colour ranges and manufacturer warranties. In practice, the installation system around the shingle — ice-and-water shield at the eaves, proper ventilation, correct nailing pattern, new flashing — decides more of your roof's future than the brand stamp on the bundle."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Where they differ"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Colour palettes and shingle profiles differ, and that is often the deciding factor: one brand's charcoal or weathered-wood tone will suit your siding better than the other's. Granule blends, shadow lines and the size of the shingle exposure change the look from the street. Availability can also matter in a busy season — your preferred colour in one brand may simply be in stock sooner."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Compare actual colour samples against your siding, not photos"
            }
          ],
          [
            {
              "text": "Use the IKO Roof Viewer and BP Canada Visualizer linked under "
            },
            {
              "text": "Services",
              "href": "#services",
              "external": false
            }
          ],
          [
            {
              "text": "Ask what the full system includes: underlayment, ice shield, starter, ridge"
            }
          ],
          [
            {
              "text": "Confirm the nailing and ventilation plan — that is the real warranty protection"
            }
          ],
          [
            {
              "text": "Judge the installed system price, not the bundle price"
            }
          ]
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Bring Paul your short list. He installs both, has no reason to push one, and will tell you which colour and profile suits your house and which system details he is including in the quote. That system conversation is worth more than any brand debate."
          }
        ]
      }
    ],
    "faq": [
      [
        "Are IKO or BP shingles better for New Brunswick winters?",
        "Both are Canadian-made architectural shingles built for our climate. Performance in winter depends mainly on ice-and-water protection, ventilation and installation quality, which we include as part of the system."
      ],
      [
        "Can I see shingle colours on my own house?",
        "Yes. The IKO Roof Viewer and BP Canada Visualizer are linked under Services on this page — upload a photo of your home and try colours before you commit."
      ],
      [
        "Does brand affect the warranty?",
        "Both manufacturers offer warranties on their shingles. Keep your documentation after install, and make sure the roof is installed to spec — installation quality is what keeps any warranty meaningful."
      ]
    ]
  },
  {
    "id": "ice-dams-explained",
    "title": "Ice Dams in Quispamsis & Rothesay: What Causes Them and How to Stop Them for Good",
    "cat": "Ice Dams & Winter",
    "town": "Quispamsis",
    "date": "2026-02-08",
    "read": 8,
    "excerpt": "Ice dams in Quispamsis and Rothesay explained: heat loss, the freeze line at your eaves, and the permanent fixes — insulation, ventilation and ice-and-water shield.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Every winter in Quispamsis and Rothesay, the same ridge of ice builds along eaves, water backs up behind it, and ceilings stain. An ice dam is not a roof failure — it is a heat problem wearing a roof costume. Understanding the anatomy is the first step to stopping it for good."
          }
        ]
      },
      {
        "type": "h4",
        "text": "How an ice dam forms"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Heat escapes from your living space into the attic and warms the roof deck. Snow on the warmer upper roof melts, runs down, and hits the cold eave — which hangs past the heated house and stays at outside temperature. The water freezes there, ridge by ridge, until a dam forms. More meltwater pools behind the dam and, with nowhere to go, works under shingles and into the house. Metal roofs shed snow and water more readily, but the heat-loss cause is the same in any home."
          }
        ]
      },
      {
        "type": "h4",
        "text": "The permanent fixes"
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Seal attic air leaks — pot lights, hatches, plumbing stacks — so heat stays in the house"
            }
          ],
          [
            {
              "text": "Bring attic insulation up to a consistent depth, with no thin spots"
            }
          ],
          [
            {
              "text": "Ventilate properly: clear soffits in, ridge or roof vents out, so the deck stays cold"
            }
          ],
          [
            {
              "text": "Install ice-and-water shield at eaves on any re-roof — it seals around nails under the shingles"
            }
          ],
          [
            {
              "text": "Keep gutters clear in fall so meltwater has somewhere to go"
            }
          ]
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Heat cables and roof raking treat symptoms. They have their place in a bad week, but they do not change the heat loss that builds the dam. The lasting fix is the attic system — air sealing, insulation and ventilation working together — plus correct membrane protection at the eave on your next roof. Paul checks attic conditions during a roof inspection and will show you exactly where your heat is escaping. If water is coming in now, treat it as urgent: our "
          },
          {
            "text": "24/7 emergency service",
            "href": "#quote",
            "external": false
          },
          {
            "text": " exists for exactly that call."
          }
        ]
      }
    ],
    "faq": [
      [
        "What causes ice dams in New Brunswick?",
        "Heat escaping into the attic melts snow on the upper roof; the water refreezes at the cold eave and builds a dam. The root causes are air leaks, thin insulation and poor attic ventilation."
      ],
      [
        "Do ice dams mean my roof is damaged?",
        "Not necessarily — the roof is often fine and the attic is the problem. But backed-up water can damage shingles, decking and ceilings, so dams should be addressed, not ignored season after season."
      ],
      [
        "Will a metal roof stop ice dams?",
        "Metal sheds snow and water better and reduces dam risk, but if attic heat loss is severe, any roof can see ice at the eaves. Fixing heat loss and ventilation is the permanent answer."
      ]
    ]
  },
  {
    "id": "roof-leaking-winter",
    "title": "Roof Leaking in Winter in NB? What to Do in the First 24 Hours",
    "cat": "Repairs & Leaks",
    "town": "Saint John",
    "date": "2026-01-25",
    "read": 6,
    "excerpt": "Roof leaking in winter in Saint John NB? The first 24 hours matter: contain the water, protect the house, what not to climb on, and when it is a 24/7 emergency call.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "A drip in January in Saint John is stressful, and the first 24 hours decide whether it stays a small problem. Here is the order that matters — protect people and belongings first, then the house, then worry about the roof itself."
          }
        ]
      },
      {
        "type": "h4",
        "text": "First: contain and protect"
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Move furniture, electronics and storage out from under the drip"
            }
          ],
          [
            {
              "text": "Set a bucket under the leak; if the ceiling bulges, that is pooled water — call right away"
            }
          ],
          [
            {
              "text": "Lay towels and plastic to protect floors"
            }
          ],
          [
            {
              "text": "If water is near lights or outlets, shut that circuit off and keep clear"
            }
          ],
          [
            {
              "text": "Take phone photos of stains and damage for your records"
            }
          ],
          [
            {
              "text": "In the attic, if it is safe to look, note where water enters — not where it drips below"
            }
          ]
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Water travels. The stain on your ceiling can be metres from the entry point, running along decking, rafters or vapour barrier before it drops. That is why a winter leak is diagnosed from the roof history and the attic, not just from the drip location."
          }
        ]
      },
      {
        "type": "h4",
        "text": "What not to do"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Do not climb on an icy roof. Snow-covered, frozen roofing is one of the most dangerous surfaces on your property, and a fall costs more than any leak. Do not chip ice off shingles with tools — you will damage the roof and possibly void your protection. Do not ignore a slow drip because it stopped; freeze-thaw leaks come and go with temperature and will return."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Common winter causes in NB are ice dam backup, wind-driven snow under flashing, and cracked vent boots or sealant that let go in the cold. Some fixes happen the same visit; some need a temporary seal until a proper repair day. Paul's Roofing offers 24/7 emergency service — "
          },
          {
            "text": "call",
            "href": "tel:+15062714162",
            "external": false
          },
          {
            "text": ", describe what you see, and you will get a straight answer on what happens next. See also our guide on "
          },
          {
            "text": "emergency roof repair",
            "href": "#handbook",
            "external": false
          },
          {
            "text": " in the article list."
          }
        ]
      }
    ],
    "faq": [
      [
        "Is a winter roof leak an emergency?",
        "Active water entering the home is urgent — it damages ceilings, insulation and wiring and grows mould risk. Contain it, protect belongings, and call a roofer with 24/7 emergency service."
      ],
      [
        "Why does my roof only leak sometimes in winter?",
        "Freeze-thaw leaks depend on temperature, snow load and wind. Ice dams and driven snow cause leaks that appear and disappear with conditions — the entry point is still there and should be found."
      ],
      [
        "Should I go on the roof to clear snow off a leak?",
        "No. Icy roofs are extremely dangerous. Leave roof work in winter conditions to a crew with proper safety gear, and focus on containing water inside."
      ]
    ]
  },
  {
    "id": "emergency-roof-repair-saint-john",
    "title": "Emergency Roof Repair in Saint John: Storm Damage, Fallen Branches & Sudden Leaks",
    "cat": "Repairs & Leaks",
    "town": "Saint John",
    "date": "2025-11-22",
    "read": 6,
    "excerpt": "Emergency roof repair in Saint John NB: storm damage, fallen branches and sudden leaks — how tarping works, what happens on an emergency call, and what to do first.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Storm damage in Saint John does not keep business hours. A branch through the roof at midnight, shingles stripped by a Bay of Fundy wind, or a leak that starts mid-storm — here is what emergency roof repair actually involves, and what to do before the crew arrives."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Before you call"
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Keep people and pets out of any room with a sagging or bulging ceiling"
            }
          ],
          [
            {
              "text": "Move what you can out from under the damage and cover the rest with plastic"
            }
          ],
          [
            {
              "text": "If water is near electrical fixtures, shut off that circuit"
            }
          ],
          [
            {
              "text": "Photograph the damage from the ground and inside — do not climb up for a better shot"
            }
          ],
          [
            {
              "text": "Note when the damage happened; your insurer will ask"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "What an emergency visit does"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "The first goal is to stop water entry and make the roof safe: removing debris where it can be done safely, securing loose material, and installing a proper tarp or temporary seal that sheds water until a permanent repair can be completed. A good emergency tarp is fastened to hold in wind without driving unnecessary holes into sound roof areas — a rushed tarp can cause the next leak."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "After the house is dry, the permanent repair is scoped honestly: is this a section repair, or did the storm expose a roof that was already at end of life? Paul will show you what he finds and price the real fix. Paul's Roofing runs 24/7 emergency service across Saint John, Quispamsis and Southern NB — Mon to Fri 6:00 a.m. to 7:00 p.m. for regular work, and around the clock when a roof is open to the weather. "
          },
          {
            "text": "Call",
            "href": "tel:+15062714162",
            "external": false
          },
          {
            "text": " and describe the damage; you will be told plainly what can happen tonight and what happens next."
          }
        ]
      }
    ],
    "faq": [
      [
        "What counts as a roofing emergency?",
        "Any opening in the roof letting weather in: storm tears, fallen branches, sudden active leaks, or damage exposing decking. If water is entering the home, treat it as an emergency."
      ],
      [
        "Will a tarp damage my roof?",
        "A properly installed emergency tarp is designed to protect without causing new damage. It is a temporary measure — the permanent repair should follow as soon as conditions allow."
      ],
      [
        "Should I call my insurer first or a roofer first?",
        "Stop the water first. Make the roof safe and dry, photograph everything, then notify your insurer with the roofer's findings in hand."
      ]
    ]
  },
  {
    "id": "fall-roof-inspection-checklist",
    "title": "Fall Roof Inspection Checklist for New Brunswick Homeowners",
    "cat": "Maintenance",
    "town": "Quispamsis",
    "date": "2025-10-26",
    "read": 6,
    "excerpt": "Fall roof inspection checklist for New Brunswick: shingles, flashing, gutters, attic and vents — what to check in October in Quispamsis before winter tests your roof.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "October in Quispamsis is your last easy chance to find small problems before winter makes them expensive. You do not need to climb the roof to do most of this checklist — binoculars from the ground and a look in the attic cover most of it."
          }
        ]
      },
      {
        "type": "h4",
        "text": "From the ground"
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Scan for missing, curled or cracked shingles, especially on the south slope"
            }
          ],
          [
            {
              "text": "Look for sagging lines along the ridge or eaves"
            }
          ],
          [
            {
              "text": "Check that metal panels and trim sit flat, with no lifted edges"
            }
          ],
          [
            {
              "text": "Look for granule piles at downspout outlets"
            }
          ],
          [
            {
              "text": "Confirm gutters are not pulling away from the fascia"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "Flashing, gutters and attic"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Flashing is where roofs leak: chimney, valleys, wall junctions and vent boots. From the ground, look for rust streaks, gaps or flashing that has pulled loose. Clean gutters and downspouts before freeze-up — a clogged gutter in November is an ice problem in January. Then check the attic on a bright day: look for daylight at penetrations, water stains on decking, damp insulation, and blocked soffit vents. A musty attic smell in fall often means ventilation trouble that winter will expose."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Trim back branches that touch or overhang the roof — they rub finishes, drop debris into valleys and give snow a bridge. If anything on this list looks wrong and you cannot safely reach it, book a free inspection instead of climbing. Paul's fall inspections across Southern NB cover the roof, flashing, gutters and attic signs, and you get a straight answer: fine until spring, small repair now, or start planning a replacement. See "
          },
          {
            "text": "Services",
            "href": "#services",
            "external": false
          },
          {
            "text": " for what an inspection includes."
          }
        ]
      }
    ],
    "faq": [
      [
        "When should I inspect my roof in New Brunswick?",
        "Twice a year is ideal: spring after melt, and fall before freeze-up. Fall is the critical one — it is your last chance to fix small problems before winter conditions make them urgent."
      ],
      [
        "Can I inspect my roof without climbing on it?",
        "Yes, most of it. Ground-level binocular checks plus an attic inspection catch the majority of problems. Leave walking the roof to a roofer with safety gear, especially on steep or metal roofs."
      ],
      [
        "What is the most common fall finding?",
        "Clogged gutters, lifted shingles after summer storms, and cracked vent boots or sealant. All three are small fixes in October and leak sources by January."
      ]
    ]
  },
  {
    "id": "roof-ventilation-guide",
    "title": "Attic Ventilation in NB Homes: Why Your Roof Is Cooking From the Inside",
    "cat": "Maintenance",
    "town": "Rothesay",
    "date": "2025-09-07",
    "read": 7,
    "excerpt": "Attic ventilation in New Brunswick homes: how soffit and ridge vents work together, why poor airflow cooks shingles and builds ice dams, and the signs in your attic.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Ventilation is the least visible part of your roof and one of the most important. In Rothesay and across Southern New Brunswick, a poorly vented attic quietly shortens shingle life, drives ice dams, and keeps insulation damp — all without a single visible leak."
          }
        ]
      },
      {
        "type": "h4",
        "text": "How it is supposed to work"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Cool air should enter low, at the soffits, wash up along the underside of the roof deck, and exit high at the ridge or roof vents. That airflow keeps the deck cold in winter — so snow does not melt and refreeze into ice dams — and carries heat and moisture out in summer, so shingles are not baked from below and attic humidity does not condense on cold decking."
          }
        ]
      },
      {
        "type": "h4",
        "text": "What goes wrong"
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Soffit vents buried under blown-in insulation with no baffles"
            }
          ],
          [
            {
              "text": "Ridge vent installed but soffits painted shut or never opened"
            }
          ],
          [
            {
              "text": "Bathroom fans venting into the attic instead of outside"
            }
          ],
          [
            {
              "text": "Mixed vent types short-circuiting each other's airflow"
            }
          ],
          [
            {
              "text": "Too little vent area for the attic size"
            }
          ]
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "The symptoms show up as a hot top floor in summer, frost or damp sheathing in the attic in winter, early curling of shingles, and recurring ice dams despite decent insulation. Homeowners often blame the shingles when the real culprit is the air — or lack of it — underneath them."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Every Paul's Roofing replacement includes a ventilation check, because a new roof over a suffocating attic is a wasted opportunity. Fixes range from clearing and baffling soffits to adding proper ridge venting during a re-roof. If your attic is musty, your top floor cooks, or ice dams return every year, ask for the attic to be checked at your "
          },
          {
            "text": "free inspection",
            "href": "#quote",
            "external": false
          },
          {
            "text": " — it is part of the roof, whether you can see it or not."
          }
        ]
      }
    ],
    "faq": [
      [
        "What are the signs of poor attic ventilation?",
        "A very hot top floor in summer, frost or moisture on attic decking in winter, musty smells, prematurely curling shingles and recurring ice dams are the classic signs."
      ],
      [
        "Does ventilation really affect shingle life?",
        "Yes. Heat build-up from below ages shingles faster and can affect manufacturer warranty expectations. Ventilation is part of the roofing system, not an extra."
      ],
      [
        "Can ventilation be fixed without a new roof?",
        "Often, yes — clearing blocked soffits, adding baffles, correcting bathroom fan venting and adding vents can all be done on an existing roof. A re-roof is simply the easiest time to get the whole system right."
      ]
    ]
  },
  {
    "id": "gutter-guide-nb",
    "title": "Gutters in New Brunswick: Cleaning, Repair & When Clogged Gutters Damage Your Roof",
    "cat": "Gutters & Exterior",
    "town": "Grand Bay-Westfield",
    "date": "2025-11-15",
    "read": 6,
    "excerpt": "Gutters in New Brunswick: cleaning schedule, repairs, and how clogged gutters in Grand Bay-Westfield back water under shingles, rot fascia and feed ice dams.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Gutters are a roof component, not an accessory. In Grand Bay-Westfield and across Southern New Brunswick, a clogged or sagging gutter quietly damages the very roof edge it is meant to protect — backing water under shingles, rotting fascia, and feeding ice dams all winter."
          }
        ]
      },
      {
        "type": "h4",
        "text": "What clogged gutters actually do"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "When a gutter fills with leaves and granules, water overflows at the eave and soaks the fascia and soffit. In freeze-thaw weather, that standing water becomes ice weight that pulls gutters loose and wedges under the first course of shingles. Overflowing water also pours down walls, pools at foundations, and stains siding — a small maintenance miss with a long damage list."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Clean gutters in late fall after leaf drop, and again in spring"
            }
          ],
          [
            {
              "text": "Check downspouts actually run clear — pour water and watch"
            }
          ],
          [
            {
              "text": "Re-secure any gutter pulling away from the fascia"
            }
          ],
          [
            {
              "text": "Fix low spots where water stands instead of draining"
            }
          ],
          [
            {
              "text": "Keep valleys clear — debris dams there overflow into the roof"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "Repair or replace?"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "A loose section, a leaking joint or one crushed downspout is a repair. Gutters that are rusted through, repeatedly pulling out of rotted fascia, or sloped wrong along their whole run are telling you the system — sometimes including the fascia board behind it — needs replacement. Our "
          },
          {
            "text": "exterior maintenance service",
            "href": "#services",
            "external": false
          },
          {
            "text": " covers gutter cleaning and repair, fascia and soffit work, so the whole eave line is dealt with together rather than patched in circles."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Safety note: eave work means ladders at height, often on wet ground in November. If your gutters are two storeys up, that cleaning belongs to a crew. Book it with your fall inspection and both get done in one visit."
          }
        ]
      }
    ],
    "faq": [
      [
        "How often should gutters be cleaned in New Brunswick?",
        "At minimum every fall after the leaves drop, and a spring check is wise — especially with trees overhanging the roof. Homes under heavy tree cover may need more."
      ],
      [
        "Can clogged gutters really damage the roof?",
        "Yes. Overflowing water soaks fascia and soffits, works under the eave edge of the roofing, and contributes to ice dams. Gutter neglect is one of the most common causes of eave rot we find."
      ],
      [
        "Do gutter guards solve the problem?",
        "Guards reduce leaf build-up but do not eliminate maintenance — fine debris and granules still collect, and guards themselves need checking. They are a help, not a cure."
      ]
    ]
  },
  {
    "id": "moss-algae-shingles",
    "title": "Moss & Algae on Shingles: Harmless Stain or Roof Problem?",
    "cat": "Shingles",
    "town": "Kingston Peninsula",
    "date": "2025-08-10",
    "read": 5,
    "excerpt": "Moss and algae on shingles on the Kingston Peninsula: which growth is cosmetic, which holds moisture and lifts shingles, and how to clean without damaging the roof.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Green and black streaks on a shaded roof on the Kingston Peninsula are common — but common is not the same as harmless. Here is how to tell cosmetic algae from moss that is quietly shortening your shingles' life."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Algae vs moss"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Black or dark streaks are usually algae: mostly a cosmetic problem that makes a roof look older than it is. It does not lift shingles, though heavy growth holds some surface moisture. Moss is different. Moss grows in tufts that wedge under shingle edges, lift tabs, and hold water against the roof through every freeze-thaw cycle. Left for seasons, moss turns a sound shingle roof into a leaking one, starting exactly where the moss is thickest."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Treat black streaks as cosmetic — clean gently if appearance matters"
            }
          ],
          [
            {
              "text": "Treat moss as a maintenance problem — remove it before it lifts tabs"
            }
          ],
          [
            {
              "text": "Never pressure-wash shingles: it strips granules and years of life"
            }
          ],
          [
            {
              "text": "Trim branches to get sun and airflow onto shaded slopes"
            }
          ],
          [
            {
              "text": "Clear leaf build-up in valleys where moss starts"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "Cleaning without damage"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "The safe approach is gentle: soft removal of moss growth and a cleaner made for shingle roofs, applied without high pressure, followed by rinsing. Aggressive scraping tears granules and cracks aged tabs. If shingles are already curling or brittle, cleaning may do more harm than good — that roof needs an inspection and an honest conversation about remaining life, not a wash."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Prevention is shade management and debris control. A slope that dries after rain grows little; a slope that stays wet under trees grows everything. Paul can tell you at a "
          },
          {
            "text": "free inspection",
            "href": "#quote",
            "external": false
          },
          {
            "text": " whether your growth is cosmetic, a cleaning job, or a sign the shingles themselves are done."
          }
        ]
      }
    ],
    "faq": [
      [
        "Does moss damage shingles?",
        "Yes. Moss lifts shingle edges and holds moisture against the roof, accelerating wear and creating leak paths — especially through freeze-thaw cycles. Algae streaks, by contrast, are mostly cosmetic."
      ],
      [
        "Can I pressure wash moss off my roof?",
        "No. Pressure washing strips the protective granules from shingles and can cut years off the roof's life. Gentle cleaning methods made for shingles are the safe route."
      ],
      [
        "Why does moss only grow on one side of my roof?",
        "The north and shaded slopes stay damp longest, which is exactly what moss needs. Tree cover over that slope makes it worse by blocking sun and dropping debris."
      ]
    ]
  },
  {
    "id": "roof-repair-vs-replacement",
    "title": "Roof Repair vs Full Replacement: An Honest Roofer's Decision Guide",
    "cat": "Repairs & Leaks",
    "town": "Hampton",
    "date": "2025-12-06",
    "read": 7,
    "excerpt": "Repair or replace your roof in Hampton NB? Age, damage spread, deck condition and leak history — the honest decision framework Paul uses, including when repair is a waste.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "It is the biggest question in roofing, and the one where homeowners most fear being sold. Here is the framework Paul uses in Hampton and across Southern New Brunswick — the same one he would use on his own house."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Repair makes sense when…"
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "The damage is local: one leak source, one storm-damaged area, one failed flashing"
            }
          ],
          [
            {
              "text": "The rest of the roof is sound — shingles flat, granules in place, no widespread curling"
            }
          ],
          [
            {
              "text": "The roof is well within its expected service life"
            }
          ],
          [
            {
              "text": "The deck underneath is dry and solid"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "Replacement makes sense when…"
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Leaks keep appearing in different places — the system is failing, not a spot"
            }
          ],
          [
            {
              "text": "Curling, cracking or granule loss is widespread across slopes"
            }
          ],
          [
            {
              "text": "The roof is at or past its expected life for the material"
            }
          ],
          [
            {
              "text": "Deck rot is spreading, or past repairs keep failing"
            }
          ],
          [
            {
              "text": "You are repairing the same roof every year — add those bills up honestly"
            }
          ]
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "The trap is the middle: spending repair money, season after season, on a roof whose materials are done. Each repair is small; the total quietly approaches replacement money while the deck keeps getting wet. The opposite trap is replacing a roof with years of life left because one vent boot cracked — a small part with a big symptom."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Our job at a free inspection is to show you which roof you actually have: photos of the damage, the condition of the surrounding material, and both prices when both are defensible. Financing is coming soon if replacement is right but timing is tight — ask Paul about it at your free inspection. Read "
          },
          {
            "text": "our replacement guide",
            "href": "#handbook",
            "external": false
          },
          {
            "text": " for what a full job involves, then decide with evidence in hand."
          }
        ]
      }
    ],
    "faq": [
      [
        "How many repairs before I should just replace the roof?",
        "There is no magic number, but the pattern matters: leaks in new places each season on an aging roof means the system is done. Repairs on a young, otherwise sound roof are money well spent."
      ],
      [
        "Can a roofer tell without tearing anything off?",
        "Mostly, yes. Surface condition, attic evidence, age and leak history tell an experienced roofer a great deal. Hidden deck damage is the one thing only confirmed at tear-off."
      ],
      [
        "Is it worth replacing a roof before selling?",
        "It depends on the roof's condition and your market. A failed roof scares buyers and lenders; a sound roof with a repair receipt may be enough. Get an honest condition report first."
      ]
    ]
  },
  {
    "id": "metal-roof-hampton",
    "title": "Metal Roofing in Hampton, NB: What Hampton Homeowners Ask Us Most",
    "cat": "Towns",
    "town": "Hampton",
    "date": "2025-07-26",
    "read": 6,
    "excerpt": "Metal roofing in Hampton NB: farmhouses, snow load, colour choices and cost factors — the questions Hampton homeowners ask Paul's Roofing most, answered straight.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Hampton has the mix that tests roofs: older farmhouses, newer subdivisions, open wind across the Kennebecasis valley and plenty of snow. It is also one of our busiest metal roofing towns. Here are the questions Hampton homeowners ask most."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Is metal right for an older Hampton farmhouse?"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Often, yes. Older homes carry decades of roof layers and patch history. A tear-off to the deck, proper underlayment and a metal system with a 50+ year lifespan ends the cycle — and metal suits the traditional look of Hampton homes, especially in classic colours like charcoal, deep green and barn red. The structure check matters: we confirm the deck and framing are sound before panels go on, and repair what tear-off reveals."
          }
        ]
      },
      {
        "type": "h4",
        "text": "What about snow?"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Metal sheds snow, which Hampton roofs appreciate — but shedding needs managing. Snow rails over doors, decks and walkways hold snow back so it melts in place instead of sliding in one slab. Snow retention is part of the quote conversation for every Hampton metal roof, not an afterthought."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "How long will it last? 50+ years, with a 40-year paint warranty on most colours"
            }
          ],
          [
            {
              "text": "Is it noisy in rain? No — installed over a solid deck with underlayment, it sounds like any other roof"
            }
          ],
          [
            {
              "text": "Can it go over my old shingles? We tear off to inspect the deck — it is the only way to know it is sound"
            }
          ],
          [
            {
              "text": "What drives the price? Size, pitch, trim count, tear-off and access — see our cost guide in this blog"
            }
          ],
          [
            {
              "text": "Do you finance? Financing is coming soon — ask at your free estimate"
            }
          ]
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Hampton homeowners also ask about colour against brick and siding — the visualizers under "
          },
          {
            "text": "Services",
            "href": "#services",
            "external": false
          },
          {
            "text": " let you try options on your own house photo. Book a "
          },
          {
            "text": "free quote in Hampton",
            "href": "#quote",
            "external": false
          },
          {
            "text": " and Paul will measure, check the deck plan, and price metal and shingles side by side if you want the comparison."
          }
        ]
      }
    ],
    "faq": [
      [
        "Do you install metal roofs in Hampton, NB?",
        "Yes. Hampton is part of our regular service area, along with Quispamsis, Rothesay, Saint John, Grand Bay-Westfield, Sussex, St. Martins and the Kingston Peninsula."
      ],
      [
        "Will a metal roof change the look of my older home?",
        "Metal suits traditional Hampton homes well — profiles and colours range from classic to modern. Trying colours with the visualizers linked under Services helps you see it before deciding."
      ],
      [
        "Does a metal roof need snow guards in Hampton?",
        "Over entrances, decks and walkways, snow rails are strongly recommended so sliding snow is held and melts gradually. Paul includes that conversation in every metal quote."
      ]
    ]
  },
  {
    "id": "roofing-quispamsis-rothesay",
    "title": "Roofing in Quispamsis & Rothesay: Local Guide to Replacements, Repairs & Metal Roofs",
    "cat": "Towns",
    "town": "Quispamsis",
    "date": "2025-08-02",
    "read": 7,
    "excerpt": "Roofing in Quispamsis and Rothesay NB: replacement timing, common local leak causes, metal roof popularity and what a local quote should include — from a Quispamsis roofer.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Paul's Roofing is based in Quispamsis, and Quispamsis and Rothesay are home turf. The housing stock here — 1970s to 2000s subdivisions, river-facing homes in Rothesay, and steady new builds — creates a predictable pattern of roofing needs we see every week."
          }
        ]
      },
      {
        "type": "h4",
        "text": "What we see locally"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Subdivision roofs age together. When one Quispamsis street starts re-roofing, most homes on it are within a few years of each other, and the signs are the same: curling shingles, granules in gutters, and the first ceiling stains. Rothesay's larger, often steeper and more complex roofs add flashing challenges — multiple valleys, chimneys and wall junctions where installation quality from the original build shows up decades later."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Wind off the Kennebecasis and river exposure drive lifted tabs and driven-rain leaks on exposed slopes. Tree cover in older Rothesay neighbourhoods keeps north slopes damp and mossy. Ice dams hit both towns hard in freeze-thaw winters, especially on homes with complex eave lines and heated-space losses into the attic."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Most common call in Quispamsis: aging shingle roofs reaching end of life together"
            }
          ],
          [
            {
              "text": "Most common call in Rothesay: complex-roof flashing leaks and metal upgrades"
            }
          ],
          [
            {
              "text": "Most common winter call in both: ice dam leaks"
            }
          ],
          [
            {
              "text": "Most common mistake: reusing old flashing on a new roof"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "What a local quote should include"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Tear-off to the deck, deck repairs, underlayment and ice-and-water shield, new flashing, ventilation check, cleanup and a final walk-through — itemized. Whether you choose metal (50+ year lifespan, 40-year paint warranty on most colours) or IKO or BP architectural shingles, that system list should not change. Paul lives and works here; the "
          },
          {
            "text": "free quote",
            "href": "#quote",
            "external": false
          },
          {
            "text": " comes with the address of the business behind it — Quispamsis, New Brunswick, 30 years of it."
          }
        ]
      }
    ],
    "faq": [
      [
        "Are you a local Quispamsis roofing company?",
        "Yes. Paul's Roofing is based in Quispamsis and serves Rothesay, Saint John, Hampton, Grand Bay-Westfield, Sussex, St. Martins and the Kingston Peninsula."
      ],
      [
        "Why is my whole street replacing roofs at once?",
        "Subdivisions were built and roofed at the same time with similar materials, so the roofs reach end of life together. It is a good prompt to have yours inspected, not a reason to panic."
      ],
      [
        "Do you offer free roof inspections in Rothesay?",
        "Yes — free inspections and itemized quotes across our service area. Call, email, or use the quote form on this page."
      ]
    ]
  },
  {
    "id": "winter-roof-damage-snow-load",
    "title": "Snow Load & Winter Roof Damage in New Brunswick: How Much Snow Is Too Much?",
    "cat": "Ice Dams & Winter",
    "town": "Sussex",
    "date": "2026-02-15",
    "read": 6,
    "excerpt": "Snow load and winter roof damage in New Brunswick: how much snow is too much in Sussex and Southern NB, the warning signs of overload, and when to clear a roof safely.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "A New Brunswick roof is built for snow — but wet, heavy snow after a thaw-and-freeze cycle is a different load than fresh powder, and Sussex and Southern NB homes see both every winter. Here is how to judge what is on your roof and what actually needs doing."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Weight, not depth"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "What matters is water content. Light fluffy snow weighs little; the same depth of wet snow or snow soaked by rain weighs many times more. Ice layers hidden in the pack add more again. Trouble signs are rarely subtle when a roof is genuinely overloaded: doors suddenly sticking, new cracks in interior walls or ceilings, creaking or popping sounds from the structure, and visible sagging along the ridge or eaves. Those signs mean call a professional promptly — that is a structural conversation, not a shovelling one."
          }
        ]
      },
      {
        "type": "h4",
        "text": "When clearing makes sense"
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Ice dam is actively leaking and the snow feeding it can be safely reduced from the ground"
            }
          ],
          [
            {
              "text": "Very deep, wet accumulation on a low-slope or older roof"
            }
          ],
          [
            {
              "text": "Snow piled against a wall or in a valley where two roofs meet"
            }
          ],
          [
            {
              "text": "Drifts burying vents — blocked plumbing vents cause their own problems"
            }
          ]
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Use a roof rake from the ground when you can, and only clear what you can reach safely. Never climb onto a snowy roof, and never chip ice off the roofing itself. Metal roofs shed snow on their own schedule — keep people and pets clear of eave lines after storms, and ask about snow rails at entrances when a metal roof is installed."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Most NB roofs, most winters, need nothing but monitoring. The winters that cause damage combine heavy wet snow, rain on top of it, and a freeze. If you are unsure about your roof after such a storm, a "
          },
          {
            "text": "free inspection",
            "href": "#quote",
            "external": false
          },
          {
            "text": " once it is safe beats worrying — or climbing — in the meantime."
          }
        ]
      }
    ],
    "faq": [
      [
        "How much snow is too much for a roof in New Brunswick?",
        "It depends on snow density, roof pitch and structure — wet snow and ice weigh far more than fresh snow. Warning signs like sticking doors, new ceiling cracks or sagging mean get a professional assessment promptly."
      ],
      [
        "Should I rake snow off my roof?",
        "A roof rake used from the ground to reduce snow feeding an ice dam or burying vents is reasonable. Climbing onto a snowy roof or chipping ice off the surface is dangerous and damaging — leave that to a crew."
      ],
      [
        "Do metal roofs handle snow load better?",
        "Metal sheds snow rather than holding it, which reduces sustained load. That shedding is why snow rails over doors and walkways are part of a proper metal installation in NB."
      ]
    ]
  },
  {
    "id": "spring-roof-check",
    "title": "Spring Roof Check: What Winter Did to Your Roof (and What to Fix First)",
    "cat": "Maintenance",
    "town": "Saint John",
    "date": "2026-03-22",
    "read": 6,
    "excerpt": "Spring roof check in Saint John NB: lifted shingles, flashing damage, gutter overload and attic moisture — what winter did to your roof and what to fix first.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "When the snow leaves a Saint John roof in spring, it tells the winter's story. Freeze-thaw, ice, wind and snow load each leave a signature. A half-hour spring check — mostly from the ground — tells you what to fix first while the weather is on your side."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Walk the list in order"
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Shingles: lifted, cracked or missing tabs, worst after the windward storms"
            }
          ],
          [
            {
              "text": "Flashing: chimney and valley metal bent, lifted or re-caulked-looking patches that failed"
            }
          ],
          [
            {
              "text": "Gutters: sagging runs, pulled spikes, joints opened by ice weight"
            }
          ],
          [
            {
              "text": "Eaves: water stains on soffits — the fingerprint of ice dam backup"
            }
          ],
          [
            {
              "text": "Attic: fresh stains on decking, damp insulation, mould smell after melt"
            }
          ],
          [
            {
              "text": "Ceilings: any new stain upstairs maps to a roof story worth tracing"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "Fix first: anything that lets water in"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Prioritize active entry points — flashing failures, missing shingles, cracked vent boots — because spring rain in NB is relentless and a small opening in April is deck rot by fall. Gutter and fascia damage comes next, since the eave system protects the roof edge all year. Cosmetic items — algae streaks, minor granule loss on an aging roof — go on the planning list, not the emergency list."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Spring is also booking season. Roofers' calendars across Southern NB fill fast once the snow is gone, so a roof that needs replacement this year should be quoted in spring, not discovered in October. Paul's free spring inspections cover roof, flashing, gutters and attic signs — book through the "
          },
          {
            "text": "quote form",
            "href": "#quote",
            "external": false
          },
          {
            "text": " or by phone, Mon to Fri 6:00 a.m. to 7:00 p.m."
          }
        ]
      }
    ],
    "faq": [
      [
        "When should I check my roof in spring?",
        "As soon as the snow is off and it is safe to observe — ideally before heavy spring rains. Most of the check is done from the ground and the attic, not on the roof itself."
      ],
      [
        "What is the most common winter roof damage in NB?",
        "Lifted or missing shingles from wind, flashing and sealant failures from freeze-thaw, ice-loaded gutter damage, and attic moisture from a winter of poor ventilation."
      ],
      [
        "My ceiling stained in winter but stopped. Is it fixed?",
        "No — it means conditions changed, not that the entry point closed. Freeze-thaw and ice dam leaks return with the same conditions. Have the source found while the evidence is fresh."
      ]
    ]
  },
  {
    "id": "chimney-flashing-leaks",
    "title": "Chimney Flashing Leaks: Why the Chimney Is the #1 Leak Source We Fix",
    "cat": "Repairs & Leaks",
    "town": "Rothesay",
    "date": "2025-12-13",
    "read": 6,
    "excerpt": "Chimney flashing leaks in Rothesay NB: step flashing, counterflashing and cricket basics — why chimneys leak first, and why caulk is not a flashing repair.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "If we had to bet where a leak starts, we would bet on the chimney. In Rothesay and across Southern New Brunswick, chimney flashing is the single most common leak source we fix — and the most commonly patched wrong."
          }
        ]
      },
      {
        "type": "h4",
        "text": "How chimney flashing is supposed to work"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "A chimney punches a large hole through the roof, and water must be managed on all four sides. Step flashing weaves individual metal pieces with each shingle course up the sides. Counterflashing, cut into the chimney's mortar joints, overlaps the step flashing so water running down the brick is kicked out onto the roof. The uphill side needs a cricket — a small peaked diverter — on wider chimneys so water and snow do not sit against the back face. Apron flashing finishes the downhill side."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Why it fails"
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Original flashing was surface-mounted and caulked instead of cut into mortar"
            }
          ],
          [
            {
              "text": "Caulk ages, cracks and lets go — then gets re-caulked in a losing cycle"
            }
          ],
          [
            {
              "text": "Mortar joints crumble and take the counterflashing's grip with them"
            }
          ],
          [
            {
              "text": "New roof installed over old, reused flashing that was already tired"
            }
          ],
          [
            {
              "text": "Ice and snow sit against the back of the chimney every winter"
            }
          ]
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "The stain pattern gives it away: ceiling stains near the chimney breast, damp in the attic beside the brick, and leaks that show up in heavy rain or spring melt. The real fix is mechanical — proper step and counterflashing, sound mortar, and a cricket where the chimney needs one — not another tube of sealant. Chimney inspection and repair, flashing installation and waterproofing are core "
          },
          {
            "text": "Paul's Roofing services",
            "href": "#services",
            "external": false
          },
          {
            "text": "; a chimney leak caught early is a flashing job, while one left for years becomes a deck and framing job."
          }
        ]
      }
    ],
    "faq": [
      [
        "Why does my chimney leak only in heavy rain?",
        "Wind-driven and high-volume rain finds gaps that light rain does not — typically failed counterflashing or cracked sealant joints. The gap is there in all weather; heavy rain just proves it."
      ],
      [
        "Can I just re-caulk my chimney flashing?",
        "Caulk is a sealant, not a flashing system. It can buy a short reprieve, but a lasting repair means proper step and counterflashing mechanically integrated with the roof and chimney."
      ],
      [
        "Should flashing be replaced with a new roof?",
        "Yes. New flashing is part of a proper replacement. Reusing old flashing on a new roof is one of the most common shortcuts — and one of the most common causes of early leaks."
      ]
    ]
  },
  {
    "id": "metal-roof-noise-myths",
    "title": "Metal Roof Myths: Noise, Lightning, Rust & Cell Signal — What's Actually True",
    "cat": "Metal Roofing",
    "town": "Grand Bay-Westfield",
    "date": "2025-11-29",
    "read": 6,
    "excerpt": "Metal roof myths for Grand Bay-Westfield homeowners: rain noise, lightning, rust and cell signal — what is actually true, from 30 years of installing metal in NB.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Metal roofing attracts myths like no other material. In Grand Bay-Westfield and across Southern New Brunswick, these are the ones we hear at estimates — and what 30 years of installing metal in NB says is actually true."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Myth 1: A metal roof is loud in rain"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "A metal roof installed over a solid deck with underlayment — the way a house roof is built — sounds like any other roof in rain. The loud metal roof people picture is a barn roof: thin panels over open framing with nothing beneath. Your home has decking, underlayment, attic insulation and ceilings between you and the weather. Homeowners are consistently surprised how ordinary it sounds."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Myth 2: Metal attracts lightning"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Metal does not attract lightning; lightning strikes the highest point regardless of material. A metal roof is non-combustible, which is actually an advantage if a strike or nearby fire occurs. This myth refuses to die, but the physics is settled."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Myth 3: Metal roofs rust out"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Modern coated steel panels are engineered for decades outdoors, and our metal carries a 40-year paint warranty on most colours against chipping, cracking and peeling, plus a lifetime material warranty against defects on the steel panels. Rust problems trace to damaged coatings left unrepaired, wrong fasteners, or debris sitting wet on the roof — maintenance items, not material destiny."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Noise: no louder than shingles over a solid deck"
            }
          ],
          [
            {
              "text": "Lightning: not attracted; metal is non-combustible"
            }
          ],
          [
            {
              "text": "Rust: coatings and prompt touch-ups prevent it"
            }
          ],
          [
            {
              "text": "Cell signal: no meaningful effect in a wood-frame house"
            }
          ],
          [
            {
              "text": "Dents: quality panels resist NB hail and debris well"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "Myth 4: It kills your cell signal"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "A metal roof is one surface among walls, windows and doors that signals pass through. Homeowners do not report signal loss after a metal install in a typical wood-frame NB home. If you have questions not covered here, bring them to your "
          },
          {
            "text": "free estimate",
            "href": "#quote",
            "external": false
          },
          {
            "text": " — straight answers are the whole point of this blog."
          }
        ]
      }
    ],
    "faq": [
      [
        "Is a metal roof noisy when it rains?",
        "No — not on a house. Installed over solid decking with underlayment, a metal roof sounds comparable to shingles. The noisy reputation comes from open-frame barn roofs."
      ],
      [
        "Does a metal roof attract lightning?",
        "No. Lightning targets height and shape, not material. Metal is also non-combustible, which is a safety plus."
      ],
      [
        "Will a metal roof interfere with cell phone reception?",
        "Homeowners in standard wood-frame homes do not experience meaningful signal loss from a metal roof. Signals enter through walls and windows as well as the roof line."
      ]
    ]
  },
  {
    "id": "new-roof-before-selling",
    "title": "Selling Your NB Home? What a New Roof Does (and Doesn't) Do for Your Sale",
    "cat": "Cost & Financing",
    "town": "Quispamsis",
    "date": "2026-03-08",
    "read": 6,
    "excerpt": "Selling a home in Quispamsis NB with an old roof? What a new roof does for buyers, inspectors and lenders — and when a repair and a condition report are the smarter move.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Few things complicate a home sale in Quispamsis like a tired roof. Buyers see risk, inspectors flag it, and lenders and insurers ask questions. Here is what a new roof does — and does not — do for a sale in Southern New Brunswick, honestly."
          }
        ]
      },
      {
        "type": "h4",
        "text": "What a good roof does for your sale"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "It removes an objection. A sound, documented roof lets buyers focus on the house instead of budgeting a replacement into their offer. A new metal roof is a strong listing feature: 50+ year lifespan, 40-year paint warranty on most colours, and low maintenance are easy for buyers to value. A new architectural shingle roof from IKO or BP similarly resets the clock buyers worry about. Keep the paperwork — quote, material details and warranty documents — in a folder for the buyer's inspector."
          }
        ]
      },
      {
        "type": "h4",
        "text": "What it does not do"
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "It does not guarantee a dollar-for-dollar price increase"
            }
          ],
          [
            {
              "text": "It does not fix other inspection findings — attic moisture or ventilation issues still show"
            }
          ],
          [
            {
              "text": "It does not help if done poorly: reused flashing and skipped underlayment get found"
            }
          ],
          [
            {
              "text": "A layover roof can raise more questions than it answers"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "Repair and report: the middle path"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "If the roof has real life left, a targeted repair plus a written condition note from a roofer can be the smarter spend. Buyers fear the unknown more than an honest, documented older roof. What does not work is hiding a known active leak — it will be found, and it costs trust along with money."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Before listing, get a free inspection and decide with evidence: replace, repair and document, or sell as-is with the roof priced into your expectations. Paul will give you the condition straight, whichever way it cuts — see "
          },
          {
            "text": "what we install",
            "href": "#services",
            "external": false
          },
          {
            "text": " and book through the "
          },
          {
            "text": "quote form",
            "href": "#quote",
            "external": false
          },
          {
            "text": "."
          }
        ]
      }
    ],
    "faq": [
      [
        "Should I replace my roof before selling my NB home?",
        "If the roof is at end of life or actively leaking, replacement usually helps the sale by removing a major buyer objection. If it has sound years left, a repair and a documented inspection may be the better investment."
      ],
      [
        "Does a new roof increase home value?",
        "A new roof supports value and marketability and can speed a sale, but it rarely returns its full cost in price alone. Its biggest effect is removing a reason for buyers to discount or walk away."
      ],
      [
        "What roof paperwork should I give a buyer?",
        "The installation quote or invoice, material and colour details, and any warranty documentation. A tidy paper trail reassures buyers, inspectors and insurers."
      ]
    ]
  },
  {
    "id": "roof-age-guide",
    "title": "How Old Is Too Old? Roof Age Guide for Shingle & Metal Roofs in NB",
    "cat": "Maintenance",
    "town": "Sussex",
    "date": "2025-07-19",
    "read": 6,
    "excerpt": "How old is too old for a roof in New Brunswick? Age guide for shingle and metal roofs in Sussex NB — expected service life, and the condition signs that matter more than birthdays.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Homeowners in Sussex ask for a number: at what age is a roof done? Age matters, but condition decides. Here is the honest guide for Southern New Brunswick roofs — the ranges to expect, and the signs that outweigh the calendar."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Expected service ranges"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Architectural shingles typically serve 15 to 30 years in our climate, with exposure, ventilation and storm history moving a given roof within that range. Older basic shingles sit at the lower end. A metal roof is in a different class: 50+ years of expected service, with a 40-year paint warranty on most colours, and its mid-life needs are about fasteners, sealants and flashing rather than the panels themselves."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Condition beats birthday"
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "A well-vented, shaded shingle roof can outlive a sun-baked one by years"
            }
          ],
          [
            {
              "text": "Widespread curling and granule loss mean done — whatever the age"
            }
          ],
          [
            {
              "text": "One leak at a flashing detail does not condemn a young roof"
            }
          ],
          [
            {
              "text": "Attic evidence — stains, damp decking — tells the real story"
            }
          ],
          [
            {
              "text": "Layer count matters: a second layer ages faster and hides the deck"
            }
          ]
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "If you do not know your roof's age, clues exist: the home's build date, past sale documents, and the shingle style itself. Neighbours in same-age subdivisions re-roofing around you is a strong hint yours is due for an inspection."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "The practical rule: once a shingle roof passes the middle of its expected range, inspect it yearly from the ground and attic, and budget for replacement rather than being surprised by it. For metal, plan periodic fastener and sealant checks as the decades pass. A free inspection gives you a condition grade, not a sales pitch — book it through the "
          },
          {
            "text": "quote form",
            "href": "#quote",
            "external": false
          },
          {
            "text": "."
          }
        ]
      }
    ],
    "faq": [
      [
        "How long do shingles last in New Brunswick?",
        "Architectural shingles typically serve 15 to 30 years here depending on exposure, ventilation and storm history. Condition signs — curling, granule loss, repeated leaks — matter more than the exact age."
      ],
      [
        "How long does a metal roof last in NB?",
        "50+ years is the expected service life, with a 40-year paint warranty on most colours. Mid-life care is about fasteners, sealants and flashing, not the panels."
      ],
      [
        "I don't know how old my roof is. What now?",
        "Check home purchase documents and build dates, look at the condition signs in this guide, and book a free inspection — an experienced roofer can estimate age and grade condition in one visit."
      ]
    ]
  },
  {
    "id": "grand-bay-sussex-st-martins",
    "title": "Roofing in Grand Bay-Westfield, Sussex & St. Martins: One Crew, All of Southern NB",
    "cat": "Towns",
    "town": "St. Martins",
    "date": "2025-09-20",
    "read": 6,
    "excerpt": "Roofing in Grand Bay-Westfield, Sussex and St. Martins NB: coastal wind, valley snow and village roofs — one local crew for metal, shingles, repairs and emergencies across Southern NB.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Southern New Brunswick is not one roofing climate — it is several, an hour apart. Grand Bay-Westfield takes river and bay wind. Sussex sits in a valley that collects snow and fog. St. Martins faces the Bay of Fundy directly, with salt air and serious weather off the water. Paul's Roofing serves all three from Quispamsis, and the differences shape the work."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Grand Bay-Westfield"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Exposed slopes and driven rain are the story here. Lifted shingle tabs and wind-pried flashing top the repair list, and secure fastening patterns matter. Metal roofs are popular for their wind resistance and clean shedding — with snow rails placed over entrances, as in every NB metal install."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Sussex"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Sussex roofs carry snow. Valley weather means accumulation, ice at the eaves, and farm and rural properties where roof size and outbuildings matter. Ice-and-water protection, ventilation and honest deck inspections drive our Sussex recommendations, whether the job is a farmhouse metal roof or shingles on a village home."
          }
        ]
      },
      {
        "type": "h4",
        "text": "St. Martins"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Coastal St. Martins tests coatings and fasteners with salt air and tests everything with Fundy weather. Material quality and prompt attention to scratches, cut edges and sealant joints keep a coastal roof on its full lifespan. Emergency calls after coastal storms are part of the job — 24/7, across the whole service area."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "All three towns: free inspections and itemized quotes"
            }
          ],
          [
            {
              "text": "All three towns: metal, shingles, repairs, gutters and exterior maintenance"
            }
          ],
          [
            {
              "text": "All three towns: 24/7 emergency service for active leaks and storm damage"
            }
          ]
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "One crew, one standard, from the Kingston Peninsula to St. Martins. Book through the "
          },
          {
            "text": "quote form",
            "href": "#quote",
            "external": false
          },
          {
            "text": ", by "
          },
          {
            "text": "phone",
            "href": "tel:+15062714162",
            "external": false
          },
          {
            "text": " or by email — and read the town guides for Hampton and Quispamsis–Rothesay in this blog for the same straight treatment of your area."
          }
        ]
      }
    ],
    "faq": [
      [
        "Do you serve Grand Bay-Westfield, Sussex and St. Martins?",
        "Yes. All three are in Paul's Roofing's regular service area, along with Quispamsis, Rothesay, Saint John, Hampton and the Kingston Peninsula."
      ],
      [
        "Is roofing different near the coast in St. Martins?",
        "Salt air and severe Fundy weather put extra importance on coating quality, correct fasteners and prompt touch-up of any damage. The roofing system is the same — the detailing discipline is higher."
      ],
      [
        "Can I get an emergency roofer in Sussex or St. Martins?",
        "Yes — 24/7 emergency service covers the whole service area for active leaks and storm damage. Call and describe the problem; you will be told what happens next."
      ]
    ]
  },
  {
    "id": "snow-rails-metal-roof",
    "title": "Snow Rails on a Metal Roof: Do You Need Them in New Brunswick?",
    "cat": "Metal Roofing",
    "town": "Quispamsis",
    "date": "2026-01-11",
    "read": 6,
    "excerpt": "Snow rails on metal roofs in New Brunswick: why metal sheds snow in one slide, where rails belong — doors, decks, walkways — and when a Quispamsis home needs them.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "The first winter with a new metal roof in Quispamsis teaches one lesson fast: metal sheds snow. Instead of melting gradually like it does on shingles, a snow load on metal can release and slide off in one sheet. That shedding is good for the roof — and a problem over a doorway. Snow rails are the fix, and they belong in the quote conversation, not after the first slide."
          }
        ]
      },
      {
        "type": "h4",
        "text": "What snow rails do"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Snow rails are bars mounted across the lower roof, above the eave. They hold the snowpack back so it melts and drains in place instead of sliding off all at once. The roof still sheds water freely; it just stops shedding the whole winter's snow onto your step, your deck, your heat pump, or whoever is walking to the car."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Over every entrance and garage door people walk under"
            }
          ],
          [
            {
              "text": "Over decks, patios and walkways"
            }
          ],
          [
            {
              "text": "Over heat pumps, propane tanks and lower roofs"
            }
          ],
          [
            {
              "text": "On steep pitches and long, smooth slopes where slides build speed"
            }
          ],
          [
            {
              "text": "Where the eave line hangs over a neighbour's path or driveway"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "Part of the system, not an add-on"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Rails need to be matched to the panel profile and fastened as part of the metal system — placement and spacing follow the roof's pitch and snow exposure, and retrofitting them later means working on a finished roof. Paul raises snow retention on every metal quote in Southern NB, walks the eave lines with you, and marks where rails go before panels are ordered. If a metal quote you are holding says nothing about snow over your front door, ask why."
          }
        ]
      }
    ],
    "faq": [
      [
        "Does every metal roof need snow rails?",
        "Not every slope — but any slope that sheds over a door, deck, walkway or equipment should have them. Paul assesses each eave line at the free estimate and includes the recommendation in the quote."
      ],
      [
        "Can snow rails be added to an existing metal roof?",
        "Yes, in most cases they can be retrofitted, matched to your panel profile. It is simpler and cleaner to include them in the original installation, which is why we plan them before panels are ordered."
      ],
      [
        "Do snow rails damage the roof or hold ice dams?",
        "Properly fitted rails are part of the metal system and do not damage panels. They hold snow to melt gradually; ice dams are an attic heat-loss problem, addressed separately with air sealing, insulation and ventilation."
      ]
    ]
  },
  {
    "id": "ice-and-water-shield",
    "title": "Ice & Water Shield: The Layer Under Your Roof That Saves NB Homes Every Winter",
    "cat": "Ice Dams & Winter",
    "town": "Rothesay",
    "date": "2026-02-01",
    "read": 6,
    "excerpt": "Ice and water shield explained for Rothesay and NB homeowners: what the self-sealing membrane does at eaves and valleys, where it belongs, and why skipping it is false economy.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "You will never see the most important winter layer on your roof. Ice-and-water shield is a self-adhesive membrane installed under shingles or metal at the vulnerable edges — and in Rothesay and across Southern New Brunswick, it is the difference between an ice dam being a nuisance and an ice dam being a ceiling replacement."
          }
        ]
      },
      {
        "type": "h4",
        "text": "How it works"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Standard underlayment sheds water that flows downhill. Ice-and-water shield does more: it bonds to the deck and seals around every nail driven through it. When meltwater backs up behind an ice dam and sits against the roof instead of flowing, this membrane is what stops that standing water from reaching the deck and the house below."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Where it belongs"
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Along every eave, up the roof past the inside wall line"
            }
          ],
          [
            {
              "text": "In valleys, where two slopes pour water into one channel"
            }
          ],
          [
            {
              "text": "Around chimneys, skylights and other penetrations"
            }
          ],
          [
            {
              "text": "At wall junctions and low-slope transitions"
            }
          ],
          [
            {
              "text": "Under metal roofing at eaves as part of the full system"
            }
          ]
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "It is also why comparing quotes line by line matters. A cheaper quote sometimes quietly shrinks the ice-and-water coverage to a token strip — or leaves it out. On a Paul's Roofing quote it is a named line, placed where NB winters demand it, under both our IKO and BP shingle systems and our metal installations. You cannot add it later without taking the roof apart, which is exactly why it has to be right on installation day. Read our "
          },
          {
            "text": "ice dam guide",
            "href": "#handbook",
            "external": false
          },
          {
            "text": " for the attic half of the same story."
          }
        ]
      }
    ],
    "faq": [
      [
        "Is ice and water shield required in New Brunswick?",
        "Building practice in our climate treats eave membrane protection as essential, and any roofer working in NB winters should include it. More importantly than the rule: without it, the first serious ice dam has a direct path into your home."
      ],
      [
        "How far up the roof should it go?",
        "At minimum from the eave edge to past the interior wall line, so the membrane covers the zone where dams form and water backs up. Steeper overhangs and known dam-prone homes may warrant more — Paul specs it per roof."
      ],
      [
        "Can ice and water shield be added to my existing roof?",
        "Only by removing the roofing over the area to be protected. It is an installation-day layer, which is why confirming it in your quote — in writing — matters before work starts."
      ]
    ]
  },
  {
    "id": "drip-edge-fascia-soffit",
    "title": "Drip Edge, Fascia & Soffit: The Roof Edge Nobody Looks At (Until It Rots)",
    "cat": "Gutters & Exterior",
    "town": "Saint John",
    "date": "2025-10-12",
    "read": 5,
    "excerpt": "Drip edge, fascia and soffit in Saint John NB: what each piece at your roof edge does, how rot starts, and the signs your eave line needs attention before the roof does.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Stand in a Saint John driveway and look at where the roof ends. That edge — drip edge, fascia, soffit and gutter working together — decides whether water leaves your roof cleanly or soaks into the wood your roof and gutters hang from. It is the least glamorous part of the system and one of the most common repair calls we get."
          }
        ]
      },
      {
        "type": "h4",
        "text": "The three pieces"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Drip edge is the metal flashing at the roof's edge that kicks water off the deck and into the gutter instead of letting it curl back under the shingles. Fascia is the vertical board the gutter mounts to — it takes weather all year and rots from the gutter side first. Soffit is the underside panel closing the overhang; vented soffit is also where attic air is supposed to enter, so painted-shut or blocked soffit quietly strangles ventilation."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Peeling paint or soft spots on fascia — rot starting"
            }
          ],
          [
            {
              "text": "Gutters pulling away — often the fascia behind them has failed"
            }
          ],
          [
            {
              "text": "Water staining on soffits after storms or ice dams"
            }
          ],
          [
            {
              "text": "Missing or bent drip edge letting water behind the gutter"
            }
          ],
          [
            {
              "text": "Birds or insects nesting in open soffit gaps"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "Fix the edge as a system"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Replacing a rotted fascia board without checking the drip edge and gutter slope just moves the problem. Our "
          },
          {
            "text": "exterior maintenance service",
            "href": "#services",
            "external": false
          },
          {
            "text": " covers fascia and soffit maintenance, gutter cleaning and repair, and flashing work together, and on a re-roof the eave edge is renewed as part of the job — new drip edge is standard, not an upsell. If your gutters sag, your fascia is soft, or water marks keep appearing under the eaves, that edge is asking for attention while it is still a board-and-flashing job instead of a framing job."
          }
        ]
      }
    ],
    "faq": [
      [
        "What is drip edge and does my roof have it?",
        "Drip edge is metal flashing at the eave and rake edges that directs water into the gutter and protects the deck edge. Most properly installed modern roofs have it; older roofs sometimes do not, and adding it is part of a proper re-roof."
      ],
      [
        "Why is my fascia rotting?",
        "Usually water: overflowing or leaking gutters, missing drip edge, or ice dam backup soaking the eave. The board rots from repeated wetting — fix the water path and the board together, or the new board rots the same way."
      ],
      [
        "Can soffit problems affect my attic?",
        "Yes. Vented soffit is the intake for attic ventilation. Blocked, painted-shut or damaged soffit reduces airflow, which contributes to ice dams, moisture build-up and shorter shingle life."
      ]
    ]
  },
  {
    "id": "skylight-vent-leaks",
    "title": "Skylight & Vent Leaks: The Small Openings That Cause Big Stains",
    "cat": "Repairs & Leaks",
    "town": "Hampton",
    "date": "2025-11-02",
    "read": 5,
    "excerpt": "Skylight and vent leaks in Hampton NB: cracked vent boots, tired skylight seals and the flashing details behind most 'mystery' ceiling stains — and the right fix for each.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Some of the most frustrating leaks in Hampton homes come from the smallest parts of the roof. A plumbing vent boot costs little, takes an hour to fail after years of sun, and can stain a bathroom ceiling for a season before anyone connects the two. Skylights and roof vents follow the same pattern: small openings, big stains."
          }
        ]
      },
      {
        "type": "h4",
        "text": "The usual suspects"
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Vent boots: the rubber collar around plumbing vents cracks with age and sun"
            }
          ],
          [
            {
              "text": "Skylight seals and flashing: seals tire, and flashing kits get reused past their life"
            }
          ],
          [
            {
              "text": "Exhaust vents: caps lift, fasteners back out, sealant lets go in freeze-thaw"
            }
          ],
          [
            {
              "text": "Sealant-only repairs: caulk smeared over a failed part, cracking again within a season"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "Why the stain misleads you"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Water entering at a vent rarely drips straight down. It runs along the deck or a rafter and appears a room away, which is why homeowners replace the wrong thing first. Diagnosis means checking the roof above the stain, not just the ceiling below it — the entry point is uphill of the evidence. In the attic, a flashlight finds the water trail on the decking leading back to the penetration."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "The good news: these are among the most fixable leaks in roofing. A cracked boot is a part replacement, done properly with the shingle courses around it lifted and re-set — not a tube of caulk. Skylight leaks get an honest verdict: reseal and reflash where the unit is sound, replace where the unit itself has failed. Vent and skylight repair is part of our "
          },
          {
            "text": "Chimneys & More service",
            "href": "#services",
            "external": false
          },
          {
            "text": ", and it is one of the first things checked on a free leak inspection."
          }
        ]
      }
    ],
    "faq": [
      [
        "Why does the stain appear in a different room than the leak?",
        "Water runs along decking, rafters and vapour barrier before dropping. The stain marks where water fell, not where it entered — the entry point is usually uphill on the roof, often at a vent, skylight or flashing detail."
      ],
      [
        "Can I seal a leaking vent boot with caulk?",
        "Caulk over a cracked boot is a short reprieve at best — the rubber keeps splitting. Replacing the boot properly, integrated with the shingles around it, is the lasting fix and still a small job."
      ],
      [
        "Should a leaking skylight be repaired or replaced?",
        "It depends on whether the leak is at the flashing and seals — repairable — or the skylight unit itself has failed. Paul will show you which one you have before recommending either."
      ]
    ]
  },
  {
    "id": "what-paul-checks-inspection",
    "title": "What Paul Actually Checks on a Free Roof Inspection",
    "cat": "Maintenance",
    "town": "Quispamsis",
    "date": "2025-09-21",
    "read": 6,
    "excerpt": "What a free roof inspection in Quispamsis actually covers: shingles or panels, flashing, valleys, gutters, eaves and the attic — and the straight report you get at the end.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "A free inspection is only worth having if it actually inspects something. Here is the full list Paul works through on a roof in Quispamsis, Rothesay, Saint John or anywhere in our service area — so you know what a real one looks like, whoever does it."
          }
        ]
      },
      {
        "type": "h4",
        "text": "On the roof and from the ground"
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Shingle condition: curling, cracking, granule loss, missing tabs — or panel, seam and trim condition on metal"
            }
          ],
          [
            {
              "text": "Flashing at chimneys, walls, valleys and vents — the number one leak source"
            }
          ],
          [
            {
              "text": "Vent boots, skylights and exhaust caps for cracks and failed sealant"
            }
          ],
          [
            {
              "text": "Ridge caps and vents for damage and blockages"
            }
          ],
          [
            {
              "text": "Valleys and low areas where debris dams water"
            }
          ],
          [
            {
              "text": "Eaves: drip edge, fascia and soffit condition"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "Gutters and attic"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Gutters get checked for slope, loose runs, leaking joints and granule build-up — granules in the gutter are your shingles' wear, measured. Then the attic, where the roof tells the truth: water stains on decking, damp insulation, daylight at penetrations, blocked soffit vents, and bathroom fans venting where they should not. Attic evidence is what separates a roof with years left from a roof that only looks fine from the street."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "At the end you get a straight report in plain language: what is fine, what needs a small fix now, and what to plan for — with an itemized quote if work is warranted. Sometimes that answer is \"your roof is fine, check again in a couple of years.\" Book through the "
          },
          {
            "text": "quote form",
            "href": "#quote",
            "external": false
          },
          {
            "text": ", by phone or by email, Mon to Fri 6:00 a.m. to 7:00 p.m."
          }
        ]
      }
    ],
    "faq": [
      [
        "Is the roof inspection really free?",
        "Yes. Inspections and detailed, itemized quotes are free across our service area. You get a plain-language report of what was found whether or not any work follows."
      ],
      [
        "Do you need to go on the roof for an inspection?",
        "A thorough inspection combines ground observation, roof-level checks where safe and appropriate, gutter checks and an attic look. Steep, icy or fragile roofs are assessed with safety first — and that is explained to you on the day."
      ],
      [
        "What do I get after the inspection?",
        "A straight summary: condition of the roofing, flashing, gutters and attic signs, what needs attention now versus later, and an itemized quote for anything recommended. No pressure to decide on the spot."
      ]
    ]
  },
  {
    "id": "metal-roof-maintenance",
    "title": "Metal Roof Maintenance: The Short List That Gets You to 50 Years",
    "cat": "Metal Roofing",
    "town": "Sussex",
    "date": "2025-08-24",
    "read": 6,
    "excerpt": "Metal roof maintenance in Sussex NB: the short, honest list — fasteners, sealants, valleys, scratches and debris — that carries a metal roof to its full 50+ year life.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "A metal roof is low maintenance — not no maintenance. The panels on a Sussex home are built for a 50+ year life with a 40-year paint warranty on most colours, but the small parts around them age on a shorter clock. This is the whole list, and none of it is hard."
          }
        ]
      },
      {
        "type": "h4",
        "text": "The short list"
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Keep valleys and gutters clear — debris holds water against seams and fasteners"
            }
          ],
          [
            {
              "text": "Have exposed fasteners checked as the roof ages; washers tire before panels do"
            }
          ],
          [
            {
              "text": "Check sealant joints at trims and penetrations and renew them when they crack"
            }
          ],
          [
            {
              "text": "Touch up any scratch or cut edge promptly so the coating keeps doing its job"
            }
          ],
          [
            {
              "text": "Trim branches back so nothing rubs the finish in wind"
            }
          ],
          [
            {
              "text": "After big storms, look for lifted trim or debris sitting on the roof"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "What to leave alone"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Do not pressure-wash aggressively, do not walk the roof in winter, and do not let anyone add penetrations — a satellite dish, a new vent — without proper flashing and closures. Most metal roof problems we are called to fix trace back to a later trade's shortcut, not the original install. If another trade needs to work on your metal roof, ask them how they will flash and seal their work, or call us first."
          }
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "A sensible rhythm: a ground-level look every fall, debris cleared when you see it, and a professional check every few years or after severe weather. That is genuinely all it takes to protect a 50-year investment. Paul's Roofing includes metal maintenance checks with inspections across Southern NB — see "
          },
          {
            "text": "Services",
            "href": "#services",
            "external": false
          },
          {
            "text": " for what is covered."
          }
        ]
      }
    ],
    "faq": [
      [
        "How often does a metal roof need maintenance?",
        "A yearly ground-level look, prompt debris clearing, and a professional fastener and sealant check every few years covers it. Metal is low maintenance — the list is short, but it is not empty."
      ],
      [
        "Can I walk on my metal roof to clean it?",
        "Walking a metal roof risks denting panels and slipping, especially when wet. Most maintenance is done from ladders or by a crew with proper footwear and safety gear. When in doubt, call rather than climb."
      ],
      [
        "What voids the benefit of the paint warranty?",
        "Damage left unrepaired — scratches and cut edges that corrode, and debris sitting wet on the surface. Prompt touch-up with matched product keeps the coating system intact. Keep your install paperwork with your home records."
      ]
    ]
  },
  {
    "id": "best-time-book-roof-nb",
    "title": "When Is the Best Time to Book a Roof Replacement in New Brunswick?",
    "cat": "Cost & Financing",
    "town": "Saint John",
    "date": "2026-03-15",
    "read": 5,
    "excerpt": "Best time to book a roof replacement in New Brunswick: why spring quotes beat fall scrambles in Saint John, how roofer calendars fill, and when waiting costs more than booking.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Every fall in Saint John, the same thing happens: homeowners who meant to call in spring are now racing freeze-up with a roof that cannot wait. Roofing in New Brunswick runs on a weather calendar, and booking on the right side of it is free money and free peace of mind."
          }
        ]
      },
      {
        "type": "h4",
        "text": "How the season actually runs"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "As soon as snow leaves the roofs, inspection and quote requests surge — spring is when winter damage is visible and when the full season is still ahead to schedule the work. Summer calendars fill with the replacements quoted in spring. By fall, crews are racing shorter days and homeowners are discovering that a roof flagged in October may be a repair-and-hold until spring rather than a full replacement."
          }
        ]
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "Spring: best time to inspect, quote and book — full season ahead"
            }
          ],
          [
            {
              "text": "Summer: peak installation season; booked jobs, not first calls"
            }
          ],
          [
            {
              "text": "Fall: last window for repairs and winterizing; replacement slots are scarce"
            }
          ],
          [
            {
              "text": "Winter: emergency repairs and tarping; full installs wait for weather"
            }
          ]
        ]
      },
      {
        "type": "h4",
        "text": "When waiting costs more"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "A roof that is merely old can be planned. A roof that is actively leaking should not wait for a convenient season — water damage compounds monthly, and an emergency repair now plus a booked replacement beats a soaked deck later. Financing is coming soon for exactly the case where the roof's timing and the budget's timing disagree. The practical move: get the free inspection and itemized quote as soon as you suspect the roof is near end of life, even if the work lands months later. A booked job with a date beats a September scramble, every year."
          }
        ]
      }
    ],
    "faq": [
      [
        "How far ahead should I book a roof replacement?",
        "Book the inspection and quote in spring if you can — installation calendars across Southern NB fill through summer. The earlier the quote, the more choice you have on timing and material."
      ],
      [
        "Can a roof be replaced in winter in New Brunswick?",
        "Emergency repairs happen year-round, but full replacements are scheduled in workable weather for quality and safety. A winter call usually means a sound repair now and a booked installation when conditions allow."
      ],
      [
        "What if my roof needs replacing but the budget isn't ready?",
        "Financing is coming soon — ask Paul about it during your free estimate, and ask honestly what must be done now versus what can be staged. A small protective repair can sometimes hold a roof safely until the planned replacement."
      ]
    ]
  },
  {
    "id": "granules-in-gutters",
    "title": "Granules in Your Gutters: What Your Shingles Are Telling You",
    "cat": "Shingles",
    "town": "Grand Bay-Westfield",
    "date": "2025-08-17",
    "read": 5,
    "excerpt": "Granules in the gutters in Grand Bay-Westfield: what shingle granule loss means at different roof ages, when it is normal wear and when it is the roof asking to be replaced.",
    "blocks": [
      {
        "type": "p",
        "segments": [
          {
            "text": "Cleaning gutters in Grand Bay-Westfield and finding them half full of what looks like coarse sand? Those are shingle granules — the mineral coating that protects asphalt shingles from sun and weather. Some granule loss is normal. A lot of it is your roof filing a report on itself."
          }
        ]
      },
      {
        "type": "h4",
        "text": "What granules do"
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "Granules shield the asphalt layer from ultraviolet light, give the shingle its colour, and add weight and fire resistance. As they shed, the asphalt beneath is exposed to sun, ages faster, and sheds faster again — granule loss accelerates near end of life, which is why it is one of the most reliable wear gauges a homeowner can check without climbing anything."
          }
        ]
      },
      {
        "type": "h4",
        "text": "Normal vs warning"
      },
      {
        "type": "ul",
        "items": [
          [
            {
              "text": "New roof, first seasons: light loose granules washing off is normal"
            }
          ],
          [
            {
              "text": "Mid-life roof: modest granules after heavy storms, worth noting"
            }
          ],
          [
            {
              "text": "Older roof: handfuls at every downspout, plus bald-looking patches on the shingles — end of life is near"
            }
          ],
          [
            {
              "text": "Granules plus curling edges or cracked tabs: plan the replacement conversation"
            }
          ],
          [
            {
              "text": "Granules only below one slope: that slope is aging faster — usually the sunny one"
            }
          ]
        ]
      },
      {
        "type": "p",
        "segments": [
          {
            "text": "You can read the shingles themselves from the ground with binoculars: shiny, smooth-looking patches where granules are gone entirely are called bald spots, and they confirm what the gutters suggested. Combined with the roof's age — architectural shingles serve 15 to 30 years here — the verdict is usually clear. Paul checks granule loss on every free inspection and will show you the downspout evidence on your own house. If the roof still has life, you will hear that too. See "
          },
          {
            "text": "architectural shingles under Services",
            "href": "#services",
            "external": false
          },
          {
            "text": " for what goes on next when it is time."
          }
        ]
      }
    ],
    "faq": [
      [
        "Is it normal to find granules in my gutters?",
        "A small amount, especially on a newer roof or after a major storm, is normal. Heavy, repeated accumulation on an aging roof signals the shingles are wearing out and losing their protective surface."
      ],
      [
        "Can lost granules be replaced?",
        "No. Granule loss is wear, not a repairable coating. Once loss is widespread and shingles show bald patches, the roof is in its final stage and replacement planning should start."
      ],
      [
        "How do I check granule loss without climbing?",
        "Look in gutters at ground level and at downspout outlets after rain, and scan the shingles with binoculars for bald, shiny patches. Both checks are part of Paul's free inspection if you'd rather have it done for you."
      ]
    ]
  }
];
