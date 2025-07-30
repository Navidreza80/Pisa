"use client";

import { useEffect, useRef } from "react";

const EndMessage = ({ history }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);
  return <div ref={messagesEndRef} />;
};
export default EndMessage;
