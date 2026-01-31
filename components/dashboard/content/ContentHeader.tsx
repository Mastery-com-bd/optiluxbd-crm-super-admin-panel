'use client'
import PageHeader from "@/components/shared/pageHeader";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ContentHeader() {
    return (
        <div>
            <div className="flex  justify-between items-center ">
                <PageHeader title='Content Management' description='Manage content from here.' />
                <Link href={"/dashboard/content/create-content"}>
                    <ButtonComponent icon={Plus} buttonName='Create Content' varient="yellow"/>
                </Link>
            </div>
        </div>
    )
}
