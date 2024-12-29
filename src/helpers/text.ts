export const formatText = (text: string) => {
  // Replace newlines with <br>
  let formattedText = text.replace(/\n/g, '<br>');

  // Regex to find text between "()" and the next link between "[]"
  const regex = /\(([^)]+)\)\s*\[([^\]]+)\]/g;

  // Replace the matched text with an anchor tag
  formattedText = formattedText.replace(regex, (match, p1, p2) => {
    return `<a href="${p2}" target="_blank" style="text-decoration: underline;">${p1}</a>`;
  });

  return formattedText;
};