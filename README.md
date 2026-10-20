# steadybot

Long-lived AI coworkers with their own computer: an open-source personal agent where every capability is backed by public, reproducible evals.

> **Status: early development, stage S0.** Nothing is usable yet. See the [roadmap](#roadmap).

[中文说明](README.zh-CN.md)

## What it is

Each user gets an isolated space with one or more **bots**. A bot is a continuing identity with one visible conversation and durable working state: private job instructions, memory, skills, schedules, its own model and its own computer. It works in the background, comes back with results, and interrupts you only for information, judgment, authorization or a password.

Read [VISION.md](VISION.md) for the full picture.

## Why another personal agent?

Open-source personal agents already exist. [Rakazo](https://github.com/elie222/rakazo), OpenClaw, Hermes Agent and others cover many channels, languages and self-hosting setups. steadybot does not compete on breadth. It goes deep on three things:

1. **Evidence for every capability.** Every release ships an eval report, and any failure can be replayed locally without paying for model calls.
2. **Public model comparisons that keep updating.** The same long-horizon tasks run on cheap open-weight models and on frontier models, with pass rates and costs published.
3. **Two bots worth using every day, first:** a Researcher that delivers sourced reports, and a Follow-up bot that watches for changes and speaks only when something matters.

## Roadmap

| Stage | Goal |
| --- | --- |
| **S0** (now) | Direction and measuring stick: vision, eval framework, fake sites and services |
| S1 | Walking skeleton: chat with a bot on the web, a worker runs it on [Pi](https://github.com/earendil-works/pi), every step visible in a trace viewer |
| S2 | Long-running work: resumable runs, memory, schedules, Telegram |
| R1 | First public trial (invite only): Researcher and Follow-up bots, public replays, first model report |
| S3 | A computer of its own: sandboxed browser, takeover, secret filling |
| S4 | Acting safely: connectors, approvals, deduplicated side effects, injection defenses |
| R2 | Computer trial for invited users |
| S5 | Stronger with every model: model comparisons, context strategies, runtime comparison |
| S6 | General availability: open signup, bring your own key, self-hosting docs |

## Development

You need Node 24 and pnpm, which Corepack provides.

```bash
corepack enable pnpm
pnpm install
pnpm lint    # Biome
pnpm check   # TypeScript
pnpm test    # Vitest
```

[AGENTS.md](AGENTS.md) has the rules for working in this repository, for both people and AI coding agents. Design decisions are recorded in [docs/decisions](docs/decisions/).

## Acknowledgments

- [Rakazo](https://github.com/elie222/rakazo) (Apache-2.0): the bot definition and much of the architecture are adapted from it. Files adapted from Rakazo say so in their header.
- [Pi](https://github.com/earendil-works/pi) (MIT): the agent loop.

## License

[Apache-2.0](LICENSE)
