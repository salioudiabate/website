import React from "react";
import { usePage } from "@inertiajs/inertia-react";

import Layout from "@/includes/Layout";
import Seo from "@/includes/Seo";

import Header from "@/components/forum/Header";
import TabBar from "@/components/forum/TabBar";
import SearchBar from "@/components/forum/SearchBar";
import Sidebar from "@/components/forum/Sidebar";
import Thread from "@/components/forum/Thread";
import ListChannels from "@/pages/forum/ListChannels";

import { ThreadType } from "@/utils/types";
import Pagination from "@/components/Pagination";

const Forum = () => {
  const { threads } = usePage();
  const { data, links } = threads;
  return (
    <>
      <Seo
        title="Forum"
        description="Les forums communautaires sont un endroit pour discuter de tout ce qui concerne le développement / le design (UI et UX)."
      />
      <Header />
      <div className="container mt-12">
        <ListChannels />
        <div className="flex w-full">
          <Sidebar />
          <div className="w-full lg:w-9/12">
            <div className="flex items-center">
              <div className="w-full lg:w-2/3 items-center">
                <div className="hidden lg:inline-flex bg-gray-300 text-gray-700 text-sm font-medium py-2 px-4 mr-4 rounded-full">
                  Toutes les discussions
                </div>
                <TabBar />
              </div>
              <div className="w-full hidden lg:flex lg:w-1/3">
                <SearchBar />
              </div>
            </div>
            <div className="my-10">
              {data.map((thread: ThreadType) => (<Thread key={thread.id} {...thread} />))}
            </div>
            <Pagination links={links} />
          </div>
        </div>
      </div>
    </>
  );
};

Forum.layout = (page: React.ReactNode) => <Layout child={page} />;

export default Forum;
