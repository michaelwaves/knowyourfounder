"use client";

import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { updateOne } from "@/lib/postgres/tables/single";
import { batchCreate } from "@/lib/postgres/tables/batch";
function PortalForm({ id, investorId, founderData }: { id: string; investorId: string; founderData: any }) {
    const { email, phone, first_name, last_name } = founderData;

    const form = useForm({
        defaultValues: {
            email,
            phone,
            first_name,
            last_name,
            linkedin_url: "",
            github_url: "",
            date_of_birth: "",
            nationality: "",
            address: "",
            is_pep: false,
            is_sanctioned: false,

            friends: [{ name: "", email: "" }],
        },
    });

    const { handleSubmit, register, control, formState } = form;
    const { errors, isSubmitting, isSubmitted } = formState;

    const { fields, append, remove } = useFieldArray({
        control,
        name: "friends",
    });

    const onSubmit = async (data: any) => {
        try {
            // Remove friends from submission
            const { friends, ...founderDetails } = data;
            const fullData = { ...founderDetails, status: "form completed" };
            await updateOne("founders", id, fullData);

            // Store friends separately
            const fullFriendsData = friends.map((friend: any) => ({
                ...friend,
                founder_id: id,
            }));
            await batchCreate(fullFriendsData, "friends", investorId);

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
                        <label>First Name</label>
                        <Input {...register("first_name", { required: "First name is required" })} />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <Input {...register("last_name", { required: "Last name is required" })} />
                    </div>
                    <div>
                        <label>Email</label>
                        <Input type="email" {...register("email", { required: "Email is required" })} />
                    </div>
                    <div>
                        <label>Phone</label>
                        <Input type="phone" {...register("phone", { required: "Phone number is required" })} />
                    </div>
                </div>
            </div>

            {/* ✏️ Editable Fields Section */}
            <div className="p-4 space-y-4">
                <h3 className="text-lg font-semibold">Additional Details</h3>
                <div className="grid gap-4">
                    <div>
                        <label>LinkedIn URL</label>
                        <Input placeholder="https://linkedin.com/in/username" {...register("linkedin_url")} />
                    </div>
                    <div>
                        <label>GitHub URL</label>
                        <Input placeholder="https://github.com/username" {...register("github_url")} />
                    </div>
                    <div>
                        <label>Date of Birth</label>
                        <Input type="date" {...register("date_of_birth")} />
                    </div>
                    <div>
                        <label>Nationality</label>
                        <Input placeholder="Country of nationality" {...register("nationality")} />
                    </div>
                    <div>
                        <label>Address</label>
                        <Textarea placeholder="Enter address..." {...register("address")} />
                    </div>
                    <div className="flex items-center gap-2">
                        <label>Politically Exposed Person (PEP)</label>
                        <Switch {...register("is_pep")} />
                    </div>
                    <div className="flex items-center gap-2">
                        <label>Sanctioned</label>
                        <Switch {...register("is_sanctioned")} />
                    </div>
                </div>
            </div>

            {/* 👥 Friends Field Array Section */}
            <div className="p-4 border-t">
                <h3 className="text-lg font-semibold mb-2">Friends</h3>
                {fields.map((friend, index) => (
                    <div key={friend.id} className="flex gap-4 mb-2">
                        <Input placeholder="Name" {...register(`friends.${index}.name`, { required: "Name is required" })} />
                        <Input type="email" placeholder="Email" {...register(`friends.${index}.email`, { required: "Email is required" })} />
                        <Button type="button" variant="destructive" onClick={() => remove(index)}>
                            Remove
                        </Button>
                    </div>
                ))}
                <Button type="button" variant="secondary" onClick={() => append({ name: "", email: "" })}>
                    + Add Friend
                </Button>
            </div>

            {/* Submit Button */}
            <Button disabled={isSubmitting} type="submit" className="w-full">
                {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
        </form>
    );
}

export default PortalForm;
