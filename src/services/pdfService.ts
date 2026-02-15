import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import Tesseract from 'tesseract.js';
import type { PDFProcessingResult, Attachment } from '@/types';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const MAX_FILE_SIZE = 30 * 1024 * 1024;
const MAX_OCR_PAGES = 15;
const OCR_SCALE = 1.5;

const generateId = (): string =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const formatFileSize = (bytes: number): string => {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
};

export const validatePDFFile = (
  file: File,
): { valid: boolean; error?: string } => {
  if (file.type !== 'application/pdf') {
    return { valid: false, error: 'Please upload a PDF file.' };
  }
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File size (${formatFileSize(
        file.size,
      )}) exceeds the 30 MB limit.`,
    };
  }
  return { valid: true };
};

const renderPageToImage = async (page: any): Promise<string> => {
  const viewport = page.getViewport({ scale: OCR_SCALE });
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  canvas.width = viewport.width;
  canvas.height = viewport.height;
  await page.render({ canvasContext: context, viewport }).promise;
  return canvas.toDataURL('image/png');
};

const extractTextFromImage = async (
  imageDataUrl: string,
): Promise<string> => {
  const { data } = await Tesseract.recognize(imageDataUrl, 'eng', {
    logger: () => {},
  });
  return data.text.replace(/\s+/g, ' ').trim();
};

export const extractTextFromPDF = async (
  file: File,
): Promise<PDFProcessingResult> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer, verbosity: 0 })
    .promise;

  const textPages: string[] = [];
  let ocrUsed = 0;

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    try {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();

      let pageText = textContent.items
        .map((item: any) => ('str' in item ? item.str : ''))
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();

      if ((!pageText || pageText.length < 20) && ocrUsed < MAX_OCR_PAGES) {
        ocrUsed++;
        const image = await renderPageToImage(page);
        const ocrText = await extractTextFromImage(image);
        if (ocrText) pageText = ocrText;
      }

      if (pageText) {
        textPages.push(`--- Page ${pageNum} ---\n${pageText}\n`);
      }
    } catch {
      textPages.push(
        `--- Page ${pageNum} ---\n[Error extracting this page]\n`,
      );
    }
  }

  const fullText = textPages.join('\n').trim();
  if (!fullText || fullText.length < 10) {
    throw new Error(
      'This PDF appears to contain only images or unreadable content.',
    );
  }

  return {
    text: fullText,
    pageCount: pdf.numPages,
    
  };
};

export const processPDFFile = async (
  file: File,
): Promise<Attachment> => {
  const validation = validatePDFFile(file);
  if (!validation.valid) throw new Error(validation.error);
  const result = await extractTextFromPDF(file);
  return {
    id: generateId(),
    name: file.name,
    type: 'pdf',
    size: file.size,
    url: URL.createObjectURL(file),
    extractedText: result.text,
  };
};

export const getPDFPreview = async (file: File): Promise<string> =>
  URL.createObjectURL(file);

export const cleanupPDFResources = (attachment: Attachment): void => {
  if (attachment.url.startsWith('blob:')) {
    URL.revokeObjectURL(attachment.url);
  }
};

export const searchInPDF = (text: string, query: string): boolean =>
  !!text && !!query && text.toLowerCase().includes(query.toLowerCase());

export const getPDFStats = (attachment: Attachment) => {
  const text = attachment.extractedText || '';
  const words = text.split(/\s+/).filter(Boolean);
  return {
    wordCount: words.length,
    characterCount: text.length,
    readingTime: Math.ceil(words.length / 200),
    pages: attachment.metadata?.pageCount || 0,
  };
};

export const extractKeyInfo = (text: string) => {
  const emailRegex =
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
  const phoneRegex =
    /(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g;
  const urlRegex = /https?:\/\/[^\s]+/g;
  const dateRegex =
    /\b\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4}\b|\b\d{4}[\/\-\.]\d{1,2}[\/\-\.]\d{1,2}\b/g;

  return {
    emails: [...new Set(text.match(emailRegex) || [])],
    phones: [...new Set(text.match(phoneRegex) || [])],
    urls: [...new Set(text.match(urlRegex) || [])],
    dates: [...new Set(text.match(dateRegex) || [])],
  };
};
