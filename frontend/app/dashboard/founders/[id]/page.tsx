import { fetchLinkedInProfile } from "@/lib/linkedIn/linkedIn";
import { getFriendsFromFounder } from "@/lib/postgres/tables/friends";
import { selectOne } from "@/lib/postgres/tables/single";
import { GoogleGenerativeAI } from "@google/generative-ai";
import RenderReferences from "./RenderReferences";

const apikey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI("AIzaSyC_Xwd5nEpWvjAFjxuRQh07r71kTflyl_o");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

async function FounderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const references = await getFriendsFromFounder(id)
    console.log(references)
    const founderData = await selectOne('founders', id);
    console.log(founderData);
    console.log(founderData.linkedin_url);

    // Fetch LinkedIn data
    //const linkedInData = await fetchLinkedInProfile(founderData.linkedin_url);

    // Fallback if linkedInData is undefined
    /*  const prompt = `
         Summarize the user's LinkedIn experience and trends based on the following details: 
         ${linkedInData || 'No LinkedIn data available.'}
         The goal is to summarize their professional journey and highlight any trends that may emerge from their experience, job history, or skillset.
     `; */

    console.log(references)
    const promptReferences = `
    Summarize the user's References from friends based on the following transcripts and identify any red flags or positive qualities,
    in the context of helping an investor decide whether or not to invest:
${JSON.stringify(references)}
    `

    // Generate content based on the prompt
    const result = await model.generateContent(promptReferences);

    // Log the entire result to inspect its structure
    console.log(result);
    //const contentToRender = result.content;
    const text = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || "No content generated.";

    return (
        <div className="pt-4">
            <h1>Founder {id}</h1>
            <h2>Summary of References</h2>
            {JSON.stringify(result)}
            {/* <RenderReferences references={references} /> */}
        </div>
    );
}

export default FounderPage;
