import { useRef, useEffect } from "react";
import Avatar from "../Avatar";
import MessageGroup from "../MessageGroup";
import { useContext } from "react";
import { chatContext } from "../../../global/state";

const Approach1 = ({ onMessage }) => {
  const { chatData, currentApproach } = useContext(chatContext);
  const messagesPanelRef = useRef(null);

  const scrollToBottom = () => {
    messagesPanelRef.current?.scrollTop = messagesPanelRef.current?.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatData]);

  return (
    <div className={"messagesPanelWrapper"} ref={messagesPanelRef}>
      {/* TODO: Create For Loop */}
      {/* All messages */}
      {chatData.map((data) => (
        <MessageGroup
          side={data?.side}
          messages={[data]}
          time={new Date().toLocaleString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          })}
          key={Math.random()}
          avatarElement={
            <Avatar
              imageURI={`/assets/images/approaches/${currentApproach}.svg`}
              status="online"
              title={"man"}
            />
          }
        />
      ))}
      <div />
    </div>
  );
};

const getMessageGroups = (messages) => {
  const returner = [];
  let previousMessageSide;
  let tempReturner;

  messages.forEach((message) => {
    if (previousMessageSide !== message.side) {
      // Append previous side to returner
      if (tempReturner)
        returner.push({ group: tempReturner, side: tempReturner[0].side });

      // Create new temp returner
      tempReturner = [message];
      previousMessageSide = message.side;
    } else {
      tempReturner.push(message);
    }
  });

  return returner;
};

export default Approach1;
