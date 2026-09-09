/**
 * Neighborhood film for the landing hero.
 *
 * Etnies pattern we are translating: full-bleed muted autoplay loop,
 * quiet overlay type, pause control, still fallback — hometown, not a PDP.
 * Bayonne version uses the 07002 waterfront plate as the poster.
 *
 * Drop a short muted H.264 loop at public/bayonne/neighborhood.mp4
 * and the hero lights up. No hotlinked or scraped third-party film.
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
