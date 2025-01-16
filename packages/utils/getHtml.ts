export const extractHTML = (): string => {
  return document.documentElement.outerHTML;
};

export const createHTMLFile = (html: string): File => {
  const blob = new Blob([html], { type: 'text/html' });
  return new File([blob], 'uploaded-html.html', { type: 'text/html' });
};

export interface HTMLFileInfo {
  html: string;
  file: File;
}

export const getHTMLFile = (): HTMLFileInfo => {
  const html = extractHTML();
  const file = createHTMLFile(html);
  return { html, file };
};