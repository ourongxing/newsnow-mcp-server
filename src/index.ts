import { FastMCP } from "fastmcp"
import { z } from "zod"
import { $fetch } from "ofetch"
import { description } from "./process"
import type { SourceResponse } from "./typing"

const server = new FastMCP({
  name: "NewsNow",
  version: "0.0.1",
})

console.log(description)

server.addTool({
  name: `get_hotest_latest_news`,
  description: `get news from hotest or latest, by id. ${description}`,
  parameters: z.object({
    id: z.string(),
    count: z.number().default(10),
  }),
  execute: async ({ id, count }) => {
    const res: SourceResponse = await $fetch(`https://newsnow.busiyi.world/api/s?id=${id}`)
    return res.items.slice(0, count).map((item) => {
      return `[${item.title}](${item.url})`
    }).join("\n")
  },
})

server.start({
  transportType: "stdio",
})
