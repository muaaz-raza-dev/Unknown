import React from "react";
import { FaClock, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import NewLinkDailogResourceForm from "./new-link-dailog-resource-form";
import { useFormContext } from "react-hook-form";
import { IResource } from "@/types/Iresource";
import { Tooltip } from "antd";
export default function LinksComponentResourceForm({
  index,
}: {
  index: number;
}) {
  const form = useFormContext<IResource>();
  const links = form.watch(`content.${index}.links`);
  function DeleteLink(linkIndex: number) {
    form.setValue(
      `content.${index}.links`,
      form.getValues(`content.${index}.links`).filter((_, i) => linkIndex != i)
    );
  }
  return (
    <section className="flex flex-col gap-2 px-2">
      {links.length == 0 ? (
        <>
        <div className="flex gap-4 items-center justify-center">
          
        <h1 className="text font-semibold">No links </h1>
          <NewLinkDailogResourceForm linkGroupIndex={index} linkIndex={0}>
            <button className="text-primary bg-secondary font-bold rounded-md h-full aspect-square  center">
              <FaPlus />
            </button>
          </NewLinkDailogResourceForm>
          </div>
        <div className="flex gap-4 center">

          <p className="text-sm text-muted-foreground">
            Add links to organize the spreaded information into one place .
          </p>
        
          </div>
        </>
      ) : (
        links.map((link, i) => {
          return (
            <section key={i + link.url}>
              <div className="flex  gap-4  items-center">
                <NewLinkDailogResourceForm
                  linkGroupIndex={index}
                  linkIndex={i + 1}
                >
                  <button className=" text-primary bg-secondary font-bold text-sm rounded-md h-full aspect-square  center">
                    <FaPlus />
                  </button>
                </NewLinkDailogResourceForm>

                <div className="flex justify-between bg-secondary hover:rounded transition-all w-full rounded-md p-3">
                  <div className="flex items-center gap-6">
                    <h1 className="font-bold cursor-default text-lg hover:text-accent transition-colors">{link.title}</h1>
                    <a href={link.url} target="_blank" className="text-primary underline">{link.url.slice(0,20)}...</a>
                  </div>
                    <div className="flex gap-4">
                    
                  <div className="flex gap-2">
                    <Tooltip title={"Resource availablity"}>
                    <div className="px-2 p-1 rounded-xl border-primary border bg-white font-semibold text-sm">
                      {link.isPaid ? "Premium" : "Free"}
                    </div>
                    </Tooltip>

                    {
                    link.consumption_time&&
                    <Tooltip title={"Consumption time"}>

                    <div className="px-2 p-1 rounded-xl border-primary border bg-white font-semibold text-sm flex gap-2 items-center">
                      <FaClock /> {link.consumption_time}
                    </div>
                    </Tooltip>

                    }
                    <Tooltip title={"Difficulty level"}>

                    <div className="px-2 p-1 rounded-xl border-primary border font-semibold bg-white text-sm">
                      {link.skill_level}
                    </div>
                    </Tooltip>
                  </div>

                  <div className="flex gap-4 items-center">
                    <NewLinkDailogResourceForm
                      data={link}
                      linkGroupIndex={index}
                      linkIndex={i}
                    >
                      <Tooltip title="Edit link information">
                        <button className="">
                          <FaEdit size={20} />
                        </button>
                      </Tooltip>
                    </NewLinkDailogResourceForm>
                    <Tooltip title="Delete link">
                      <button onClick={() => DeleteLink(i)}>
                        <FaTrash className="text-destructive" />
                      </button>
                    </Tooltip>
                  </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })
      )}
    </section>
  );
}
