import getSongByTitle from "@/actions/getSongByTitle"
import Header from "@/components/Header"
import SearchContent from "@/components/SearchContent"
import Searchinput from "@/components/Searchinput"


interface SearchProps {
    searchParams: {
        title: string
    }
}

export const revalidate =0

const Search = async ({ searchParams }: SearchProps) => {
    const songs = await getSongByTitle(searchParams.title)

    
    
    return(
        <div className="bg-neutral-900 rounded-lg w-full h-full overflow-hidden overeflow-y-auto">
            <Header className="from-bg-neutral-900">
                <div className="mb-2 flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">Search</h1>
                    <Searchinput/>
                </div>
            </Header>
            <SearchContent songs={songs}/>
        </div>
    )

}

export default Search