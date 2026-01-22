export async function onRequest(context) {
  const url = new URL(context.request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response("ID faltando", { status: 400 });
  }

  // Busca direto do aomstats usando o servidor do Cloudflare
  const response = await fetch(`https://aomstats.io/api/twitch/profile/${id}`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; AoM-Leaderboard/1.0)"
    }
  });

  const data = await response.text();

  return new Response(data, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "max-age=60" // Cache de 1 minuto para ser rápido
    }
  });
}
