"use client";

import React from "react";
import { Github, Linkedin } from "lucide-react";

interface FounderData {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    linkedin_url: string;
    github_url: string;
    date_of_birth: string;
    nationality: string;
    address: string;
    company_id: number;
    company_name: string;
    is_pep: boolean;
    is_sanctioned: boolean;
    risk_score: number;
    recommendation: string;
    next_review_date: string;
    tavus_url: string;
    portal_url: string;
    tavus_conversation_id: string;
    status: string;
    created_at: string;
    created_by: string;
    organization_id: string;
}

interface FounderCardProps {
    founder: FounderData;
}

const FounderCard: React.FC<FounderCardProps> = ({ founder }) => {
    return (
        <div className="p-6 border rounded-lg shadow-sm bg-white space-y-6">
            {/* Basic Information and Social Links */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">
                        {founder.first_name} {founder.last_name}
                    </h2>
                    <p className="text-gray-600">{founder.email}</p>
                    <p className="text-gray-600">{founder.phone}</p>
                </div>
                <div className="flex space-x-3">
                    {founder.linkedin_url && (
                        <a
                            href={founder.linkedin_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                        >
                            <Linkedin className="w-6 h-6" />
                        </a>
                    )}
                    {founder.github_url && (
                        <a
                            href={founder.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-800 hover:text-black"
                        >
                            <Github className="w-6 h-6" />
                        </a>
                    )}
                </div>
            </div>

            {/* Personal Details */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold border-b pb-1">Personal Details</h3>
                <p>
                    <span className="font-medium">Date of Birth:</span> {founder.date_of_birth}
                </p>
                <p>
                    <span className="font-medium">Nationality:</span> {founder.nationality}
                </p>
                <p>
                    <span className="font-medium">Address:</span> {founder.address}
                </p>
            </div>
            {/* 
            
            <div className="space-y-2">
                <h3 className="text-lg font-semibold border-b pb-1">Company Information</h3>
                <p>
                    <span className="font-medium">Company:</span> {founder.company_name}
                </p>
            </div>
 */}
            {/* Compliance & Risk */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold border-b pb-1">Compliance & Risk</h3>
                <p>
                    <span className="font-medium">PEP:</span> {founder.is_pep ? "Yes" : "No"}
                </p>
                <p>
                    <span className="font-medium">Sanctioned:</span> {founder.is_sanctioned ? "Yes" : "No"}
                </p>
                <p>
                    <span className="font-medium">Risk Score:</span> {founder.risk_score}
                </p>
                <p>
                    <span className="font-medium">Recommendation:</span> {founder.recommendation}
                </p>
                <p>
                    <span className="font-medium">Next Review Date:</span> {founder.next_review_date}
                </p>
            </div>

            {/* Platform Information */}
            {/*  <div className="space-y-2">
                <h3 className="text-lg font-semibold border-b pb-1">Platform Info</h3>
                <p>
                    <span className="font-medium">Tavus URL:</span> {founder.tavus_url}
                </p>
                <p>
                    <span className="font-medium">Portal URL:</span> {founder.portal_url}
                </p>
                <p>
                    <span className="font-medium">Conversation ID:</span> {founder.tavus_conversation_id}
                </p>
            </div> */}

            {/* System Details */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold border-b pb-1">System Details</h3>
                <p>
                    <span className="font-medium">Status:</span> {founder.status}
                </p>
                <p>
                    <span className="font-medium">Created At:</span> {new Date(founder.created_at).toLocaleString()}
                </p>
                <p>
                    <span className="font-medium">Created By:</span> {founder.created_by}
                </p>
                <p>
                    <span className="font-medium">Organization ID:</span> {founder.organization_id}
                </p>
            </div>
        </div>
    );
};

export default FounderCard;
