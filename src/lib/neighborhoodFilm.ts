/**
 * Neighborhood film for the landing hero.
 *
 * Full-bleed muted autoplay loop, quiet overlay, pause control,
 * still fallback. The 201 Area Code treatment loop lives at
 * public/bayonne/neighborhood.mp4. No hotlinked or scraped film.
 */

export const NEIGHBORHOOD_FILM_SRC = "/bayonne/neighborhood.mp4";

export function isNeighborhoodFilmResponse(res: {
  ok: boolean;
  headers: { get(name: string): string | null };
}): boolean {
  if (!res.ok) return false;
  const type = (res.headers.get("content-type") ?? "").toLowerCase();
  if (type.includes("text/html") || type.includes("application/json")) return false;
  return (
    type.includes("video") ||
    type.includes("mp4") ||
    type.includes("octet-stream") ||
    type === ""
  );
}

export async function probeNeighborhoodFilm(
  src: string = NEIGHBORHOOD_FILM_SRC,
): Promise<boolean> {
  try {
    const res = await fetch(src, { method: "HEAD" });
    if (res.status === 405 || res.status === 501) {
      const get = await fetch(src, { method: "GET", headers: { Range: "bytes=0-0" } });
      return isNeighborhoodFilmResponse(get);
    }
    return isNeighborhoodFilmResponse(res);
  } catch {
    return false;
  }
}
