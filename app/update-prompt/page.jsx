"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

export default function EditPrompt() {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    async function fetchPost() {
      const res = await fetch(`/api/prompt/${id}`);
      const { prompt, tag } = await res.json();
      setPost({ prompt, tag });
    }

    if (id) fetchPost();
  }, [id]);

  async function editPrompt(e) {
    e.preventDefault();
    if (!id) return alert("Prompt ID not found");
    setSubmitting(true);

    try {
      const res = await fetch(`/api/prompt/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (res.ok) router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPrompt}
    />
  );
}
