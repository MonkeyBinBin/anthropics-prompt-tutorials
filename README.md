# Prompt 工程互動教學

改編自 [Anthropic 官方 Prompt Engineering Interactive Tutorial](https://github.com/anthropics/prompt-eng-interactive-tutorial)，重新設計為純前端的中文互動教學網頁，可直接在瀏覽器中閱讀與練習。

## 教學章節

| 章節 | 主題 |
|------|------|
| 00 | 教學指南 |
| 01 | 基本提示詞結構 |
| 02 | 清晰與直接 |
| 03 | 角色指派 |
| 04 | 分離資料與指令 |
| 05 | 格式化輸出與預填回應 |
| 06 | 預思考（逐步思考） |
| 07 | 使用範例（Few-Shot） |
| 08 | 避免幻覺 |
| 09 | 從零建構複雜提示詞 |
| 10.1 | 提示詞鏈接 |
| 10.2 | 工具使用 |
| 10.3 | 搜尋與檢索 |

## 功能特色

- 純靜態 HTML/CSS/JS，無需建置工具或後端
- 側邊欄章節導覽，支援鍵盤快捷鍵（`←` `→`）切換
- 閱讀進度追蹤（localStorage）
- 響應式設計，支援行動裝置
- 程式碼區塊一鍵複製
- 提示摺疊互動元件

## 使用方式

直接用瀏覽器開啟 `index.html` 即可。

```bash
# macOS
open index.html

# Linux
xdg-open index.html
```

## 技術棧

- HTML / CSS / JavaScript（原生，無框架依賴）
- Google Fonts（Noto Sans TC / Noto Serif TC）

