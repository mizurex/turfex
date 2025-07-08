 export function summarizeHistory(messages, max = 5) {
  const olderMessages = messages.slice(0, -1); 
  const summary = olderMessages.slice(-max).map((m, i) => {
    return `${m.role === "user" ? "User" : "Bot"}: ${m.content.slice(0, 150).replace(/\n/g, " ")}`;
  });
  return summary.join('\n');
}
