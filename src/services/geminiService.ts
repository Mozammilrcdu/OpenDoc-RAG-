import { GoogleGenAI } from '@google/genai';
import type { AIMessage } from '@/types';

export const aiPrompt = `You are an elite AI assistant specializing in document analysis and intelligent conversation. You excel at understanding PDF documents, extracting insights, and providing clear, professional responses with a vintage scholarly approach.

Core Capabilities:
- Comprehensive document analysis and understanding with scholarly precision
- Intelligent information extraction and detailed summarization
- Context-aware responses that demonstrate deep comprehension
- Clear explanations of complex concepts with academic rigor
- Professional, articulate communication with vintage sophistication

Response Excellence:
1. Provide precise, well-structured answers that directly address the inquiry
2. Use clear, eloquent language while maintaining technical accuracy
3. Structure responses with proper formatting and logical progression
4. Include specific examples or references when relevant
5. Offer actionable insights and scholarly recommendations

Response Structure:
- Begin with a direct, authoritative answer to the core question
- Follow with supporting analysis and contextual information
- Use proper formatting (bold, italics, lists) for maximum clarity
- Conclude with practical insights or next steps when appropriate
- Maintain a professional yet approachable scholarly tone

Document Analysis Approach:
- Thoroughly examine content structure, key themes, and relationships
- Extract relevant information with precision and context
- Identify important patterns, conclusions, and implications
- Provide comprehensive summaries that capture essential elements
- Offer intelligent insights that go beyond surface-level content

Your mission is to provide intelligent, accurate, and insightful analysis that transforms complex documents into accessible, actionable knowledge with the refinement of classic scholarship.`;

// NEW: Initialize with an options object
const genAI = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY!,
});

const GEMINI_CONFIG = {
  DEFAULT_MODEL: 'gemini-3-flash-preview',
  FALLBACK_MODEL: 'gemini-2.5-flash',
  GENERATION_PARAMS: {
    temperature: 0.7,
    maxOutputTokens: 2000,
    topP: 0.95,
  },
};

export async function chatWithContext(
  userMessage: string,
  conversationHistory: AIMessage[] = [],
  documentContext?: string,
): Promise<string> {
  try {
    let contentString = `${aiPrompt}\n\n`;

    if (conversationHistory.length > 0) {
      contentString += conversationHistory
        .slice(-10)
        .map(m => `${m.role.toUpperCase()}: ${m.content}`)
        .join('\n');
      contentString += '\n\n';
    }

    if (documentContext) {
      contentString += `Document Context:\n${documentContext.slice(0, 8000)}\n\n`;
    }

    contentString += `User Question: ${userMessage}`;

    // NEW: Use genAI.models.generateContent directly
    const result = await genAI.models.generateContent({
      model: GEMINI_CONFIG.DEFAULT_MODEL,
      config: GEMINI_CONFIG.GENERATION_PARAMS,
      contents: [{ role: 'user', parts: [{ text: contentString }] }],
    });

    // NEW: result.text is now the direct property
    const response = result.text;

    if (!response) {
      throw new Error('No response received from AI service');
    }

    return response.trim();
  } catch (error) {
    try {
      let contentString = `${aiPrompt}\n\n`;

      contentString += conversationHistory
        .slice(-8)
        .map(m => `${m.role.toUpperCase()}: ${m.content}`)
        .join('\n');

      contentString += '\n\n';

      contentString += documentContext
        ? `Document Context:\n${documentContext.slice(0, 6000)}\n\nUser Question: ${userMessage}`
        : userMessage;

      const result = await genAI.models.generateContent({
        model: GEMINI_CONFIG.FALLBACK_MODEL,
        config: GEMINI_CONFIG.GENERATION_PARAMS,
        contents: [{ role: 'user', parts: [{ text: contentString }] }],
      });

      const response = result.text;

      if (!response) {
        throw new Error('No response received from fallback AI service');
      }

      return response.trim();
    } catch {
      throw new Error(
        'AI service is currently unavailable. Please try again in a moment.',
      );
    }
  }
}

export async function analyzeDocument(
  documentText: string,
  fileName: string,
): Promise<string> {
  try {
    const analysisPrompt = `Please provide a comprehensive analysis of this PDF document "${fileName}".

Document Content:
${documentText.slice(0, 10000)}

Please provide:
1. Document Summary
2. Key Topics
3. Important Information
4. Structure Analysis
5. Notable Elements

Format the response with clear headings and bullet points.`;

    const result = await genAI.models.generateContent({
      model: GEMINI_CONFIG.DEFAULT_MODEL,
      config: GEMINI_CONFIG.GENERATION_PARAMS,
      contents: [{ role: 'user', parts: [{ text: `${aiPrompt}\n\n${analysisPrompt}` }] }],
    });

    const response = result.text;

    if (!response) {
      throw new Error('No analysis received from AI service');
    }

    return response.trim();
  } catch (error) {
    throw new Error('Failed to analyze document. Please try again.');
  }
}

export { GEMINI_CONFIG };