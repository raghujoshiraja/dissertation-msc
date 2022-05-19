import { useState, useContext } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { chatContext } from "../global/state";
import { taglines } from "../utils/constants";
import { toast } from "react-toastify";
import axios from "axios";
import { templatePrompts } from "../utils/constants";

// Components
import Layout from "../components/layout";
import SearchBox from "../components/ui/SearchBox";
import ChatCard from "../components/ui/chatCard";
import Button from "../components/ui/Button";
import MessagePanel from "../components/ui/MessagePanel";

export default function Home() {
  const { register, handleSubmit, reset } = useForm();
  const { chatData, setChatData, currentApproach, setCurrentApproach } =
    useContext(chatContext);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    approachSubmit(
      { chatData, setChatData, setLoading, ...data },
      currentApproach
    );
    reset();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Superhero Chat</title>
        <meta
          name="description"
          content="Chat with different prompt designs of the GPT-3 with the help of a beautiful interface"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <main className={styles.main}>
          {/* Left Side */}
          <div className={styles.left}>
            <SearchBox />

            {/* Chat Members */}
            <div className={styles.sidebar}>
              {[...Array(4)].map((_, idx) => (
                <ChatCard
                  title={`Approach ${idx + 1}`}
                  subtext={taglines[idx + 1].text}
                  key={idx}
                  imageURI={`/assets/images/approaches/${idx + 1}.svg`}
                  onClick={() => setCurrentApproach(idx + 1)}
                />
              ))}
            </div>

            <p className={styles.copy}>© Raghu Raja - WLV Univ. - 2022</p>
          </div>

          {/* Content Window */}
          <div className={styles.contentWrapper}>
            {/* Status Bar */}
            <div className={styles.statusBar}>
              {/* User Tag */}
              <div className={styles.userTag}>
                <ChatCard
                  title={`Approach ${currentApproach}`}
                  imageURI={`/assets/images/approaches/${currentApproach}.svg`}
                  subtext={taglines[currentApproach].text}
                  isVerified={true}
                />
              </div>
            </div>

            {/* Chat Window */}
            <div className={styles.chatPanel}>
              <MessagePanel />

              {/* Bottom Bar */}
              {loading && (
                <p className="loading">
                  <Image
                    src="/loading.gif"
                    width="50"
                    height="10"
                    objectFit="cover"
                    objectPosition="center"
                  />{" "}
                  Jeff is typing
                </p>
              )}
              <form
                className={styles.bottomBar}
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className={styles.inputWrapper}>
                  {/* Emoji Picker */}
                  <div className={styles.emojiPicker}>
                    <button>
                      <Image
                        height={26}
                        width={28}
                        alt="send"
                        src="/assets/icons/smile.svg"
                      />
                    </button>
                  </div>
                  {/* Textbox */}
                  <input
                    className={styles.input}
                    placeholder="Type a message..."
                    type="text"
                    {...register("text", { required: true })}
                  />
                </div>
                <button href="/" className={styles.primaryButton}>
                  <Image
                    height={26}
                    width={28}
                    alt="send"
                    src="/assets/icons/plane.svg"
                  />
                </button>
              </form>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
}

const approachSubmit = async (
  { text, chatData, setChatData, side = "right", setLoading },
  approach
) => {
  console.log(chatData);
  addMessage({ text, side, chatData, setChatData });
  let prompt;

  // Send to AI
  switch (approach) {
    case 1:
      prompt =
        templatePrompts.hypothetical +
        `${
          { left: "Assistant", right: "Customer" }[side]
        }: ${text}\nAssistant: `;

      setLoading(true);
      await handleInteraction({ prompt, setChatData });
      setLoading(false);

      break;
    case 2:
      prompt =
        templatePrompts.hypothetical +
        [...chatData.slice(-9), { side: "right", text }]
          .map(
            ({ text, side }) =>
              `${
                { left: "Assistant", right: "Customer" }[side]
              }: ${text}\nAssistant: `
          )
          .join("\n");

      setLoading(true);
      await handleInteraction({ prompt, setChatData });
      setLoading(false);
      break;
    case 3:
      prompt =
        templatePrompts.hypothetical +
        [...chatData.slice(-9), { side: "right", text }]
          .map(
            ({ text, side }) =>
              `${
                { left: "Assistant", right: "Customer" }[side]
              }: ${text}\nAssistant: `
          )
          .join("\n");

      setLoading(true);
      await handleInteraction({ prompt, setChatData });
      setLoading(false);
      break;
    case 4:
      prompt =
        templatePrompts.nonHypothetical +
        [...chatData.slice(-9), { side: "right", text }]
          .map(
            ({ text, side }) =>
              `${
                { left: "Assistant", right: "Customer" }[side]
              }: ${text}\nAssistant: `
          )
          .join("\n");

      setLoading(true);
      await handleInteraction({ prompt, setChatData });
      setLoading(false);
      break;
  }
};

const handleInteraction = async ({ prompt, setChatData }) => {
  // Fetch Message from API
  const {
    data: { completion },
  } = await axios.post("/api/chat", { prompt });

  addMessage({
    text: completion,
    side: "left",
    setChatData,
  });
};

const addMessage = ({ text, side, setChatData }) =>
  setChatData((chatData) => [
    ...chatData,
    {
      time: new Date().toLocaleString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      }),
      text,
      side,
    },
  ]);
