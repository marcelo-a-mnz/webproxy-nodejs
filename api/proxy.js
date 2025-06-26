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

    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename="apk-via-proxy.apk"');
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Faz streaming direto para o navegador
    response.body.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send(`Erro: ${error.message}`);
  }
}
