"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TicketMessages } from "@/types/support";
import { Eye, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getCurrentUser } from "@/service/authService";
import { replyTicketMessage } from "@/service/support";
import { toast } from "sonner";

export default function MessageDialog({ id, messages, }: { id: number, messages: TicketMessages }) {
    const [reply, setReply] = useState<string>("");
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const [isSending, setIsSending] = useState<boolean>(false);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getCurrentUser();
            if (user) {
                setCurrentUserId(user.userId);
            }
        };
        fetchUser();
    }, []);

    const handleSendMessage = async () => {
        if (reply.trim() && !isSending) {
            setIsSending(true);
            const toastId = toast.loading("Sending message...");

            try {
                const res = await replyTicketMessage(id, { message: reply });

                if (res.success) {
                    toast.success("Message sent successfully", { id: toastId });
                    setReply("");
                    // Optionally refresh messages or update state
                } else {
                    toast.error(res.message || "Failed to send message", { id: toastId });
                }
            } catch (error) {
                toast.error("An unexpected error occurred", { id: toastId });
                console.error("Error sending message:", error);
            } finally {
                setIsSending(false);
            }
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Eye className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="max-w-xl! h-150 flex flex-col">
                    <DialogHeader>
                        <DialogTitle>All Messages</DialogTitle>
                    </DialogHeader>

                    {/* Messages Container */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages?.map((msg, index) => {
                            const isCurrentUser = msg.sender.id === currentUserId;

                            return (
                                <div
                                    key={index}
                                    className={`flex gap-3 ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}
                                >
                                    {/* Avatar */}
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={msg.sender.avatar_secure_url || undefined} />
                                        <AvatarFallback className="text-xs">
                                            {getInitials(msg.sender.name)}
                                        </AvatarFallback>
                                    </Avatar>

                                    {/* Message Content */}
                                    <div
                                        className={`flex flex-col max-w-[70%] ${isCurrentUser ? "items-end" : "items-start"
                                            }`}
                                    >
                                        <div
                                            className={`rounded-lg px-4 py-2 ${isCurrentUser
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-muted"
                                                }`}
                                        >
                                            <p className="text-sm">{msg.message}</p>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs text-muted-foreground">
                                                {msg.sender.name}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {formatTime(msg.createdAt)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Input Section */}
                    <div className="flex items-center gap-3 p-4 border-t">
                        <Input
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === "Enter") {
                                    handleSendMessage();
                                }
                            }}
                            placeholder="Type your message..."
                            className="flex-1"
                        />
                        <div
                            onClick={handleSendMessage}
                            className={`p-2 flex justify-center items-center rounded-md cursor-pointer transition-colors ${reply.trim()
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                                }`}
                        >
                            <Send className="size-5" />
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}