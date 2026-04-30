import { FC } from "react";
import UserDashboard from "./UserDashboard";

interface UserPageProps {
  params: {
    userId: string;
  };
}

const UserPage: FC<UserPageProps> = async ({ params }) => {
  const { userId } = await params;

  return <UserDashboard userId={userId} />;
};

export default UserPage;
