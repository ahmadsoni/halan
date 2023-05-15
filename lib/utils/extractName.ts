function extractName(text: string): string {
  const words = text.split(' ');

  if (words.length === 1) {
    return text.replace(',', '');
  } else if (words.length >= 2) {
    const uniqueWords = [...new Set(words)];
    if (uniqueWords.length >= 3) {
      uniqueWords.splice(2);
    }
    return uniqueWords.join(' ').replace(',', '');
  } else {
    return '';
  }
}

export default extractName;
