import AllContent from '@/components/dashboard/content/AllContent';
import ContentHeader from '@/components/dashboard/content/ContentHeader'
import { getAllContent } from '@/service/content'

export default async function ContentManagement() {
  const contents = await getAllContent();
  return (
    <div>
      <ContentHeader />
      <AllContent contents={contents.data} />
    </div>
  )
}
