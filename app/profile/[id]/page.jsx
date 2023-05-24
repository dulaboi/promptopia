"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

export default function UserProfile({ params }) {
  const userId = params.id;
  const route = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  useEffect(() => {
    if (session?.user?.id === userId) {
      route.replace("/profile");
    }
  }, [session]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(`/api/users/${userId}/posts`);
      const data = await res.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <Profile
      name={name}
      desc={`Welcome to ${name}'s personalized profile page. Explore ${name}'s exceptional prompts and be inspired by the power of their imagination`}
      data={posts}
      handleEdit={null}
      handleDelete={null}
    />
  );
}
