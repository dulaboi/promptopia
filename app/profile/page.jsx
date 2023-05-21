"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

export default function MyProfile() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchPosts() {
      if (session?.user?.id) {
        const res = await fetch(`/api/users/${session?.user?.id}/posts`);
        const data = await res.json();
        setPosts(data);
      }
    }

    fetchPosts();
  }, [session]);

  function handleEdit(p) {
    router.push(`/update-prompt?id=${p._id}`);
  }
  async function handleDelete(p) {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${p._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((post) => post._id !== p._id);
        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
