"use client"

import { Button } from "@/components/ui/button";
import { updateOne } from "@/lib/postgres/tables/single";
import { createConversation, endConversation, getTranscript } from "@/lib/tavus/tavus";
import { useState } from "react";
import { toast } from "sonner";

function InterviewForm({ referenceId, id }: { referenceId: string, id: string }) {

    const [url, setUrl] = useState<string | null>(null);
    const [transcript, setTranscript] = useState<any>();
    const [conversationId, setConversationId] = useState<string | null>();
    const handleStartConversation = async () => {
        try {
            const res = await createConversation()
            window.open(res, "_blank", "noopener,noreferrer"); // Open in new tab
            setUrl(res)
            const convId = res.split("/").at(-1)
            setConversationId(convId)
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

            const res = await endConversation(conversationId ?? "")
            toast("Sucessfully ending Conversation")
        } catch (e) {
            console.error(e)
            toast("Error ending conversation")
        }
    }

    const handleSubmitConversation = async () => {
        const res = await getTranscript(conversationId ?? "")
        console.log(res)
        const index = res.events.findIndex((event: any) => event.event_type === "application.transcription_ready");

        let myTranscript;
        if (index !== -1) {
            myTranscript = res.events[index].properties.transcript;
            console.log(myTranscript);
            setTranscript(myTranscript);
        } else {
            console.log("No transcription event found");
            setTranscript("No transcription events found");
        }

        const updateFriendRes = await updateOne("friends", referenceId, {
            status: "interview completed",
            tavus_transcript: myTranscript,
            tavus_conversation_id: conversationId
        })

        console.log(updateFriendRes)


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