"use client";
import useSearchResource from "@/hooks/resource/useSearchResource";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shadcn/components/ui/select";
import { searchedResourcesAtom, SearchedSortOptions } from "@/state/search-resource.atom";
import { useSearchParams } from 'next/navigation'
import { useRecoilState } from "recoil";
export default function FilterbarSearched() {
    const searchParams = useSearchParams()
    const [{total,sort},setAtom] = useRecoilState(searchedResourcesAtom)
    const search = searchParams.get('search')
    const { mutate,isLoading } = useSearchResource();

    function HandleSortChange(val: SearchedSortOptions ){
      setAtom(e => ({ ...e, sort: val }))
      mutate({sort:val})
    }

  return (
    
      <div className="container px-4 py-6 md:py-8 mx-auto">
      <div className="space-y-8">
        <div className="space-y-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{search}</h1>
          <p className=" md:font-medium text-sm text-muted-foreground">
            Search all the specific keywords to get the better results
          </p>
          
        </div>

        <div className="flex  justify-between items-center gap-4 border-b pb-4">
            {!isLoading&& 
          <div className="text-muted-foreground">
            <span className="font-semibold max-md:text-sm text-foreground">{total}</span> resource(s) found
          </div>
            }
          <div className="flex items-center gap-4">
          <Select disabled={isLoading} value={sort} onValueChange={HandleSortChange}>
  <SelectTrigger className="md:min-w-[180px] max-md:w-[130px] border border-border ring-offset-transparent outline-none ">
    <SelectValue className="hover:!bg-slate-300" />
  </SelectTrigger>
  <SelectContent align="end">
    <SelectItem value="upvotes" className="hover:!bg-muted-foreground">Most Upvoted</SelectItem>
    <SelectItem value="createdAt" className="hover:!bg-muted-foreground">Recent</SelectItem>
  </SelectContent>
</Select>

          </div>
        </div>
      </div>
    </div>
    
  )
}
