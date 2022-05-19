const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { prompt } = req.body;

    let completion = "";
    while (completion.length === 0) {
      // Repeat until completion is created
      completion = await getCompletion(prompt);
    }

    // Trim "Assistant: " from the beginning of the completion
    completion = completion.replace("Assistant: ", "").replaceAll("\n", "");

    console.log(completion);

    // res.json({ response });
    res.json({ completion });
  } else {
    res.status(500).json({ completion: "Only post allowed on this route" });
  }
};

const getCompletion = async (prompt) => {
  const response = await openai.createCompletion("text-davinci-002", {
    prompt,
    temperature: 0.7,
    max_tokens: 589,
    top_p: 1,
    frequency_penalty: 0.52,
    presence_penalty: 0.57,
  });

  return response.data.choices[0].text;
};

export default handler;
