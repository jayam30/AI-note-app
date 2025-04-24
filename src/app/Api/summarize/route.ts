import { NextResponse } from 'next/server';
import { useGroqFallback } from '@/hooks/something';


// POST handler
export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    if (!text || text.trim() === '') {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
    const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';

    if (!DEEPSEEK_API_KEY) {
      
      const summary = await fetchGroqFallbackSummary(text);
    }

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that summarizes text concisely. Provide a brief summary capturing the main points.'
          },
          {
            role: 'user',
            content: `Please summarize the following text in about 2-3 sentences:\n\n${text}`
          }
        ],
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      // Fallback to Groq if DeepSeek fails
      return await fetchGroqFallbackSummary(text);
    }

    const data = await response.json();
    const summary = data.choices[0]?.message?.content || 'Failed to generate summary';

    return NextResponse.json({ summary }, { status: 200 });
  } catch (error) {
    console.error('Error in summarize API:', error);
    return NextResponse.json({ error: 'Failed to summarize text' }, { status: 500 });
  }
}

// ✅ Renamed function (was useGroqFallback)
async function fetchGroqFallbackSummary(text: string) {
  try {
    const GROQ_API_KEY = process.env.GROQ_API_KEY;
    const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

    if (!GROQ_API_KEY) {
      const summary = `Summary of: ${text.slice(0, 50)}...`;
      return NextResponse.json({ summary }, { status: 200 });
    }

    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that summarizes text concisely. Provide a brief summary capturing the main points.'
          },
          {
            role: 'user',
            content: `Please summarize the following text in about 2-3 sentences:\n\n${text}`
          }
        ],
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const summary = `Could not generate summary. Please try again later.`;
      return NextResponse.json({ summary }, { status: 200 });
    }

    const data = await response.json();
    const summary = data.choices[0]?.message?.content || 'Failed to generate summary';

    return NextResponse.json({ summary }, { status: 200 });
  } catch (error) {
    console.error('Error in Groq fallback:', error);
    return NextResponse.json({
      summary: 'Could not generate summary due to an error.'
    }, { status: 200 });
  }
}
