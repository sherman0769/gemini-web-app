// api/chat.js
// 引入 Google Generative AI 函式庫，用來和 Gemini AI 互動
import { GoogleGenerativeAI } from '@google/generative-ai';

// 這是 Vercel Serverless Function 的入口點
// 它會處理來自前端的請求 (req) 並發送回覆 (res)
export default async function handler(req, res) {
    // 檢查請求方法是否為 POST，只接受 POST 請求以處理用戶輸入
    if (req.method !== 'POST') {
        // 如果不是 POST 請求，就回覆錯誤訊息 (405 Method Not Allowed)
        return res.status(405).json({ message: '此端點只接受 POST 請求。' });
    }

    // 從請求的內容 (req.body) 中獲取用戶輸入的問題 (prompt)
    const { prompt } = req.body;

    // 檢查 prompt 是否存在
    if (!prompt) {
        // 如果 prompt 不存在，就回覆錯誤訊息 (400 Bad Request)
        return res.status(400).json({ message: '缺少提問內容。' });
    }

    // 從 Vercel 的環境變數中獲取 Gemini API 金鑰
    // 這個金鑰我們之後會在 Vercel 平台上設置，確保安全不暴露在程式碼中
    const API_KEY = process.env.GEMINI_API_KEY;

    // 檢查 API 金鑰是否已配置
    if (!API_KEY) {
        // 如果金鑰未配置，就回覆錯誤訊息 (500 Internal Server Error)
        return res.status(500).json({ message: 'Gemini API 金鑰未配置。' });
    }

    try {
        // 使用獲取到的 API 金鑰初始化 Gemini AI 服務
        const genAI = new GoogleGenerativeAI(API_KEY);
        // 選擇要使用的 Gemini 模型，這裡使用 "gemini-pro" (通用型模型)
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        // 向 Gemini 模型發送內容生成請求 (也就是你的問題)
        const result = await model.generateContent(prompt);
        // 從結果中獲取 Gemini 的回覆
        const response = await result.response;
        // 將回覆轉換為純文字
        const text = response.text();

        // 將 Gemini 的文字回覆作為 JSON 數據發送回前端 (200 OK)
        res.status(200).json({ response: text });
    } catch (error) {
        // 如果在調用 Gemini API 過程中發生任何錯誤，捕獲並記錄下來
        console.error('調用 Gemini API 時發生錯誤:', error);
        // 向前端回覆錯誤訊息 (500 Internal Server Error)
        res.status(500).json({ message: '生成內容時發生錯誤。', error: error.message });
    }
}
