# steadybot

长期在线、有自己电脑的 AI 同事：一个开源的 personal agent，每项能力都有公开、可复现的评测作证据。

> **状态：开发早期，处在 S0 阶段。** 现在还不能用，进度见[路线图](#路线图)。

[English](README.md)

## 这是什么

每个用户有一个隔离的空间，空间里可以有一个或多个 **bot**。bot 是一个持续存在的身份，有一条看得见的对话和一份长期保存的工作状态：只有它自己看得到的工作说明、记忆、技能、定时任务、它自己的模型和它自己的电脑。它在后台干活，带着结果回来；只有需要信息、判断、授权或密码时才来找你。

完整的愿景见 [VISION.md](VISION.md)（英文）。

## 为什么还要再做一个

开源的个人 agent 已经不少。[Rakazo](https://github.com/elie222/rakazo)、OpenClaw、Hermes Agent 等项目已经覆盖了多种消息入口、多语言和自托管。steadybot 不和它们比功能多全，只在三件事上做深：

1. **每项能力都有证据**：每次发布都附评测报告，任何一次失败都能在本地重放，不用花模型调用的钱。
2. **公开的模型对比，持续更新**：同一套长程任务，在便宜的开源权重模型和前沿模型上分别跑，公布通过率和成本。
3. **先把两个 bot 做到每天离不开**：研究员负责交付带来源的报告；跟进负责盯住变化，有事才说。

## 路线图

| 阶段 | 目标 |
| --- | --- |
| **S0**（当前） | 定方向和量尺：愿景、评测框架、假网站和假服务 |
| S1 | 走通骨架：在 Web 上和 bot 对话，worker 用 [Pi](https://github.com/earendil-works/pi) 运行它，每一步都能在 trace 查看页里看到 |
| S2 | 能干长程任务：可恢复的 run、记忆、定时任务、Telegram |
| R1 | 第一次公开体验（邀请制）：研究员和跟进两个 bot、公开回放、第一份模型对比 |
| S3 | 有自己的电脑：沙盒浏览器、人工接管、代填密码 |
| S4 | 安全地办事：连接器、审批、副作用去重、抵抗提示注入 |
| R2 | 受邀用户可以体验电脑 |
| S5 | 随模型变强：模型对比、上下文策略、runtime 对照 |
| S6 | 正式开放：开放注册、自带模型 key、自托管文档 |

## 开发

需要 Node 24 和 pnpm（由 Corepack 提供）。

```bash
corepack enable pnpm
pnpm install
pnpm lint    # Biome
pnpm check   # TypeScript
pnpm test    # Vitest
```

在这个仓库里干活的规则见 [AGENTS.md](AGENTS.md)，对人和 AI 编码助手都适用。设计决策记录在 [docs/decisions](docs/decisions/)。

## 致谢

- [Rakazo](https://github.com/elie222/rakazo)（Apache-2.0）：bot 的定义和大部分架构改编自它。改编自 Rakazo 的文件会在文件头注明。
- [Pi](https://github.com/earendil-works/pi)（MIT）：agent loop。

## 许可证

[Apache-2.0](LICENSE)
