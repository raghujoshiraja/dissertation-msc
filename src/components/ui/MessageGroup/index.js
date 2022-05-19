import styles from "./index.module.scss";
import { motion } from "framer-motion";

// Messages schema
// [{ text, time }]

const MessageGroup = ({ side, avatarElement, messages, time }) => {
  return (
    <div className={styles.wrapper}>
      {/* Avatar */}
      {side === "left" && (
        <div className={styles.avatarWrapper}>
          {avatarElement}
          <text className={styles.time}>{time}</text>
        </div>
      )}

      {/* Messages */}
      <motion.div
        inital={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.3 }}
        className={styles.messagesWrapper}
      >
        {messages?.map((message, index) => (
          <div
            className={[
              styles.message,
              { left: styles.left, right: styles.right }[side],
            ].join(" ")}
            key={index}
          >
            <div className={styles.messageText}>{message.text}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MessageGroup;
