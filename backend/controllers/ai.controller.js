// controllers/ai.controller.js

export const generateDescription = async (req, res) => {
    try {
        const { equipmentName, keywords } = req.body;

        if (!equipmentName || !equipmentName.trim()) {
            return res.status(400).json({ success: false, message: "Equipment name is required" });
        }

        // URL yahan (function ke andar, request-time pe) banate hain, file-import ke time nahi —
        // taaki tab tak dotenv.config() process.env.GEMINI_API_KEY already load kar chuka ho
        // (Cloudinary wala hi ESM import-order gotcha yahan bhi lagta, isliye pattern repeat kiya)
        const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

        // Yeh humara prompt hai — LLM ko exact instructions dete hain
        // taaki output textarea mein directly use ho sake (no markdown, no headings)
        const prompt = `Write a short, farmer-friendly rental listing description for the following farm equipment.

Equipment name: ${equipmentName}
Key features/keywords: ${keywords || "not specified"}

Rules:
- 2 to 4 sentences only, plain text, no markdown, no headings, no bullet points.
- Mention what the equipment is used for and its key features.
- Tone: simple, practical, trustworthy — like a farmer describing their own equipment to a neighbor.
- Do not invent specific numbers (horsepower, year, price) that were not given in the keywords.`;

        const response = await fetch(GEMINI_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
            }),
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error("Gemini API error:", errText);
            return res.status(502).json({ success: false, message: "AI service failed to respond" });
        }

        const data = await response.json();
        const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!generatedText) {
            return res.status(502).json({ success: false, message: "AI did not return a description" });
        }

        res.status(200).json({ success: true, description: generatedText.trim() });
    } catch (error) {
        console.error("Error generating description:", error);
        res.status(500).json({ success: false, message: "Server error while generating description" });
    }
};