async function FounderPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return (
        <div>
            <h1>Founder {id}</h1>
        </div>
    );
}

export default FounderPage;