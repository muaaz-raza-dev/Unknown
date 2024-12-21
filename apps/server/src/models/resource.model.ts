import mongoose, { Query, Types } from 'mongoose';
import { Iupvote } from './upvote.model';
import { Iuser } from './user.model';
import { Itags } from './tag.model';
import { IResourceLink } from './link.model';

const resourceSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        unique:false,
        text:true,
    },
    views:{ref:"User",type:[mongoose.Types.ObjectId]},
    description:String,
    tags: {
        type: [mongoose.Types.ObjectId],
        ref:"Tags"
    },
    publisher:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
    upvotes:{
        type: Number,
        default: 0
    },
    upvotesDoc:{type:mongoose.Types.ObjectId,ref:"Upvotes"},
    banner:String,
    content:[
        {
            label:String,
            links:{type:[Types.ObjectId],ref:"ResourceLink"}
        }
    ],
    isDeleted:{type:Boolean,default:false},
    isPrivate:{type:Boolean,default:false}
}, { timestamps: true });


export interface IResource extends mongoose.Document {
    views: any;
    title: string;
    tags: mongoose.Types.ObjectId[]|Itags[];
    publisher: string | Iuser;
    upvotes: number;
    content: Array<{
        label: string;
        links:Types.ObjectId[] | IResourceLink[];
    }>;
    upvotesDoc:mongoose.Types.ObjectId | Iupvote,
    createdAt: Date;
    isDeleted:boolean,
    updatedAt: Date;
    isPrivate:boolean;
}
resourceSchema.pre(/^find/,function (this: Query<any, any>, next) {
    this.where({ isDeleted: false });
    next();
});
  
export const Resource = mongoose.model<IResource>('resource', resourceSchema);
