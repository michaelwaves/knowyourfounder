import { fetchLinkedInProfile } from "@/lib/linkedIn/linkedIn";
import { selectOne } from "@/lib/postgres/tables/single";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apikey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI("AIzaSyC_Xwd5nEpWvjAFjxuRQh07r71kTflyl_o");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function FounderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const founderData = await selectOne('founders', id);
    console.log(founderData);
    console.log(founderData.linkedin_url);
    
    // Fetch LinkedIn data
    const linkedInData = await fetchLinkedInProfile(founderData.linkedin_url);

    // Fallback if linkedInData is undefined
    const prompt = `
        Summarize the user's LinkedIn experience and trends based on the following details: 
        ${JSON.stringify(linkedInData, null, 2) || 'No LinkedIn data available.'}
        The goal is to summarize their professional journey and highlight any trends that may emerge from their experience, job history, or skillset.
    `;
    
    // Generate content based on the prompt
    const result = await model.generateContent(prompt);

    // Log the entire result to inspect its structure
    console.log(result);
    //const contentToRender = result.content;
    const text = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated.";

    return (
        <div className="pt-4">
            <h1>Founder {id}</h1>
            <h2>Summary of Experiences</h2>
            <p className="whitespace-normal break-words">{text}</p>
            <pre>{JSON.stringify(linkedInData, null, 2)}</pre> {/* Display LinkedIn data */}
        </div>
    );
}

export default FounderPage;
