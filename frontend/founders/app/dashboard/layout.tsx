import Navbar from "../components/NavBar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row gap-4">
            <Navbar />
            {children}
        </div>
    );
}

export default DashboardLayout;