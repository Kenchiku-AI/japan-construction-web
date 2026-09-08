import { FC } from "react";
import UsersDashboard from "./UsersDashboard";

interface UsersPageProps {
  params: {
    companyId: string;
  };
}

const UsersPage: FC<UsersPageProps> = async ({ params }) => {
  const { companyId } = await params;

  return <UsersDashboard companyId={companyId} />;
};

export default UsersPage;
