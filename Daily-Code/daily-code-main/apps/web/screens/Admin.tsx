import { ProblemEditor } from "../components/admin/ProblemEditor";
import { TracksEditor } from "../components/admin/TracksEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui";
import { LinkProblems } from "../components/admin/LinkProblems";
import CompleteAddTracks from "../components/admin/CompleteAddTracks";
import AdminMCQ from "../components/admin/AdminMCQ";
import AdminSearch from "../components/admin/AdminSearch";
import { ProblemStatements } from "../components/admin/code/ProblemStatements";
import { getAllCategories, getAllProblems, getAllTracks } from "../components/utils";
import db from "@repo/db/client";

export const Admin = async () => {
  const problems = await getAllProblems();
  const tracks = await getAllTracks();
  const categories = await getAllCategories();
  const TracksinSearch = await db.track.findMany({
    where: {
      inSearch: true,
    },
  });
  const TracksNotinSearch = await db.track.findMany({
    where: {
      inSearch: false,
    },
  });
  return (
    <div className="pt-2">
      <div className="flex justify-center">
        <Tabs defaultValue="auto" className="w-full">
          <div className="flex justify-center my-2">
            <TabsList>
              <TabsTrigger value="auto">Complete Track</TabsTrigger>
              <TabsTrigger value="problems">Problems</TabsTrigger>
              <TabsTrigger value="tracks">Tracks</TabsTrigger>
              <TabsTrigger value="link">Link</TabsTrigger>
              <TabsTrigger value="search">Search</TabsTrigger>
              <TabsTrigger value="MCQ">MCQ</TabsTrigger>
              <TabsTrigger value="problem-statement">Problem Statements</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="auto">
            <CompleteAddTracks categories={categories} />
          </TabsContent>
          <TabsContent value="problems">
            <ProblemEditor problems={problems} />
          </TabsContent>
          <TabsContent value="tracks">
            <TracksEditor tracks={tracks} />
          </TabsContent>
          <TabsContent value="link">
            <LinkProblems tracks={tracks} />
          </TabsContent>
          <TabsContent value="search">
            <AdminSearch TracksNotinSearch={TracksNotinSearch} TracksinSearch={TracksinSearch} />
          </TabsContent>
          <TabsContent value="MCQ">
            <AdminMCQ />
          </TabsContent>
          <TabsContent value="problem-statement">
            <ProblemStatements />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
