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
    return (
        <div className="space-y-8">
            {references.map((ref) => (
                <div key={ref.id} className="border p-6 rounded-lg shadow-sm bg-white">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold">{ref.name}</h2>
                        <p className="text-gray-600">{ref.email}</p>
                        <p className="text-sm text-gray-500">{ref.status}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Transcript</h3>
                        <div className="space-y-3">
                            {ref.tavus_transcript && ref.tavus_transcript.map((transcriptStr, idx) => {
                                let message: TranscriptMessage;
                                try {
                                    message = JSON.parse(transcriptStr);
                                } catch (err) {
                                    return (
                                        <div key={idx} className="text-red-500">
                                            Error parsing transcript.
                                        </div>
                                    );
                                }
                                return (
                                    <div
                                        key={idx}
                                        className="p-3 border rounded bg-gray-50 flex flex-col space-y-1"
                                    >
                                        <span className="font-semibold text-gray-700">
                                            {message.role}:
                                        </span>
                                        <span className="text-gray-800">{message.content}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RenderReferences;
