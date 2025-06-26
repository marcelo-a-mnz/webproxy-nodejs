export default async function handler(req, res) {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('Faltando parâmetro "url"');
  }

  try {
    const response = await fetch(targetUrl);

    if (!response.ok) {
      return res.status(response.status).send('Erro ao buscar arquivo');
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename="apk-via-proxy.apk"');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Length', buffer.length.toString());

    res.status(200).end(buffer);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Erro: ${error.message}`);
  }
}
