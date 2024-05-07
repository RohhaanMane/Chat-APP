import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
    const { messages, loading } = useGetMessages();

    const lastMessageRef = useRef();

    // always scroll to letestMessge in chat
    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    return (
        <div className="px-4 flex-1 overflow-auto">
            {/* if there are messages */}
            {!loading &&
                messages.length > 0 &&
                messages.map((message) => (
                    <div key={message._id} ref={lastMessageRef}>
                        <Message message={message} />
                    </div>
                ))}
            {/* for message skeleton load */}
            {loading &&
                [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

            {/* After loading if there are no messages (no conversation between you and other user) */}
            {!loading && messages.length === 0 && (
                <p className="text-center mt-3">
                    Send a message to start the conversation
                </p>
            )}
        </div>
    );
};

export default Messages;
