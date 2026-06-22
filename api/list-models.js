// Test endpoint per scoprire quali modelli sono disponibili
export default async function handler(req, res) {
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({
      error:
        'API key not configured. Set GEMINI_API_KEY (recommended) or NEXT_PUBLIC_GEMINI_API_KEY in Vercel.',
    });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`,
      { method: 'GET' }
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }
    
    // Estrai solo i nomi dei modelli
    const models = data.models?.map(m => ({
      name: m.name,
      supportedMethods: m.supportedGenerationMethods
    })) || [];
    
    return res.status(200).json({ models });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
