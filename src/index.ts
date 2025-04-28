import process from "node:process"
import { FastMCP } from "fastmcp"
import { z } from "zod"
import { $fetch } from "ofetch"
import { config } from "dotenv"
import packageJson from "../package.json"
import { description } from "./process"
import type { SourceResponse } from "./typing"

config()

if (!process.env.BASE_URL) {
  console.error("BASE_URL is not set")
  process.exit(1)
}
const baseUrl = process.env.BASE_URL

const server = new FastMCP({
  name: "NewsNow",
  version: packageJson.version as `${number}.${number}.${number}`,
})

server.addTool({
  name: `get_hotest_latest_news`,
  description: `get news from hotest or latest, by id. ${description}`,
  parameters: z.object({
    id: z.string(),
    count: z.number().default(10),
  }),
  annotations: {
    title: "get news from hotest or latest, by id",
    readOnlyHint: true,
  },
  execute: async ({ id, count }) => {
    const res: SourceResponse = await $fetch(`${baseUrl}/api/s?id=${id}`)
    return res.items.slice(0, count).map((item) => {
      return `[${item.title}](${item.url})`
    }).join("\n")
  },
})

server.start({
  transportType: "stdio",
})
