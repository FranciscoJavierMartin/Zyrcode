export default function downloadNotebook(
  title: string,
  notebook: object,
  fileExtension: string,
): void {
  const notebookTitle = title || 'notebook';
  const blob = new Blob([JSON.stringify(notebook)], {
    type: 'application/json',
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${notebookTitle}.${fileExtension}`;
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
}
