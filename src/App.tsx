import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Conversation from "./Conversation";
import { MessageItem } from "./MessageItem";
import Sidebar from "./Sidebar";
import { WebSocketConnector } from "./WebSocketConnector";
import Welcome from "./Welcome";

const WS_URL = "wss://0q4bb2oi5i.execute-api.us-east-1.amazonaws.com/dev";
const connector = new WebSocketConnector();

function App() {
  const [nickname, setNickname] = useState<string>(
    window.localStorage.getItem("nickname") || ""
  );
  const [clients, setClients] = useState<string[]>([]);
  const [target, setTarget] = useState<string>(
    window.localStorage.getItem("lastTarget") || ""
  );
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const webSocket = useRef(connector);

  const loadMessages = (target: string) => {
    webSocket.current.getConnection(url).send(
      JSON.stringify({
        action: "getMessages",
        targetNickname: target,
        limit: 1000,
      })
    );
  };

  const setNewTarget = (target: string) => {
    setTarget(target);
    setMessages([]);
    loadMessages(target);
  };

  useEffect(() => {
    window.localStorage.setItem("nickname", nickname);
    window.localStorage.setItem("lastTarget", target);
  });

  if (nickname === "") {
    return (
      <Welcome
        setNickname={(nickname) => {
          setNickname(nickname);
          if (target === "") {
            setTarget(nickname);
          }
        }}
      />
    );
  }

  const url = `${WS_URL}?nickname=${nickname}`;
  const ws = webSocket.current.getConnection(url);

  ws.onmessage = (event) => {
    const msg = JSON.parse(event.data) as {
      type: string;
      value: unknown;
    };
    console.log(msg);
    if (msg.type === "clients") {
      setClients(
        (msg.value as { nickname: string }[]).map((c) => c.nickname).sort()
      );
    }

    if (msg.type === "messages") {
      const body = msg.value as {
        messages: MessageItem[];
        lastEvaluatedKey: unknown;
      };

      setMessages([...body.messages.reverse(), ...messages]);
    }

    if (msg.type === "message") {
      const item = msg.value as MessageItem;
      if (item.sender === nickname || item.sender !== target) {
        return;
      }
      setMessages([...messages, item]);
    }
  };

  ws.onopen = () => {
    webSocket.current
      .getConnection(url)
      .send(JSON.stringify({ action: "getClients" }));

    loadMessages(target);
  };

  const sendMessage = (value: string) => {
    webSocket.current.getConnection(url).send(
      JSON.stringify({
        action: "sendMessage",
        recipientNickname: target,
        message: value,
      })
    );
    setMessages([
      ...messages,
      {
        message: value,
        sender: nickname,
      },
    ]);
  };

  return (
    <div className="flex">
        <Sidebar
          me={nickname}
          clients={clients}
          setTarget={(target) => setNewTarget(target)}
        />
      <div className="flex-auto">
        <Conversation
          target={target}
          messages={messages}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
}

export default App;
