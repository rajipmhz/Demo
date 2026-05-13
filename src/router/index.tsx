import Layout from "@/components/layout/Layout";
import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Dashboard=React.lazy(()=>import("@/core/Dashboard"))
const SpeechPage = React.lazy(() => import("@/core/SpeechToText"));
const TextSpeechPage = React.lazy(() => import("@/core/TextToSpeech"));
const FormPage = React.lazy(() => import("@/core/Form"));
const ImagePage = React.lazy(() => import("@/core/ImageWithOverlay"));
const VideoPage = React.lazy(() => import("@/core/VideoOverlay"));

const Loader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    Loading...
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
           {
        index: true,
        element: (
          <Suspense fallback={<Loader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "speech",
        element: (
          <Suspense fallback={<Loader />}>
            <SpeechPage />
          </Suspense>
        ),
      },

      {
        path: "text-to-speech",
        element: (
          <Suspense fallback={<Loader />}>
            <TextSpeechPage />
          </Suspense>
        ),
      },

      {
        path: "form",
        element: (
          <Suspense fallback={<Loader />}>
            <FormPage />
          </Suspense>
        ),
      },

      {
        path: "images",
        element: (
          <Suspense fallback={<Loader />}>
            <ImagePage />
          </Suspense>
        ),
      },

      {
        path: "video",
        element: (
          <Suspense fallback={<Loader />}>
            <VideoPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;