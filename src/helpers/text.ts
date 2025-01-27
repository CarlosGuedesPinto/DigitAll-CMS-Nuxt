export const formatText = (text: string) => {
  let formattedText = text;

  // Check if the text starts with /azul/
  if (formattedText.startsWith('/azul/')) {
    // Remove /azul/ from the text
    formattedText = formattedText.replace('/azul/', '');
    // Wrap the text in a span with blue color
    formattedText = `<span class="blue-text semibold">${formattedText}</span>`;
  }

  // Replace newlines with <br>
  formattedText = formattedText.replace(/\n/g, '<br>');

  // Regex to find text between "()" and the next link between "[]"
  const regex = /\(([^)]+)\)\s*\[([^\]]+)\]/g;

  // Replace the matched text with an anchor tag
  formattedText = formattedText.replace(regex, (match, p1, p2) => {
    return `<a href="${p2}" target="_blank" style="text-decoration: underline;">${p1}</a>`;
  });

  return formattedText;
};