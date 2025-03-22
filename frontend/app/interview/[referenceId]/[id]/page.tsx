import InterviewForm from "@/app/components/forms/InterviewForm";
import { selectOne } from "@/lib/postgres/tables/single";

async function PortalPage({ params }: { params: Promise<{ id: string, referenceId: string }> }) {
    const { id, referenceId } = await params
    const founderData = await selectOne("founders", id)
    return (
        <div className="flex flex-col p-6 gap-y-6">
            <h1 className="text-3xl font-semibold">Hello Friend of {founderData.first_name}</h1>
            <p className="text-lg text-gray-600">Tell us what it was like working with {founderData.first_name}</p>
            <InterviewForm referenceId={referenceId} id={id} />
        </div>
    );
}

export default PortalPage;