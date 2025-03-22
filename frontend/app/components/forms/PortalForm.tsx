"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateOne } from "@/lib/postgres/tables/single";
import { Check, Loader } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

function PortalForm({ id, investorId, founderData }: { id: string, investorId: string, founderData: any }) {
    const { email, phone, first_name, last_name } = founderData;
    console.log(founderData)
    const form = useForm({
        defaultValues: {
            // Existing details to verify
            email,
            phone,
            first_name,
            last_name,

            // Additional founder details to be edited
            linkedin_url: "",
            github_url: "",
            date_of_birth: "",
            nationality: "",
            address: "",
            is_pep: false,
            is_sanctioned: false,
        },
    });

    const { handleSubmit, register, formState } = form;
    const { errors, isSubmitting, isSubmitted } = formState;

    const onSubmit = async (data: any) => {
        try {
            const fullData = { ...data, status: "form completed" };
            await updateOne("founders", id, fullData);
            toast("Successfully updated founder details");
        } catch (e) {
            console.error(e);
            toast("Error updating founder");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4 border rounded-lg shadow-sm">
            {/* ✅ Verification Section */}
            <div className="p-4 border-b">
                <h3 className="text-lg font-semibold mb-2">Verify the details are correct</h3>

                <div className="grid gap-4">
                    <div>
                        <Label>First Name</Label>
                        <Input {...register("first_name", { required: "First name is required" })} />
                    </div>

                    <div>
                        <Label>Last Name</Label>
                        <Input {...register("last_name", { required: "Last name is required" })} />
                    </div>

                    <div>
                        <Label>Email</Label>
                        <Input type="email" {...register("email", { required: "Email is required" })} />
                    </div>

                    <div>
                        <Label>Phone</Label>
                        <Input type="phone" {...register("phone", { required: "Phone number is required" })} />
                    </div>
                </div>
            </div>

            {/* ✏️ Editable Fields Section */}
            <div className="p-4 space-y-4">
                <h3 className="text-lg font-semibold">Additional Details</h3>

                <div className="grid gap-4">
                    <div>
                        <Label>LinkedIn URL</Label>
                        <Input placeholder="https://linkedin.com/in/username" {...register("linkedin_url")} />
                    </div>

                    <div>
                        <Label>GitHub URL</Label>
                        <Input placeholder="https://github.com/username" {...register("github_url")} />
                    </div>

                    <div>
                        <Label>Date of Birth</Label>
                        <Input type="date" {...register("date_of_birth")} />
                    </div>

                    <div>
                        <Label>Nationality</Label>
                        <Input placeholder="Country of nationality" {...register("nationality")} />
                    </div>

                    <div>
                        <Label>Address</Label>
                        <Textarea placeholder="Enter address..." {...register("address")} />
                    </div>

                    <div className="flex items-center gap-2">
                        <Label>Politically Exposed Person (PEP)</Label>
                        <Switch {...register("is_pep")} />
                    </div>

                    <div className="flex items-center gap-2">
                        <Label>Sanctioned</Label>
                        <Switch {...register("is_sanctioned")} />
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <Button disabled={isSubmitting} type="submit" className="w-full">
                {isSubmitting ? <Loader className="animate-spin" /> : "Submit"}
                {isSubmitted && <Check className="ml-2 text-green-500" />}
            </Button>
        </form>
    );
}

export default PortalForm;
