import { Request } from "express";
import { Types } from "mongoose"
import { Resource } from "../models/resource.model";
import { SaveList } from "../models/savelist.model";
import { ValidateLogin } from "../middlewares/Authenticate";
import { PipelineStage } from "mongoose";

export async function PopulateResources(req: Request, { query, count = 0, sort, isLogined, allowPrivate }: { query: PipelineStage[], sort: "createdAt" | "upvotes", count: number, isLogined?: boolean, allowPrivate?: boolean }) {
  if (!isLogined) {
    await ValidateLogin(req)
  }

  const userBookmarks =req.userid? (await SaveList.findOne({ user: req.userid }).select("resource").lean())?.resource||[]:[]
  const resources = await Resource.aggregate([
    ...(!allowPrivate ? [{ $match: { isPrivate: false } }] : []),
    ...query,
    {
      $sort: { [sort]: -1 }
    },
    {
      $addFields: {
        isSaved: { $in: ["$_id", userBookmarks] } 
      }
    },
    {
      $project: {
        title: 1,
        createdAt: 1,
        upvotes: 1,
        isSaved:1,
        publisher: 1,
        upvotesDoc: req.userid ? 1 : 0,
        linksLength: {
          $map: {
            input: "$content",
            as: "innerArray",
            in: { $size: "$$innerArray.links" }
          }
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "publisher",
        foreignField: "_id",
        as: "publisher"
      }
    },
    {
      $unwind: "$publisher",
    },
    {
      $unwind: "$linksLength",
    },
    ...(
      req.userid ?
        [{
          $lookup: {
            from: "upvotes",
            localField: "upvotesDoc",
            foreignField: "_id",
            as: "upvotesDoc"
          }
        },
        {
          $unwind: "$upvotesDoc"
        },
        {
          $addFields: {
            isUpvoted: {
              $in: [
                new Types.ObjectId(req.userid),
                "$upvotesDoc.users"
              ]
            }
          }
        },] : [{
          $addFields: {
            isUpvoted: false
          }
        }]
    ),
    {
      $project: {
        title: 1,
        createdAt: 1,
        upvotes: 1,
        isSaved: 1,
        isUpvoted: 1,
        linksLength: 1,
        "publisher.name": 1,
        "publisher.picture": 1
      }
    },
    { $skip: count * 10 },
    { $limit: 10 }
  ]);
  return resources
}