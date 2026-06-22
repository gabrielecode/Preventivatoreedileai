export default async function handler(req, res) {
  // Allow browser apps and simple diagnostics from external tools.
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return res.status(204).end();
  }

  // Solo POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const { prompt } = body;
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error:
        'Server API key not configured. Set GEMINI_API_KEY (recommended) or NEXT_PUBLIC_GEMINI_API_KEY in Vercel.',
    });
  }

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt required' });
  }

  const models = ['gemini-2.5-flash', 'gemini-2.5-pro', 'gemini-2.5-flash-lite'];

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
            error: data.error?.message || `API Error: ${response.status}`,
            model,
          });
        }
        continue;
      }

      const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!raw) {
        if (model === models[models.length - 1]) {
          return res.status(500).json({ error: 'Empty response from API', model });
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
          return res.status(500).json({ error: 'Invalid JSON response', model, raw });
        }
        continue;
      }
    } catch (error) {
      if (model === models[models.length - 1]) {
        return res.status(500).json({ error: error.message, model });
      }
      await new Promise(r => setTimeout(r, 300));
    }
  }

  return res.status(500).json({ error: 'All models failed' });
}
