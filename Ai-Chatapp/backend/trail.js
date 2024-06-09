const data = {
    history: [
      {
          role: "user",
          parts: [{ text: "hi " }],
      },
      {
        role: "model",
        parts: [{ text: "Hi " }],
      },
    ],
    generationConfig: {
      maxOutputTokens: 1000,
    },
}

console.log(data.history)
data.history.push({
    role: "user",
    parts: [{text: "hi"}],
});
console.log(data.history)