"use client"

import { Button } from "@/components/ui/button";
import { createConversation, endConversation, getTranscript } from "@/lib/tavus/tavus";
import { useState } from "react";
import { toast } from "sonner";

function InterviewForm({ referenceId, id }: { referenceId: string, id: string }) {

    const [url, setUrl] = useState<string | null>(null)
    const [transcript, setTranscript] = useState<any>();
    const handleStartConversation = async () => {
        try {
            const res = await createConversation()
            window.open(res, "_blank", "noopener,noreferrer"); // Open in new tab
            setUrl(res)
            toast("Sucessfully created Conversation")
        } catch (e) {
            console.error(e)
            toast("Error creating conversation")
        }
    }

    const handleEndConversation = async () => {
        try {
            if (!url) {
                return
            }
            const conversationId = url.split("/").at(-1)
            const res = await endConversation(conversationId ?? "")
            toast("Sucessfully ending Conversation")
        } catch (e) {
            console.error(e)
            toast("Error ending conversation")
        }
    }

    const handleSubmitConversation = async () => {
        const res = await getTranscript("c5cfe8e3cffa")
        console.log(res)
        const index = res.events.findIndex((event: any) => event.event_type === "application.transcription_ready");

        if (index !== -1) {
            const myTranscript = res.events[index].properties.transcript;
            console.log(myTranscript);
            setTranscript(myTranscript);
        } else {
            console.log("No transcription event found");
            setTranscript("No transcription events found");
        }


    }
    return (
        <div>
            <Button
                onClick={handleStartConversation}
            >Start Interview</Button>
            {url && <Button variant="destructive"
                onClick={handleEndConversation}
            >End Call</Button>}
            <Button
                onClick={handleSubmitConversation}
            >Submit Reference</Button>
            {JSON.stringify(transcript)}
        </div>
    );
}

export default InterviewForm;