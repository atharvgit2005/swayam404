const QUOTES = [
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "In software, the most expensive blunders are the ones you build right, but for the wrong problem.", author: "Swayam Mohanty" },
  { text: "There are two ways to write error-free programs; only the third one works.", author: "Alan J. Perlis" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" }
];

module.exports = (req, res) => {
  const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  res.status(200).json(randomQuote);
};
