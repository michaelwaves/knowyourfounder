"use client"

import { Button } from "@/components/ui/button";
import { createConversation } from "@/lib/tavus/tavus";
import { toast } from "sonner";

function InterviewForm({ referenceId, id }: { referenceId: string, id: string }) {
    const handleStartConversation = async () => {
        try {
            const res = await createConversation()
            console.log(res)
            toast("Sucessfully created Conversation")
        } catch (e) {
            console.error(e)
            toast("Error creating conversation")
        }
    }
    return (
        <div>
            <Button
                onClick={createConversation}
            >Start Interview</Button>

        </div>
    );
}

export default InterviewForm;