import fs from "fs";
import "dotenv/config";

async function generateAIImage(prompt, filename) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.error("오류: .env 파일에 GEMINI_API_KEY가 설정되어 있지 않습니다.");
    return;
  }

  const url = "https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=" + key;
  
  const payload = {
    instances: [{ prompt: prompt }],
    parameters: { sampleCount: 1 }
  };

  try {
    console.log("AI 이미지 생성 중: " + prompt + "...");
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    
    if (data.predictions && data.predictions.length > 0) {
      const base64Image = data.predictions[0].bytesBase64Encoded;
      if (base64Image) {
        const path = "public/images/" + filename;
        fs.writeFileSync(path, Buffer.from(base64Image, "base64"));
        console.log("성공! 이미지가 저장되었습니다: " + path);
        return;
      }
    }
    console.error("이미지 생성 실패:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("통신 오류:", err);
  }
}

const [,, prompt, filename] = process.argv;

if (prompt && filename) {
  generateAIImage(prompt, filename);
} else {
  console.log('사용법: node scripts/generate-ai-assets.mjs "프롬프트" "파일명.png"');
}
