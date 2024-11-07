import { IResourceSearched } from '@/types/Isearched';
import { atom } from 'recoil';
import { SearchedSortOptions } from './search-resource.atom';
interface IuserProfileResource {
    tabs: "resource" | "saved";
    resources: { count: number, isPrivate: boolean, sort: SearchedSortOptions, resources: { [key: string]: IResourceSearched[] },total:number };
    saved: { count: number, resources: { [key: string]: IResourceSearched[] }, sort: SearchedSortOptions;total:number };
}
export const UserProfileResourceAtom = atom<IuserProfileResource>({
    key: 'user-profile-resources',
    default: {
        tabs: "resource",
        resources: { count: 0, isPrivate: false, sort: "createdAt", resources: {},total:0 },
        saved: { count: 0, resources: {}, sort: "upvotes",total:0 }
    }
});
