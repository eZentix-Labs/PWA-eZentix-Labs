import { useEffect, useState } from "react";
import { fetchLinks } from "./api.js";
import fallback from "../data/fallback.json";

// Render the bundled config immediately, then swap in live config from the API.
export default function useLinks() {
  const [links, setLinks] = useState(fallback);

  useEffect(() => {
    fetchLinks()
      .then((data) => {
        if (data?.buttons?.length) setLinks(data);
      })
      .catch(() => {});
  }, []);

  return links;
}
