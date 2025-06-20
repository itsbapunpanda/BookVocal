import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";

// IMPORTANT: Use the exact worker version matching your pdfjs-dist version
GlobalWorkerOptions.workerSrc = 
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js";


export async function extractTextFromPDF(file: File, startPage: number, endPage: number): Promise<string[]> {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await getDocument({ data: arrayBuffer }).promise;
  const textLines: string[] = [];

  const clampedStart = Math.max(1, startPage);
  const clampedEnd = Math.min(endPage, pdf.numPages);

  for (let i = clampedStart; i <= clampedEnd; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items.map((item: any) => item.str).join(" ");
    const lines = pageText.split(/(?<=[.?!])\s+/); // split by sentence
    textLines.push(...lines);
  }

  return textLines;
}
