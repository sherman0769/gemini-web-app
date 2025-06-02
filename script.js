document.addEventListener('DOMContentLoaded', () => {
    // 獲取網頁上的元素，方便之後操作
    const promptInput = document.getElementById('promptInput'); // 輸入框
    const sendButton = document.getElementById('sendButton');   // 發送按鈕
    const responseOutput = document.getElementById('responseOutput'); // 顯示 AI 回覆的區域

    // 當發送按鈕被點擊時會執行的程式碼
    sendButton.addEventListener('click', async () => {
        const prompt = promptInput.value.trim(); // 獲取輸入框中的文字，並去除前後空格

        // 如果輸入框是空的，就顯示提示訊息
        if (!prompt) {
            responseOutput.textContent = '請輸入你的問題！';
            return; // 結束這個函數，不繼續執行
        }

        responseOutput.textContent = '思考中...'; // 顯示「思考中...」的提示
        sendButton.disabled = true; // 禁用按鈕，防止重複提交

        // 這裡將會是未來調用後端代理的部分，目前先留空
        // 我們會在之後的步驟中添加真正的 Gemini AI 調用邏輯

        sendButton.disabled = false; // 重新啟用按鈕
    });
});
