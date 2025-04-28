import { FastMCP } from "fastmcp"
import { z } from "zod"
import { $fetch } from "ofetch"
import { sourcesList } from "./process"
import type { SourceResponse } from "./typing"

const server = new FastMCP({
  name: "NewsNow",
  version: "0.0.1",
})

sourcesList.forEach((source) => {
  server.addTool({
    name: `get_${source.id}_news`,
    description: `get news from ${source.name}${source.title ? `-${source.title}` : ""}`,
    parameters: z.object({
      count: z.number().default(10),
    }),
    execute: async ({ count }) => {
      const res: SourceResponse = await $fetch(`https://newsnow.busiyi.world/api/s?id=${source.id}`)
      return res.items.slice(0, count).map((item) => {
        return `[${item.title}](${item.url})`
      }).join("\n")
    },
  })
})

server.start({
  transportType: "stdio",
})
