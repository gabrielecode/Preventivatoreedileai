export default async function handler(req, res) {
  // Solo POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'Server API key not configured' });
  }

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt required' });
  }

  const models = ['gemini-2.0-flash', 'gemini-1.5-pro', 'gemini-pro'];

  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.4, maxOutputTokens: 2048 }
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (model === models[models.length - 1]) {
          return res.status(response.status).json({
            error: data.error?.message || `API Error: ${response.status}`
          });
        }
        continue;
      }

      const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!raw) {
        if (model === models[models.length - 1]) {
          return res.status(500).json({ error: 'Empty response from API' });
        }
        continue;
      }

      try {
        const clean = raw
          .replace(/```json\n?/g, '')
          .replace(/```\n?/g, '')
          .trim();
        const parsed = JSON.parse(clean);
        return res.status(200).json(parsed);
      } catch (parseError) {
        if (model === models[models.length - 1]) {
          return res.status(500).json({ error: 'Invalid JSON response' });
        }
        continue;
      }
    } catch (error) {
      if (model === models[models.length - 1]) {
        return res.status(500).json({ error: error.message });
      }
      await new Promise(r => setTimeout(r, 300));
    }
  }

  return res.status(500).json({ error: 'All models failed' });
}
