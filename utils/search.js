export function search(posts, search) {
  const searchResults = posts.filter((post) => {
    const promptMatch = post.prompt
      .toLowerCase()
      .includes(search.toLowerCase());
    const tagMatch = post.tag.toLowerCase().includes(search.toLowerCase());
    const userMatch = post.creator.username.includes(search.toLowerCase());
    return promptMatch || tagMatch || userMatch;
  });
  return searchResults;
}
