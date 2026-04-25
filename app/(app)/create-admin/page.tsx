"use client";

import { useState } from "react";
import { useCreateAdmin } from "./useCreateAdmin";
import { Heading } from "@/app/ui/Heading/Heading";
import { Input } from "@/app/ui/Input/Input";
import styles from "./page.module.css";
import { Button } from "@/app/ui/Button/Button";
import { emailRegex } from "@/lib/constants";
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

  if (
    currentUser &&
    currentUser?.email !== process.env.NEXT_PUBLIC_SUPER_USER_EMAIL
  ) {
    redirect("/");
  }

  return !currentUser ? null : (
    <div className={styles.container}>
      <div className={styles.content}>
        <Heading title="Create Admin" />
        <div className={styles.fields}>
          <Input
            placeholder="First name"
            value={firstName}
            onChange={(t) => {
              setFirstName(t);
            }}
          />
          <Input
            placeholder="Last name"
            value={lastName}
            onChange={(t) => {
              setLastName(t);
            }}
          />
          <Input
            placeholder="Email"
            value={email}
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

            const success = await createAdmin(firstName, lastName, email);

            if (success) {
              setEmail("");
              setFirstName("");
              setLastName("");
            }
          }}
          disabled={!firstName || !lastName || !email}
        />
      </div>
      {loading && <Loader />}
    </div>
  );
};

export default CreatAdminPage;
