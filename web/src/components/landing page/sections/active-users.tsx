import React from "react";
import HeadingComp from "../components/heading-comp";

import { Card, CardContent } from "@/shadcn/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/shadcn/components/ui/avatar";
import { AnimatedTooltip } from "@/shadcn/components/ui/animated-tooltip";
import useLoadUsersFeed from "@/hooks/feed/useLoadUserFeed";
import ResourceLoader from "../loader/resource-loader";

export default function ActiveUsers() {
  const { isLoading, data } = useLoadUsersFeed();
  if (isLoading) return <ResourceLoader />;
  const users = data?.payload;
  return (
    <>
      <HeadingComp text={"🚀 Active users"} />
      <Card className="w-full max-w-full bg-transparent border-none shadow-none">
        <CardContent>
          <section className="flex flex-wrap justify-between gap-y-3">
            {users?.slice(0, 4)?.map(({ user, top_posts, upvotes }) => (
              <div
                key={user._id}
                className="flex items-center gap-3 py-4 w-[48%] bg-secondary px-5 rounded-md"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={user.picture || "/user.png"}
                    alt={user.name}
                  />
                  <AvatarFallback className="bg-secondary-foreground text-white font-semibold">
                    {user.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 ">
                  <p className="text-sm font-semibold leading-none">
                    {user.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {user.headline} {top_posts} {upvotes}
                  </p>
                </div>
                <div className="flex " />
                <button className="text-sm text-white transition-colors duration-200 bg-primary hover:bg-primary-dark rounded-md py-1 px-2">
                  Follow
                </button>
              </div>
            ))}
          </section>
          <section className="center py-4 gap-2 font-semibold">
            <AnimatedTooltip
              items={users
                ?.slice(4,8).map((e,i)=> ({
                  name: e.user.name,
                  image: e.user.picture || "/user.png",
                  designation: e.user.headline,
                  id: i,
                }))||[]}
            ></AnimatedTooltip>
            { users && (users?.length-8) > 0 && <p>+{users?.length-8} more</p>}
          </section>
        </CardContent>
      </Card>
    </>
  );
}
