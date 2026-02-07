import { FC } from "react";
import ProjectDashboard from "./ProjectDashboard";

interface ProjectPageProps {
  params: {
    projectId: string;
  };
}

const ProjectPage: FC<ProjectPageProps> = async ({ params }) => {
  const { projectId } = await params;

  return <ProjectDashboard projectId={projectId} />;
};

export default ProjectPage;
