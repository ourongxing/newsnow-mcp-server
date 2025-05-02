#!/usr/bin/env node
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
  name: "get_hotest_latest_news",
  description: `get hotest or latest news from source by {id}, return {count: 10} news.`,
  parameters: z.object({
    id: z.string().describe(`source id. e.g. ${description}`),
    count: z.any().default(10).describe("count of news to return."),
  }),
  execute: async ({ id, count }) => {
    let n = Number(count)
    if (Number.isNaN(n) || n < 1) {
      n = 10
    }
    const res: SourceResponse = await $fetch(`${baseUrl}/api/s?id=${id}`)
    return {
      content: res.items.slice(0, count).map(item => ({
        text: `[${item.title}](${item.url})`,
        type: "text",
      })),
    }
  },
})

server.start({
  transportType: "stdio",
})
