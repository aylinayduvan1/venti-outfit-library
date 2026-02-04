// context/TagContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import type { Tag } from "../types/tag";
import { fetchTags } from "../services/tag.service";

interface TagContextType {
  tags: Tag[];
  loading: boolean;
}

const TagContext = createContext<TagContextType | null>(null);

export function TagProvider({ children }: { children: React.ReactNode }) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTags()
      .then(setTags)
      .finally(() => setLoading(false));
  }, []);

  return (
    <TagContext.Provider value={{ tags, loading }}>
      {children}
    </TagContext.Provider>
  );
}

export function useTags() {
  const ctx = useContext(TagContext);
  if (!ctx) throw new Error("useTags must be used inside TagProvider");
  return ctx;
}
