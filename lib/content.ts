export const content = {
  nav: {
    brand: "Gopherfy",
    links: [
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Docs", href: "/docs" },
      { label: "Setup", href: "/setup" },
    ],
    github: {
      label: "View on GitHub",
      href: "https://github.com/ravindu-ranasinghe/umn-discord-verification",
    },
    cta: { label: "Add to Discord", href: "https://discord.com/oauth2/authorize?client_id=1496215044495507688&permissions=268437504&integration_type=0&scope=bot+applications.commands" },
  },

  hero: {
    headline: ["Verify.", "Connect.", "Done."] as const,
    subtitle:
      "A Discord bot that verifies UMN students with their @umn.edu email. Trusted communities, real Gophers, in seconds.",
    primaryCta: { label: "Add to Discord", href: "https://discord.com/oauth2/authorize?client_id=1496215044495507688&permissions=268437504&integration_type=0&scope=bot+applications.commands" },
    secondaryCta: { label: "See how it works", href: "#how-it-works" },
    microcopy: "Free for every UMN server.",
    tertiary: "Email-verified · Privacy-first · Open source",
  },

  features: {
    eyebrow: "Features",
    title: "Built for real Gophers.",
    subtitle: "Everything a UMN server needs — nothing it doesn't.",
    sourceLink: {
      label: "View the source",
      href: "https://github.com/ravindu-ranasinghe/umn-discord-verification",
    },
    cards: [
      {
        title: "Email-verified with @umn.edu",
        body:
          "Only students with a valid University of Minnesota email can get the verified role. No name-matching, no honor system — just the same inbox they log into for classes.",
        tone: "maroon" as const,
        icon: "mail",
        featured: true,
      },
      {
        title: "Verified once, everywhere",
        body:
          "Members who verify in one Gopherfy server are recognized automatically in every other Gopherfy server — no second email round-trip.",
        tone: "gold" as const,
        icon: "link",
        featured: false,
      },
      {
        title: "Privacy-first & open source",
        body:
          "We store only a Discord ID and the email used to verify. Nothing else. The code is public so anyone can audit exactly what the bot does.",
        tone: "blurple" as const,
        icon: "shield",
        featured: false,
      },
    ],
  },

  howItWorks: {
    eyebrow: "How it works",
    title: "Three steps. No forms.",
    steps: [
      {
        n: "1",
        title: "Invite the bot",
        body: "Add Gopherfy to your Discord server in a single click.",
      },
      {
        n: "2",
        title: "Verify with @umn.edu",
        body: "Students get a one-time code in their university inbox — no personal info needed.",
      },
      {
        n: "3",
        title: "Unlock the Gopher role",
        body: "Enter the code and instantly join the verified side of the server.",
      },
    ],
  },

  socialProof: {
    // TODO: real avatars
    avatarCount: 8,
    caption: ["Trusted by ", "UMN students and student orgs"] as const,
  },

  footer: {
    authors: ["Eric He", "Ravindu Ranasinghe"] as const,
  },

  floatingHelper: {
    pill: { label: "Not at UMN?", href: "/not-at-umn" },
  },

  notAtUmn: {
    title: "Not at UMN?",
    subtitle:
      "Want to bring Gopherfy to your school? We'd love to hear from you.",
    body: "Gopherfy is built around UMN's @umn.edu addresses today, but the verification flow works for any university email. Reach out and we'll talk about setting it up for your campus.",
    contacts: [
      { name: "Eric He", email: "he000708@umn.edu" },
      { name: "Ravindu Ranasinghe", email: "ranas019@umn.edu" },
    ],
  },

  docs: {
    title: "Documentation",
    subtitle:
      "How Gopherfy verifies UMN students and remembers them across every server it runs in.",
    byline: "Built by Eric He and Ravindu Ranasinghe.",
    sections: [
      {
        id: "what-it-does",
        heading: "What it does",
        blocks: [
          {
            type: "p",
            text: "When someone joins a Discord server running Gopherfy, they start with no verified role and only see a verification channel. They click Start verification on the panel, enter their @umn.edu email, receive a 6-digit code by email, and submit the code back to the bot. If the code matches, the bot stores the link between their Discord account and their UMN email and grants the verified role.",
          },
          {
            type: "p",
            text: "The next time that same Discord user joins a different server running Gopherfy, the bot recognizes them from the shared database and assigns the verified role automatically — no second email round-trip.",
          },
          {
            type: "p",
            text: "Mods can run /whois @user to see which @umn.edu address a member verified with.",
          },
        ],
      },
      {
        id: "how-users-are-stored",
        heading: "How users are stored",
        blocks: [
          {
            type: "p",
            text: "Gopherfy uses a single SQLite database (verified.db) with two tables, defined in src/bot/db.js:",
          },
          {
            type: "code",
            lang: "sql",
            text: `CREATE TABLE verified_users (
  discord_id  TEXT PRIMARY KEY,
  email       TEXT UNIQUE,
  verified_at INTEGER
);

CREATE TABLE guild_config (
  guild_id           TEXT PRIMARY KEY,
  verified_role_id   TEXT NOT NULL,
  unverified_role_id TEXT NOT NULL,
  configured_at      INTEGER
);`,
          },
          {
            type: "p",
            text: "verified_users is the cross-server memory. discord_id is the primary key so each Discord account can only ever be linked to one email, and email UNIQUE ensures the reverse — one UMN identity can only verify one Discord account. Attempts to reuse an email on a second account are rejected by the bot before an OTP is even sent.",
          },
          {
            type: "p",
            text: "guild_config stores per-server settings — which role to grant after verification — set by an admin running /setup.",
          },
          {
            type: "p",
            text: "When a user joins a new server, the bot's guildMemberAdd handler looks up their Discord ID in verified_users; if present, it grants the configured verified role immediately.",
          },
          {
            type: "p",
            text: "SQLite comfortably handles this schema at the scale Gopherfy is aimed at (thousands of UMN students across many servers) on a single host.",
          },
        ],
      },
      {
        id: "how-emails-are-sent",
        heading: "How emails are sent",
        blocks: [
          {
            type: "p",
            text: "Gopherfy is split into two processes:",
          },
          {
            type: "ul",
            items: [
              "The bot (src/bot/) — talks to Discord, owns the database, and handles slash commands, buttons, and modals.",
              "The OTP service (src/otp-service/) — a small HTTP service that generates 6-digit codes, sends them via Resend, and verifies what the user submits.",
            ],
          },
          {
            type: "p",
            text: "The two communicate over HTTP. When a user enters their email, the bot POSTs to /send on the OTP service; when the user submits their code, the bot POSTs to /verify. The OTP service returns only a yes/no plus the email on success — the bot never sees the code itself.",
          },
          { type: "h3", text: "The send flow" },
          {
            type: "ol",
            items: [
              "Bot validates the address ends in @umn.edu and that the email isn't already linked to a different Discord account.",
              "Bot calls POST /send with the Discord ID and email.",
              "OTP service checks the per-user send rate limit (3 per hour).",
              "It generates a 6-digit code with crypto.randomInt.",
              "It hands the code to Resend, which delivers the email.",
              "Only if Resend accepts the send does the service store the code in memory and consume a rate-limit slot. Failed sends leave no trace — a legitimate user is never locked out because of an upstream email outage.",
            ],
          },
          { type: "h3", text: "The verify flow" },
          {
            type: "ol",
            items: [
              "Bot calls POST /verify with the Discord ID and the submitted code.",
              "OTP service looks up the pending code for that Discord ID.",
              "It compares in constant time (crypto.timingSafeEqual).",
              "Each pending OTP allows at most 5 wrong guesses — on the fifth wrong code the entry is deleted and the user has to request a new one.",
              "On success, the service returns the verified email, the bot writes (discord_id, email, now) into verified_users, and the user gets the role.",
            ],
          },
          {
            type: "p",
            text: "Codes live for 10 minutes and are held in memory (not in SQLite) — they're ephemeral by design and don't need to survive a restart of the OTP service.",
          },
        ],
      },
      {
        id: "why-two-processes",
        heading: "Why two processes",
        blocks: [
          { type: "p", text: "Splitting email out of the bot means:" },
          {
            type: "ul",
            items: [
              "The bot can be restarted (for code updates, Discord gateway reconnects, role changes) without losing in-flight verification attempts — or, the reverse, the OTP service can be restarted without dropping the bot's connection to Discord.",
              "The Resend API key only ever lives in the OTP service's environment.",
              "If Gopherfy ever needs to swap email providers, only one small service changes.",
            ],
          },
          {
            type: "p",
            text: "The two services authenticate to each other with a shared secret (OTP_SERVICE_KEY) sent as an Authorization: Bearer header and compared in constant time. Without the secret, the OTP service refuses every request — so even if the service port is reachable on the host network, nobody can request codes to arbitrary addresses or brute-force someone else's pending code.",
          },
        ],
      },
    ],
    commands: {
      heading: "Commands",
      id: "commands",
      rows: [
        {
          command: "/setup verified-role:<role>",
          who: "Server admins",
          what: "One-time per-server config",
        },
        {
          command: "/verify-panel",
          who: "Mods",
          what: "Post the button-driven verification panel",
        },
        {
          command: "/verify [email]",
          who: "Everyone",
          what: "Start verification (slash-command flow)",
        },
        {
          command: "/code <digits>",
          who: "Everyone",
          what: "Submit the 6-digit code",
        },
        {
          command: "/whois <user>",
          who: "Mods",
          what: "Look up which UMN email a member verified with",
        },
      ],
      footnote:
        "Most users go through the panel's Start verification / Submit code buttons rather than the slash commands directly.",
    },
  },

  setup: {
    title: "Setup",
    subtitle:
      "Get Gopherfy running in your Discord server in a few minutes. Screenshots below are placeholders for now.",
    inviteCta: { label: "Add to Discord", href: "https://discord.com/oauth2/authorize?client_id=1496215044495507688&permissions=268437504&integration_type=0&scope=bot+applications.commands" },
    steps: [
      {
        n: "1",
        title: "Invite Gopherfy to your server",
        body: "Use the Add to Discord button to open the OAuth invite screen, pick your server, and accept. You need Manage Server on the target server to approve the invite.",
        screenshot: "Discord OAuth invite screen",
        image: "/setup/step-1",
      },
      {
        n: "2",
        title: "Create your verified role",
        body: "Pick (or create) the role that Gopherfy should hand out after a successful verification. This is the role that unlocks the rest of your server — verified Gophers see everything, unverified members don't.",
        screenshot: "Server role settings with a \"Verified\" role",
        image: "/setup/step-2",
      },
      {
        n: "3",
        title: "Gate your channels behind the role",
        body: "Create a single #verification channel everyone can see, and restrict the rest of your channels to members who have the verified role. This is the one-time piece of server config Gopherfy can't do for you.",
        screenshot: "Channel permission overrides hiding channels from @everyone",
        image: "/setup/step-3",
      },
      {
        n: "4",
        title: "Run /setup",
        body: "As an admin, run /setup verified-role:@Verified. Gopherfy stores the role for your server so it knows what to grant after a successful verification.",
        code: "/setup verified-role:@Verified",
        screenshot: "The /setup slash command with a role picker",
        image: "/setup/step-4",
      },
      {
        n: "5",
        title: "Post the verification panel",
        body: "In your #verification channel, run /verify-panel. Gopherfy posts a message with Start verification and Submit code buttons that new members tap to verify.",
        code: "/verify-panel",
        screenshot: "The verification panel message with two buttons",
        image: "/setup/step-5",
      },
      {
        n: "6",
        title: "You're live",
        body: "New members click Start verification, enter their @umn.edu email, get a 6-digit code, and are auto-granted the verified role. Anyone who already verified in another Gopherfy server is verified instantly when they join yours — no second email needed.",
        screenshot: "A new member seeing the verified role applied",
        image: "/setup/step-6",
      },
    ],
    troubleshooting: {
      heading: "Common issues",
      items: [
        {
          title: "The bot can't assign the role",
          body: "Discord only lets a bot manage roles below its own in the role list. Drag Gopherfy's own role above your verified role in Server Settings → Roles.",
        },
        {
          title: "Members can see channels before verifying",
          body: "Channel permissions, not Gopherfy, control that. Make sure @everyone is denied View Channel on everything except your #verification channel, and the verified role is allowed.",
        },
        {
          title: "Verification emails aren't arriving",
          body: "Ask the student to check their UMN spam/quarantine folder. Codes are valid for 10 minutes; after that they need to click Start verification again.",
        },
      ],
    },
  },
};
