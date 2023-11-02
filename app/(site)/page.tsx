import getSong from "@/actions/getSong";
import Header from "@/components/Header";
import ListItems from "@/components/ListItems";
import PageContent from "./components/PageContent";
export const revalidate = 0
export default async function Home() {

  const songs = await getSong()

  return (
    <div className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-x-auto">
      <Header>
        <div className="mb-2">
          <h1 className="text-2xl font-semibold text-white">
            welcome Back
          </h1>
          <div className="grid grid-col-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
            <ListItems image="/images/liked.png" name="Like Songs" href="/" />
          </div>
        </div>
      </Header>
      <div className="mt-3 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-white">
            Newst Song
          </h1>

        </div>
        <div>
          <PageContent songs={songs}/>
        </div>
      </div>
    </div>
  )
}
