"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendClientPortalEmail } from "@/lib/aws/ses/sendEmail";
import { createOne } from "@/lib/postgres/tables/single";
import { useStytchMember } from "@stytch/nextjs/b2b";
import { Check, Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function FounderForm() {
    const { member } = useStytchMember()
    const form = useForm({
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone: ""
        }
    });

    const { handleSubmit, register } = form

    const onSubmit = async (data: any) => {
        try {
            const fullData = {
                ...data,
                status: "email sent",
                created_by: member?.member_id,
                organization_id: member?.organization_id,
            }
            await createOne('founders', fullData)
            await sendClientPortalEmail(
                data.email,
                `Hello ${data.first_name}, Complete Know Your Founder Check Today`,
                data.first_name,
                'http://localhost:3000'
            )
            toast("Successfully created founder and sent email")
        } catch (e) {
            console.error(e)
            toast("Error creating founder")
        }

    }

    const { errors, isSubmitting, isSubmitted } = form.formState
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
                placeholder="First Name"
                {...register("first_name", { required: "First name is required" })}
            />
            {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}

            <Input
                placeholder="Last Name"
                {...register("last_name", { required: "Last name is required" })}
            />
            {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}

            <Input
                placeholder="Founder's Email"
                type="email"
                {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <Input
                placeholder="Phone"
                type="phone"
                {...register("phone", { required: "Phone number is required" })}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}

            <Button disabled={isSubmitting} type="submit" className="w-full">
                {isSubmitting ? <Loader className="animate-spin" /> : "Submit"}
                {isSubmitted && <Check className="ml-2 text-green-500" />}
            </Button>
        </form>
    );
}

export default FounderForm;