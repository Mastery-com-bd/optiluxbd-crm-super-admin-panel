import ContentDetails from "@/components/dashboard/content/ContentDetails";
import PageHeader from "@/components/shared/pageHeader";
import { getContentById } from "@/service/content";

export default async function SingleContent({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const content = await getContentById(id);
    return (
        <div>
            <PageHeader title="Content Details" description="the quick brown fox" />
            <ContentDetails content={content.data} />
        </div>
    )
}
