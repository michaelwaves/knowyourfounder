"use client"
import React from "react";

interface TranscriptMessage {
    content: string;
    role: string;
}

interface Reference {
    id: string;
    name: string;
    email: string;
    status: string;
    founder_id: string;
    tavus_conversation_id: string;
    created_at: string;
    organization_id: string;
    created_by: string;
    tavus_transcript: string[];
}

interface RenderReferencesProps {
    references: Reference[];
}

const RenderReferences: React.FC<RenderReferencesProps> = ({ references }) => {
    console.log(references)
    return (
        <div className="space-y-8">
            {references.map((ref) => (
                <div>
                    {JSON.stringify(ref)}
                </div>
            ))}
        </div>
    );
};

export default RenderReferences;
