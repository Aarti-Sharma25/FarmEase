// utils/embeddings.js

// Gemini embedding model se ek text ka vector (embedding) generate karta hai.
// taskType: "RETRIEVAL_DOCUMENT" (listing save karte waqt) ya
//           "RETRIEVAL_QUERY" (user search karte waqt) — Gemini dono ko
//           thoda alag treat karta hai, better matching ke liye.
export const embedText = async (text, taskType) => {
    // URL yahan (function ke andar) banate hain — request-time pe —
    // taaki dotenv.config() se pehle hi process.env.GEMINI_API_KEY set ho chuka ho
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${process.env.GEMINI_API_KEY}`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            model: "models/gemini-embedding-001",
            content: { parts: [{ text }] },
            taskType,
        }),
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Gemini embedding API error: ${errText}`);
    }

    const data = await response.json();
    return data?.embedding?.values || [];
};

// Do vectors ke beech cosine similarity nikalta hai.
// Result -1 se 1 ke beech hota hai — 1 ka matlab "same meaning", 0 ka matlab "unrelated".
export const cosineSimilarity = (vecA, vecB) => {
    if (!vecA?.length || !vecB?.length || vecA.length !== vecB.length) return -1;

    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i];
        magnitudeA += vecA[i] * vecA[i];
        magnitudeB += vecB[i] * vecB[i];
    }

    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);

    if (magnitudeA === 0 || magnitudeB === 0) return -1;

    return dotProduct / (magnitudeA * magnitudeB);
};