import { fetchLinkedInProfile } from "@/lib/linkedIn/linkedIn";
import { selectOne } from "@/lib/postgres/tables/single";

async function FounderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const founderData = await selectOne('founders', id)
    console.log(founderData)
    console.log(founderData.linkedin_url)
    const linkedInData = await fetchLinkedInProfile(founderData.linkedin_url)
    return (
        <div>
            <h1>Founder {id}</h1>
            {JSON.stringify(linkedInData)}
        </div>
    );
}

export default FounderPage;