const updateElm = document.getElementById('updates');

async function shorUrl(form) {
  const fullUrl = form['fullUrl'].value;
  if (!fullUrl) { return; }
  try {
    updateElm.classList.remove('show');
    const savedUrl = await triggerCall('/short', {
      method: 'POST',
      body: JSON.stringify({ fullUrl })
    });
    updateShorted(savedUrl);
  } catch (error) {
    console.log('Failed to fetch all URLs', error);
  }
}

function updateShorted(urlObj) {
  const html = `<p>Short URL - 
    <a href="/${urlObj.shortUrl}" target="_blank">${urlObj.shortUrl}</a>`;
  updateElm.innerHTML = html;
  updateElm.classList.add('show');
}

async function triggerCall(url, params) {
  const response = await fetch(url, {
    ...params,
    headers: { 'Content-Type': 'application/json' },
  });
  return await processResponse(response);
}
async function processResponse(response) {
  const body = await response.json();
  if (!response.ok) { throw body }
  return body;
}