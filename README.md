# newsnow-mcp-server

![](/assets/og-image.png)

Official MCP Server for [NewsNow](https://github.com/ourongxing/newsnow), 40+ sources available.

## Usage

```json
{
  "mcpServers": {
    "newsnow": {
      "command": "npx",
      "args": [
        "-y",
        "newsnow-mcp-server"
      ],
      "env": {
        "BASE_URL": "https://newsnow.busiyi.world"
      }
    }
  }
}
```

## License

[MIT](./LICENSE) © ourongxing
