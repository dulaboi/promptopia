"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { search } from "../utils/search";

export default function Feed() {
  const [textSearch, setTextSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [displayPosts, setDisplayPosts] = useState([]);

  function handleSearchChange(e) {
    const searchText = e.target.value;
    setTextSearch(searchText);
    const res = search(posts, searchText);
    setDisplayPosts(res);
  }

  function handleTagClick(tag) {
    setTextSearch(tag);
    const res = search(posts, tag);
    setDisplayPosts(res);
  }

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/prompt");
      const data = await res.json();
      setPosts(data);
      setDisplayPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={textSearch}
          onChange={handleSearchChange}
          className="search_input peer"
          required
        />
      </form>

      <PromptCardList data={displayPosts} handleTagClick={handleTagClick} />
    </section>
  );
}

function PromptCardList({ data, handleTagClick }) {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((p) => (
        <PromptCard
          key={p._id}
          prompt={p}
          handleTagClick={() => handleTagClick(p.tag)}
        />
      ))}
    </div>
  );
}
