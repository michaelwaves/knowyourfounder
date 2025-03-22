"use server";

export async function createConversation() {
    const apiEndpoint = "https://tavusapi.com/v2/conversations";
    const apiKey = process.env.TAVUS_API_KEY; // Store API key securely

    if (!apiKey) {
        throw new Error("Missing API Key");
    }

    const body = {
        replica_id: "r79e1c033f",
        persona_id: "p5317866",
        callback_url: "https://kyc.info/webhook",
        conversation_name: "A Reference for a Founder",
        conversational_context: "",
        custom_greeting: "Hey there!",
        properties: {
            max_call_duration: 60,
            participant_left_timeout: 60,
            participant_absent_timeout: 30,
            enable_recording: false,
            enable_transcription: true,
            apply_greenscreen: true,
            language: "english",
            recording_s3_bucket_name: "conversation-recordings",
            recording_s3_bucket_region: "us-east-1",
            aws_assume_role_arn: "",
        },
    };

    const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
            "x-api-key": apiKey,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        throw new Error(`Error creating conversation: ${response.statusText}`);
    }

    const data = await response.json();
    return data.conversation_url;
}

export async function endConversation(conversationId: string) {
    const apiEndpoint = `https://tavusapi.com/v2/conversations/${conversationId}/end`;
    const apiKey = process.env.TAVUS_API_KEY; // Store API key securely

    if (!apiKey) {
        throw new Error("Missing API Key");
    }

    const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
            "x-api-key": apiKey,
        },
    });

    if (!response.ok) {
        throw new Error(`Error ending conversation: ${response.statusText}`);
    }

    return await response.json();
}