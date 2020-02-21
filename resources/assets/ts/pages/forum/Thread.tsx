import React, { useEffect } from "react";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import ReactMarkdown from "react-markdown";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

import Layout from "@/includes/Layout";
import Seo from "@/includes/Seo";
import Breadcrumb from "@/includes/Breadcrumb";

import Sidebar from "@/components/forum/Sidebar";
import Reply from "@/components/forum/Reply";
import { ReplyType, ThreadType } from "@/utils/types";
import { timeAgo } from "@/utils/helpers";

const Thread = () => {
  const { thread } = usePage();
  const {
    title,
    body,
    creator,
    channel,
    visits,
    replies_count,
    best_reply_id,
    created_at,
    replies,
  }: ThreadType = thread;
  useEffect(() => {
    updateCodeSyntaxHighlighting();
  }, []);
  function updateCodeSyntaxHighlighting() {
    document.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightBlock(block);
    });
  }
  return (
    <>
      <Seo title={title} />
      <Breadcrumb
        homeLink="/forum"
        homeTitle="Forum"
        parentTitle={channel.name}
        parentLink={`/forum/channels/${channel.slug}`}
        title={title}
      />
      <div className="bg-gradient-white py-4 lg:hidden">
        <div className="container">
          <h1 className="text-lg md:text-xl text-gray-800">{title}</h1>
        </div>
      </div>
      <div className="container mt-12">
        <div className="flex w-full">
          <Sidebar page="show" />
          <div className="w-full lg:w-9/12">
            <div className="bg-gray-100 flex flex-col px-6 py-4 rounded-lg mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <InertiaLink
                    href={`/u/@${creator.username}`}
                    className="h-10 w-10 flex items-center mr-4"
                  >
                    <img
                      className="rounded-full bg-cover"
                      src={creator.picture}
                      alt={creator.full_name}
                    />
                  </InertiaLink>
                  <p>
                    <span className="text-gray-800 font-medium">@{creator.username}</span>
                    <span className="text-gray-500 text-sm ml-2 hidden md:inline-flex">{timeAgo(created_at)}</span>
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="mr-4 text items-center hidden sm:flex">
                    <svg
                      className="h-5 w-5 mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 9.333H2.667A1.333 1.333 0 011.334 8V2.667c0-.734.6-1.334 1.333-1.334h8A1.333 1.333 0 0112 2.667V4h1.334a1.333 1.333 0 011.333 1.333V14a.666.666 0 01-1.133.467L11.053 12h-5.72A1.333 1.333 0 014 10.667V9.333zM4 8V5.333C4 4.6 4.6 4 5.333 4h5.334V2.667h-8V8H4zm9.334-2.667h-8v5.334h6a.667.667 0 01.466.2l1.534 1.526v-7.06z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>{replies_count}</span>
                  </div>
                  <div className="mr-4 items-center hidden sm:flex">
                    <svg
                      className="h-5 w-5 mr-1"
                      viewBox="0 0 25 25"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.56 17.66a8 8 0 01-11.32 0L1.3 12.7a1 1 0 010-1.42l4.95-4.95a8 8 0 0111.32 0l4.95 4.95a1 1 0 010 1.42l-4.95 4.95-.01.01zm-9.9-1.42a6 6 0 008.48 0L20.38 12l-4.24-4.24a6 6 0 00-8.48 0L3.4 12l4.25 4.24h.01zM11.9 16a4 4 0 110-8 4 4 0 010 8zm0-2a2 2 0 100-4 2 2 0 000 4z"
                        fill="currentColor"
                      />
                    </svg>
                    <span>{visits}</span>
                  </div>
                  <InertiaLink
                    href={`/forum/channels/${channel.slug}`}
                    className={`text-xs text-center font-bold py-2 px-3 rounded-full bg-opacity-${channel.slug} text-brand-${channel.slug} md:text-sm`}
                  >
                    {channel.name}
                  </InertiaLink>
                </div>
              </div>
              <div className="mt-6">
                <div className="content-body text-gray-800 text-base md:text-sm">
                  <ReactMarkdown source={body} escapeHtml={false} />
                </div>
              </div>
            </div>
            {
              replies.map((reply: ReplyType) => (
                <Reply key={reply.id} reply={reply} bestReplyId={best_reply_id} />
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
};

Thread.layout = (page: React.ReactNode) => <Layout child={page} />;

export default Thread;
