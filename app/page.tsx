import { CPSManagementPage } from "@/components/cps-management-page"

interface PageProps {
  searchParams: Promise<{ new?: string }>
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams
  return <CPSManagementPage initialNewParam={params.new || null} />
}
