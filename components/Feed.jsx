"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

export default function Feed() {
  const [textSearch, setTextSearch] = useState("");
  const [posts, setPosts] = useState([]);

  function handleSearchChange(e) {}

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
}

function PromptCardList({ data, handleTagClick }) {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((p) => (
        <PromptCard key={p._id} prompt={p} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
}
