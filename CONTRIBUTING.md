# Contributing

Thanks for your interest. steadybot is being built stage by stage (see the roadmap in [README.md](README.md)), so the foundations change quickly right now.

- **Issues and ideas are welcome at any time.** Bug reports are most useful with steps to reproduce them.
- **Open an issue before a large pull request**, so we can agree on the approach first.
- **Security problems** go through the private channel in [SECURITY.md](SECURITY.md), not public issues.

## Making a change

1. Read [AGENTS.md](AGENTS.md). Its rules apply to human contributors too.
2. Run `pnpm lint`, `pnpm check` and `pnpm test`. All three must pass.
3. In the pull request description, answer the three questions from AGENTS.md: how an eval observes the change, whether its dependencies can be faked, and whether its failures can be classified automatically.

By contributing, you agree that your contributions are licensed under the [Apache-2.0 license](LICENSE).
