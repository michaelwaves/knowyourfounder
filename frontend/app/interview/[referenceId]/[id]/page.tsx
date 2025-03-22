import { selectOne } from "@/lib/postgres/tables/single";

async function PortalPage({ params }: { params: Promise<{ id: string, referenceId: string }> }) {
    const { id, referenceId } = await params
    const founderData = await selectOne("founders", id)
    return (
        <div>
            <h1>Hello Friend of {founderData.first_name}</h1>
            <p>Tell us what it was like working with {founderData.first_name}</p>
        </div>
    );
}

export default PortalPage;