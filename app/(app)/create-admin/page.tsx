"use client";

import { useState } from "react";
import { useCreateAdmin } from "./useCreateAdmin";
import { Heading } from "@/app/ui/Heading/Heading";
import { Input } from "@/app/ui/Input/Input";
import styles from "./page.module.css";
import { Button } from "@/app/ui/Button/Button";
import { emailRegex, superUserEmail } from "@/lib/constants";
import { redirect } from "next/navigation";
import { Loader } from "@/app/ui/Loader";
import { useApi } from "@/lib/api/ApiContext";

const CreatAdminPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);
  const { loading, createAdmin } = useCreateAdmin();
  const { currentUser } = useApi();

  if (currentUser && currentUser?.email !== superUserEmail) {
    redirect("/");
  }

  return !currentUser ? null : (
    <div className={styles.container}>
      <div className={styles.content}>
        <Heading title="Create Admin" />
        <div className={styles.fields}>
          <Input
            placeholder="First name"
            onChange={(t) => {
              setFirstName(t);
            }}
          />
          <Input
            placeholder="Last name"
            onChange={(t) => {
              setLastName(t);
            }}
          />
          <Input
            placeholder="Email"
            onChange={(t) => {
              setEmail(t);
              setIsEmailInvalid(false);
            }}
            error={isEmailInvalid}
          />
        </div>
        <Button
          label="Create"
          onClick={async () => {
            if (!emailRegex.test(email)) {
              setIsEmailInvalid(true);
              return;
            }

            await createAdmin(firstName, lastName, email);
          }}
          disabled={!firstName || !lastName || !email}
        />
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default CreatAdminPage;
