export const hero = {
  title: "hello, world. i’m harshith mente.",
  tagline: "vizag-born · bengaluru-based · forza ferrari",
};

export const intro = [
  "let’s skip the standard resume intro for a second. before we get to the code — who am i, really?",
  "i’m a vizag kid who grew up by the bay and now writes code in bengaluru. i believe in keeping life gloriously simple and never, ever saying no to a new experience. my days come soundtracked by coldplay, ed sheeran, or taylor swift on loop. right now it’s the ukulele in my hands — but the master plan is the guitar, so i can host my own living-room concerts and tiny, badly-lit acoustic sessions. i shoot photos of the quiet moments that actually matter, and when i’m not chasing light, i’m in the kitchen turning random ingredients into something genuinely worth eating.",
  "here’s the thing that actually drives me: i crave perfection. i’ll do everything in my power to get there — and to keep myself genuinely satisfied with what i make. i’m not chasing metrics or numbers ticking up on some dashboard. i’m chasing that quiet inner satisfaction of knowing a thing was done right, and that i left nothing on the table.",
  "but here’s the other side of the coin. i’m intensely passionate about a hundred things — yet at my absolute core, i just love to code. getting to spend my days deep in software architecture, untangling complex logic puzzles, and paying the bills with my favourite thing on earth? that’s a privilege i never take for granted.",
  "here’s the real, extended story of what i build, how i work, and what makes me tick.",
];

export const introWhisper = "♫ lights will guide you home — coldplay";

export type Entry = { title: string; meta?: string; body: string };

export type Section = {
  id: string;
  label: string;
  tag?: string;
  lead?: string;
  entries: Entry[];
  whisper?: string;
};

