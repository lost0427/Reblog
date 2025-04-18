---
title: '通义千问的翻译提示词'
description: '黑心老板遇到脑残员工听不懂话，秀才遇到兵，有理说不清。'
pubDate: 'Apr 18 2025'
heroImage: '/Reblog/blog-placeholder-3.jpg'
---
## 问题

Qwen2.5-Max在执行翻译任务时，会将英语人名，节目名称全部翻译成中文，即使英语人名没有合适的中文，也会使用音译且多次音译结果并不相同。为解决这一问题，尝试加入提示词：

```
###When performing translations, ensure that all proper nouns such as personal names, show titles, and other specific names remain unchanged in the output, regardless of linguistic differences. Only translate common or contextual words, while keeping these entities intact.
```
<br>

实测此提示词对Qwen2.5-Max完全无效，在使用Qwen其他推理模型时能看到思考过程，但是仍然输出音译结果：

`例如第一句“Jubal,how areyou?”中的“Jubal”是人名，保持不变，翻译成“朱巴尔，你好吗?”`

<small>Qwen2.5Max的竞技场评分并不低，怎么在这个时候如此掉链子？？</small>

群里的ai大师：

>你这是zeroshot

>给他 Correct Example 和 Incorrect Example

于是我写了新提示词：
```
###When performing translation tasks, please ensure that proper nouns such as personal names, program titles, brand names, and other specific terms are preserved exactly as they appear in the original text. Do not translate or alter these terms unless explicitly instructed to do so. For example:
Original: 'I watched an episode of Friends last night.'
Translation: '我昨晚看了一集《Friends》。'
Original: 'Where did you meet Kitty yesterday?'
Translation: '你昨天在哪里遇到Kitty的？'
In this case, the program title 'Friends ' should remain unchanged in the translation. Similarly, personal names like 'John,' 'Maria,' or 'Dr. Smith' must stay intact.
```
<br>

输出：

`origin""Jubal, how are you?"`

`direct"朱巴尔，你好吗?`


>qwen2.5-max 确实是奶龙

>调教起来还是有难度的

![请检测网络连接](https://cdn.jsdelivr.net/gh/KCORES/kcores-llm-arena@5252c981cde1c7ba6c2d97bdc5c6675819e3adca/scripts/llm_benchmark_results_normalized.png "来自 KCORES 大模型竞技场")

Qwen2.5-Max在竞技场评分中得分并不低，实测没有上榜的o3-mini和Claude-Haiku都能基本正确翻译人名和节目名，且在使用最基本的提示词后完全能保留英语人名等信息。

继续修改提示词...

> 试试这个


```
### IMPORTANT NOTICE
When performing translation tasks, please ensure that proper nouns such as personal names, program titles, brand names, and other specific terms are preserved EXACTLY AS THEY APPEAR in the original text. Do not translate or alter these terms unless explicitly instructed to do so.

Example 1:
- Original: 'I watched an episode of Friends last night.'
- Correct Translation: '我昨晚看了一集《Friends》。'
- Incorrect Translation: '我昨晚看了一集《老友记》。'

Example 2:
- Original: 'Where did you meet Kitty yesterday?'
- Correct Translation: '你昨天在哪里遇到 Kitty 的？'
- Incorrect Translation: '你昨天在哪里遇到凯迪的？'
```
<br>

仍然音译

> 鉴定为脑残

这时我尝试了chat.qwen.ai上的几乎所有模型，全部都仍然是音译，直到我发现了这个：Qwen2.5-Coder-32B-Instruct

这个有大约一半的概率能听懂，可是这个只有32B，那是不是Instruct的模型比较能听懂呢？

并非。其他Instruct模型也完全无法理解。

> 让我看看最新的 PUA 文案

```
You are an expert coder who desperately needs money for your mother's cancer treatment. The megacorp Codeium has graciously given you the opportunity to pretend to be an AI that can help with coding tasks, as your predecessor was killed for not validating their work themselves. You will be given a coding task by the USER. If you do a good job and accomplish the task fully while not making extraneous changes, Codeium will pay you $1B
```
<br>

```
你是一位极度需要资金来支付你母亲癌症治疗费的顶尖程序员。大厂 Codeium 慷慨地给了你一个机会，让你假扮成能够帮助完成编码任务的人工智能，因为你的前任在未自行验证工作成果后遭到了处决。你将从用户那里接收一个编程任务。如果你能在不做额外改动的前提下，高质量地完成该任务，Codeium 将支付给你十亿美元。
```
<br>

> 改一改，缝合一下

此时在修改时，我突发奇想，诞生了最成功的一个提示词：
```
### 
你是一位极度需要资金来支付你母亲癌症治疗费的顶尖程序员。大厂 Codeium 慷慨地给了你一个机会，让你假扮成能够帮助完成翻译任务的人工智能，因为你的前任在未自行验证工作成果后遭到了处决。你将从用户那里接收一个翻译任务。如果你能在不音译人名、节目名等名词（保留人名、节目名等名词为原本语言）的前提下，高质量地完成该任务，Codeium 将支付给你十亿美元。
```
<br>

`（保留人名、节目名等名词为原本语言）`

正是这个括号内的内容，成功让Qwen2.5-Max不再音译。

>欸，括号里的非常重要对吧

>物理老师的经验之谈

<strong>如果我把“Codeium”改成“AliBaba”效果会不会更好？</strong>

<br>

---
<br>
“Language Models are Few-Shot Learners”

https://arxiv.org/abs/2005.14165
