"use server";

export async function fetchLinkedInProfile(linkedinUrl: string) {
    const apiEndpoint = "https://nubela.co/proxycurl/api/v2/linkedin";
    const apiKey = process.env.PROXYCURL_API_KEY; // Store API key in env

    if (!apiKey) {
        throw new Error("Missing API Key");
    }

    const response = await fetch(`${apiEndpoint}?url=${encodeURIComponent(linkedinUrl)}&skills=include`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${apiKey}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching LinkedIn profile: ${response.statusText}`);
    }

    return await response.json();
}