export const sections: Section[] = [
  {
    id: "footprint",
    label: "the professional footprint",
    tag: "where the bills get paid (happily)",
    lead: "i design and write code that has to be fast, clean, and stubbornly resilient. my toolkit revolves around typescript, c++, and python — but i’m happily language-agnostic when there’s a real problem to solve. i care, maybe a little too much, about clean architecture, killing system friction, and automating away the boring human overhead.",
    entries: [
      {
        title: "flagright",
        meta: "software engineer",
        body: "currently building core compliance and financial-crime infrastructure at a yc-backed fintech startup. most of my work lives in an agentic investigation framework — systems that automatically pick up incoming risk alerts, reason over the signals behind each one, and take the obvious decision so a human doesn’t have to. i designed it to act only on the clear-cut, low-risk, high-confidence cases, with the safety rails to match: every agent can be dry-run in shadow mode and simulated against past alerts before it’s ever allowed to touch a live one. the payoff is leaner investigation workflows and far fewer repetitive manual reviews — without anyone giving up control over the calls that actually carry risk. alongside that i’ve worked across the rule-building and investigation-copilot surfaces that make all of this usable day to day.",
      },
      {
        title: "goldman sachs",
        meta: "summer software engineering intern",
        body: "an intensive summer buried in enterprise-grade backend development. i built and refined robust data-validation engines inside their financial data ecosystems — my core project being complex backend tax-data validation pipelines. a domain that demands absolute precision, rigorous parsing, and exactly zero tolerance for error. a masterclass in wrestling data integrity at serious scale.",
      },
      {
        title: "open source",
        body: "for me, open source isn’t a checkbox — it’s an engineering philosophy. i dive into public repos, read through enormous codebases for fun, and push fixes back to the community. it’s the single best way i know to sharpen code-review instincts, absorb wildly different architectural patterns, and give a little back to the tools every developer quietly leans on.",
      },
    ],
    whisper: "cool. cool cool cool cool cool. no doubt, no doubt. — b99",
  },
  {
    id: "crucible",
    label: "the academic & competitive crucible",
    tag: "five years of beautiful suffering",
    entries: [
      {
        title: "iiitm gwalior",
        meta: "integrated m.tech, information technology",
        body: "five years deep in computer-science fundamentals, algorithm design, and machine-learning architectures. the place that taught me how to think before i type.",
      },
      {
        title: "the master’s thesis",
        body: "an extensive r&d project on english-to-telugu neural machine translation. months of implementing distillation frameworks and experimenting with dynamic teacher distributions to squeeze out translation accuracy. a brutal exercise in data cleaning and model tuning — peaking the week i spent hunting an elusive corpus anomaly where the exact frequency count of the word “the” was, all on its own, quietly skewing my entire evaluation metric. data cleaning is the job; the modelling is the reward you earn afterward.",
      },
      {
        title: "the hackathon circuit",
        body: "i live for the rush of building under pressure. out of thousands of teams nationwide, i punched through the brackets to the national semi-finals of the flipkart grid 7.0 engineering challenge, and landed in the top 50 of the tata elxsi teliport innovation challenge — throwing untested ideas at some of the sharpest young minds in the country and watching what survived.",
      },
    ],
    whisper: "♫ long live the walls we crashed through — taylor swift",
  },
  {
    id: "war-stories",
    label: "engineering nuances & war stories",
    tag: "me vs. the machine",
    lead: "the best way to learn is to break your own environment and claw your way back out of the dark. i’m the kind of engineer who takes ownership of the whole development ecosystem — not just the code inside the file.",
    entries: [
      {
        title: "the logic battles",
        body: "i don’t quit on a bug. i’m the guy who’ll burn hours on failing test cases for a grid-based pathfinding problem, mapping vectors by hand until it clicks that a naive fixed-diagonal approach will never cut it — then pivot to a comprehensive, multi-state dynamic-programming solution and grind it to 100% edge-case coverage. perfection isn’t optional; it’s the whole point.",
      },
      {
        title: "the environment grind",
        body: "i like my machine working as hard as i do — right down to tweaking system power-management profiles so background tasks and long compilations keep humming instead of the laptop nodding off mid-build.",
      },
      {
        title: "the version-control anomalies",
        body: "i’ve made peace with environment friction. like the time a local repo stubbornly clung to corrupted, outdated ssh routes and flat-out refused to talk to upstream. instead of working around it, i tore down the local config, forced a clean switch to https via the github cli (gh auth login), and stabilised the whole dev loop.",
      },
    ],
    whisper: "noice. smort. — every bug, the moment it finally dies",
  },
  {
    id: "off-keyboard",
    label: "life off the keyboard",
    tag: "macbook closed, heart open",
    lead: "when the macbook closes, the intensity just changes shape into the things that keep me grounded and a little bit electric.",
    entries: [
      {
        title: "saltwater & sandcastles",
        body: "i’m a coast kid at heart — vizag raised me by the sea, and it never really left. drop me near a beach and i’m gone: chasing the waves, watching the light fall, and yes, still building sandcastles like the tide isn’t coming. the ocean is where the noise quiets down, where i reset, and where everything suddenly feels possible again.",
      },
      {
        title: "the sports fanatic",
        body: "weekends are holy, reserved strictly for the emotional rollercoaster of high-stakes sport. i’m a fierce, unyielding believer in formula 1 (forza ferrari!), fc barcelona, and rcb. whether i’m breaking down tire-degradation strategy on a race weekend or arguing tactical formations till midnight — i am all the way in.",
      },
      {
        title: "quantitative market analysis",
        body: "to keep the analytical brain ticking when i’m not writing code, i run technical and quantitative analysis on equities — tracking and dissecting moves across portfolios with names like sbi, swiggy, and waaree energies. data science, pointed straight at the real world.",
      },
      {
        title: "the bengaluru lifestyle",
        body: "i thrive on the mix of fast paces and good flavour. catch me at the local track burning rubber through a go-karting session, or cooking up a storm and hunting down the city’s best-kept culinary secrets. my fuel of choice? a legendary chicken dum biryani, crispy hot wings, or a flawless, gold-standard ghee podi masala dosa.",
      },
    ],
    whisper: "forza ferrari · visca el barça · ee sala cup namde 🏆",
  },
];

export const outro = {
  label: "let’s build something real",
  tag: "bingpot.",
  body: "whether you want to talk systems architecture, machine-learning models, open-source initiatives — or just throw down in a heated debate about track strategy and football tactics over coffee — let’s connect. my dms are open and i’m genuinely easy to reach.",
  links: [
    { label: "github", value: "@joeyyy09", href: "https://github.com/joeyyy09" },
    {
      label: "linkedin",
      value: "harshith mente",
      href: "https://www.linkedin.com/in/harshith-mente",
    },
  ],
  whisper: "nine-nine! ♫ we found love right where we are — ed sheeran",
};
