export const formatText = (text: string) => {

  if (!text) {
    return text;
  }

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

  // Handle lists
  if (formattedText.includes('(-)')) {
    const lines = formattedText.split('<br>');
    let result = '';
    let listItems = '';
    let insideList = false;

    lines.forEach(line => {
      if (line.trim().startsWith('(-)')) {
        if (!insideList) {
          insideList = true;
          result += '<ul>';
        }
        listItems += `<li>${line.replace('(-)', '').trim()}</li>`;
      } else {
        if (insideList) {
          insideList = false;
          result += `${listItems}</ul>`;
          listItems = '';
        }
        result += `${line}<br>`;
      }
    });

    if (insideList) {
      result += `${listItems}</ul>`;
    }

    formattedText = result;
  }

  return formattedText;
};