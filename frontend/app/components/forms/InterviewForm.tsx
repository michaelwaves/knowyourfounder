"use client"

import { Button } from "@/components/ui/button";
import { createConversation } from "@/lib/tavus/tavus";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";

function InterviewForm({ referenceId, id }: { referenceId: string, id: string }) {
    const [conversationUrl, setConversationUrl] = useState<string | null>(null);
    const iframeRef = useRef<HTMLIFrameElement | null>(null);
    useEffect(() => {
        // Dynamically load the Daily.js script
        const script = document.createElement("script");
        script.src = "https://unpkg.com/@daily-co/daily-js";
        script.async = true;
        script.crossOrigin = "anonymous";
        script.onload = () => {
            console.log("Daily.js loaded");
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleStartConversation = async () => {
        try {
            const res = await createConversation()
            console.log(res)
            const url = res.conversation_url
            setConversationUrl(url)
            toast("Sucessfully created Conversation")
            if (window.Daily && iframeRef.current) {
                const callFrame = window.Daily.createFrame(iframeRef.current);
                callFrame.join({ url });
            }
        } catch (e) {
            console.error(e)
            toast("Error creating conversation")
        }
    }
    return (
        <div>
            <Button
                onClick={handleStartConversation}
            >Start Interview</Button>
            {/* Video call iframe */}
            {conversationUrl && (
                <iframe
                    ref={iframeRef}
                    title="Daily Video Call"
                    className="w-full h-[500px] mt-4 border rounded-lg"
                />
            )}
        </div>
    );
}

export default InterviewForm;