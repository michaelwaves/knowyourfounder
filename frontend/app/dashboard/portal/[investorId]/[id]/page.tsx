import { selectOne } from "@/lib/postgres/tables/single";

async function PortalPage({ params }: { params: Promise<{ id: string, investorId: string }> }) {
    const { id, investorId } = await params
    const founderData = await selectOne("founders", id)
    return (
        <div>
            <h1>Hello {founderData.first_name}, let's get to know you</h1>
            <p>Fill in the details below to fulfill due diligence requirements</p>
        </div>
    );
}

export default PortalPage;