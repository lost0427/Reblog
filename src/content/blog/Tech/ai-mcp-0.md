---
title: 'MCP实验'
description: '首次尝试MCP'
pubDate: 'Apr 15 2025'
heroImage: '/Reblog/blog-placeholder-3.jpg'
---
## MCP所需的大语言模型
免费的大语言模型来自
https://openrouter.ai/

只有较高级的模型才能较好地使用mcp，以下是来自cursor的模型支持图

![请检测网络连接](https://cdn.jsdelivr.net/gh/lost0427/Reblog@main/public/Tech/ai-mcp-0/cursor-0.webp "来自cursor的模型支持图")

<small>在这张图中 最便宜的竟然是openai的o3-mini😅</small>

经实验：实际上deepseek r1满血版 671b的 是可以调用mcp的

阿里云的免费llama-r1-distill-70b平时使用没问题，但是调用mcp能力很差

Gemini-2.5-pro-exp-03-25可以在Google的ai网站上免费使用，一天1500次

openroutor上也有Gemini2.5pro，还有nvidia/llama-3.1-nemotron-ultra-253b-v1:free以及满血的deepseek/deepseek-r1:free，可以调用mcp

大语言模型调用mcp的能力不是0/1，只是一些模型更“愿意”使用工具，或者说是更“明白”什么时候需要使用工具

为了更低成本，更高响应率，我尝试开发了一个openai兼容接口，可以调用duck.ai上的所有模型，但是duckai的o3-mini上下文似乎很短，正常使用没问题，用cline调用会报错

这个接口没做鉴权，仅供学习研究，链接私信

<br>

---

为了使大语言模型能够更好地应用与游戏的设定中，可以使用Silly Tavern的角色卡和世界书功能，为大语言模型补充一些专有名词的含义，以及角色的设定。

Silly Tavern

https://github.com/SillyTavern/SillyTavern

链接，账号密码在群里，此服务不是常开

<br>

---
## 以下是一些相关的技术连接

mcp技术

https://mcp-docs.cn/introduction

使用sse模式

https://mcp-docs.cn/docs/concepts/transports#sse

https://model-context-protocol.github.io/specification/basic/transports/

openai的sse模式mcp示例
https://github.com/openai/openai-agents-python/tree/main/examples/mcp/sse_example

超长上下文，qwen agent

https://github.com/QwenLM/Qwen-Agent/blob/main/README_CN.md

whisper X

https://github.com/m-bain/whisperX

faster-whisper

https://github.com/SYSTRAN/faster-whisper

低成本多模态模型

https://huggingface.co/Qwen/Qwen2.5-Omni-7B

https://github.com/QwenLM/Qwen2.5-Omni/blob/main/README_CN.md

