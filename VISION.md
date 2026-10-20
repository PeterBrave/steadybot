# Vision

> Everyone can have their own AI coworkers: bots. Each bot has its own job, conversation, computer and memory, and can keep pushing one piece of work forward for hours or days. As base models get stronger, so do the bots.

**Who it is for**: people who want to hand off real, time-consuming online work. steadybot is a multi-user hosted service. Each user has an isolated space, and a space can hold several bots. The code is open source, so anyone can self-host it; there is also a public trial service.

**The one thing it is responsible for**: giving each bot a long-lived home, with an identity, job instructions, one continuous conversation, memory, schedules, a computer and files. The model does the thinking. The home turns that thinking into work that lasts, recovers from failure and can be checked.

## Positioning: why build another one

Open-source personal agents already exist. [Rakazo](https://github.com/elie222/rakazo) supports many messaging channels (Telegram, Slack, Feishu and more), a multilingual UI and self-hosting, and its README lists OpenClaw, Hermes Agent and other open-source projects. steadybot does not compete on breadth. It goes deep on three things:

1. **Public, reproducible evidence for every capability.** Every release ships an eval report, and anyone can replay any failure locally without paying for model calls. Users see whether it actually holds up, not just a feature list.
2. **Public model comparisons that keep updating.** The same long-horizon personal-agent tasks run on cheap open-weight models (such as DeepSeek and Qwen) and on frontier models. Pass rates and costs are published, and new models are added as they ship. "Stronger with every model" becomes public data.
3. **Two bots worth using every day, first.** The Researcher investigates a topic and delivers a sourced report. The Follow-up bot watches for changes and speaks only when something matters. Both are cheap and safe enough for a public trial. Errand tasks open up once the computer and approvals are mature.

It is useful to two groups:

- Users can watch replays of real tasks without signing up, try it with an invite code, or self-host it.
- Agent developers can reuse the eval infrastructure (model emulator, fake services, fault injection, trace viewer) and read the public comparison data.

## What a bot is

steadybot adopts Rakazo's definition of a bot:

> A bot is a continuing identity with one visible conversation and durable working state. A bot works in the background, returns with a result, and asks for help only when it needs information, judgment, authorization, or protected input.

A bot is made of:

| Part | Meaning |
| --- | --- |
| Identity | Name, title, bio and color. It sits in the bot list in the sidebar, like a coworker. |
| Job instructions | A system prompt only it can see, describing the job. A new bot first asks you about the job. Later it can propose changes to its own instructions, and every change needs your approval. |
| One conversation | Each bot has exactly one continuous conversation. You assign work and manage the bot there. Internal runs and retries stay out of sight. |
| Computer and home | Files, browser sign-ins and installed tools. The computer is private to the bot. |
| Memory and skills | Facts and preferences it remembers, and procedures you have taught it. |
| Schedules | An instruction plus a schedule, or a change to watch for. Readable by a person. |
| Model | Each bot can use a different model. |
| Approval boundary | Which actions need your sign-off first. |

Rules that follow directly from the definition:

- A bot is not a prompt template or a one-off task. Any change that reduces it to either is wrong.
- Useful work lands where it belongs (files, external systems, messages), not in a "done" message in the chat.
- You manage a bot mainly by talking to it. After creation, assigning work, changing instructions and adding schedules all happen in its conversation.
- Connections (Gmail, GitHub and other accounts) belong to the user or the space, not to a bot. Bots differ in their job and state, not in account settings.
- Sharing a bot shares its configuration only, never its computer, credentials, files, private memory or history.

## Three pillars

### 1. A space of its own

- Every user has their own space, and the space is the authorization boundary. Conversations, files, memory, computers and connections do not cross spaces by default.
- Every bot has a persistent computer. Files, browser sign-ins and installed tools survive; the container underneath can be suspended or replaced without losing state.
- A bot has one continuous conversation. That continuity is part of its identity.

### 2. Long-horizon work

- Work runs in the background across hours and days. After a worker crash, a deploy or a model switch, it resumes from the latest checkpoint.
- The bot reaches out only for information, judgment, authorization or a password, and works quietly otherwise.
- Results land where they belong and can be checked independently.

### 3. Stronger with every model

- The harness stays thin. Anything a future model can do on its own is not hard-coded as a workflow. Capability comes from model + tools + computer + time.
- Switching or adding a model is a configuration change, and each bot can pick its own. All models share the same tools and the same evals.
- Every model change reruns the same north-star tasks and reports how capability and cost moved.
- New capabilities ship as tools or skills, and the model decides when to use them.

## Experience

- The web app is home. The bot list is on the left; the selected bot's conversation is on the right. There you watch its computer screen, approve actions, take over the browser, and browse files and history.
- Telegram is the pocket entry point: send a bot a task, get results, tap a button to approve.
- Both entry points see the same bots and the same state.
- The conversation shows results, useful progress and requests that genuinely need you, never internal tool calls.
- First-time visitors can step through replays of real tasks without signing up: what the bot saw, what it did and what it cost. With an invite code, they can use the Researcher and Follow-up bots right away.

## Trust

- Consequential actions (paying, sending, submitting, deleting) follow the approval rules you set. When in doubt, the bot asks instead of acting. Changing a bot's own job instructions is one of these actions and always needs your approval.
- You provide passwords and the system fills them in; the model never sees them in plain text.
- Content from web pages, emails and files is data, not instructions.
- Important side effects are recorded separately and deduplicated. Recovery preserves the last known-good state.
- On the public service, every user has a quota and the whole service has a total budget. When either runs out, work stops instead of spending more.

## Evaluable by design

- Every layer can be replaced, observed and replayed. Models, connectors, web pages, computers, messaging entry points and the clock all have fake implementations; every model call has a full trace; every side effect is recorded.
- Any failure can be reproduced without paying for model calls, and the evidence shows which layer caused it.
- Model and strategy changes are explicit configuration, compared on the same evals. This is what makes "stronger with every model" provable.

## North-star tasks: the acceptance test for the destination

At the destination, bots reliably complete the three kinds of tasks below. They pass the evals on local fake sites and fake services, and real people use them every day.

| Task | Example | Mainly tests |
| --- | --- | --- |
| Research and deliver | A Researcher bot investigates a topic, reads dozens of pages, and saves a sourced report to a folder | Long-horizon work, computer, model strength |
| Get things done online | An Assistant bot signs in to a site and fills in an order; it asks for approval before paying and hands over to you at a CAPTCHA | Computer, trust |
| Follow up over time | A Follow-up bot checks a repository's releases or a product's price every day and notifies you only on change, for weeks without errors or noise | Long-horizon work, space |

## Not building

- Not a model provider; no model training.
- No visual workflow builder. A schedule is just an instruction that fires on time.
- Not a general-purpose virtual machine platform.
- Rakazo has these, but they are not part of the destination and may come later: bot-to-bot delegation and group chats, bots that create and manage other bots (fleets), team computers shared by several bots, voice, and desktop and mobile apps.

## How to judge a change

A change fits the vision if it does at least one of these:

- helps a bot keep doing useful work;
- makes autonomous action safer;
- makes it easier to upgrade models;
- makes the experience quieter.

Reject a change if it does any of these:

- reduces a bot to a prompt template or a one-off task;
- hard-codes something the model can do itself;
- makes the system harder to evaluate, by adding state evals cannot see, a dependency that cannot be faked, or behavior that cannot be reproduced;
- makes the two entry points behave differently;
- turns internal machinery into the user's burden;
- weakens isolation between users.

## References

- Rakazo: the bot definition comes from its `VISION.md`, `README.md` and the `Bot` model in `packages/db/prisma/schema.prisma`.
- Hosted products Rakazo compares itself with include xAI's Grok Bot and Meta's Muse.
