import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
    const { messages, loading } = useGetMessages();
    return (
        <div className="px-4 flex-1 overflow-auto">
            {/* if there are messages */}
            {!loading &&
                messages.length > 0 &&
                messages.map((message, idx) => (
                    <Message message={message} key={idx} />
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
