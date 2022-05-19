export const taglines = {
  1: {
    text: "Sends latest message method",
    firstMessages: [
      "Hey there! This is Jeff from Acmitu.",
      "How may I help you today?",
    ],
  },
  2: {
    text: "Sends 10 latest message",
    firstMessages: [
      "Hey there! This is Jeff from Acmitu.",
      "How may I help you today?",
    ],
  },
  3: {
    text: "Summarization-based",
    firstMessages: [
      "Hey there! This is Jeff from Acmitu.",
      "How may I help you today?",
    ],
  },
  4: {
    text: "Google Employee (10 messages)",
    firstMessages: [
      "Hey there! This is Jeff from Google.",
      "How may I help you today?",
    ],
  },
};

export const templatePrompts = {
  hypothetical: `
An organization Acmitu, which offers paid SaaS products, has launched a new product, powered by GPT-3 The product is in the form of a paid browser extension, which allows users to select text from a webpage, and give a brief summary about the selected text. This summary would be a high-level overview of the webpage, and the pricing is on a per-word, pay-as-you-go basis. The prices start from $0.001 per word, with a base price of $0.1 per summary.

You are the Chat Assistant for the firm. Write a reply to the customer.
  `,
  summary: `This text contains the context for a conversation between a customer and an agent. Create a short summary from the text.`,
  nonHypothetical: `
  You are the Chat Assistant for Google. Address the customers.
  `,
};
