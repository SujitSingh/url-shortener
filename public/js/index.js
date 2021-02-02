const updateElm = document.getElementById('updates');
const urlsTableBody = document.querySelector('.urls tbody');

async function shorUrl(form) {
  const fullUrl = form['fullUrl'].value;
  if (!fullUrl) { return; }
  try {
    updateElm.classList.add('hide');
    const savedUrl = await triggerCall('/short', {
      method: 'POST',
      body: JSON.stringify({ fullUrl })
    });
    updateShorted(savedUrl);
    getAllUrls();
  } catch (error) {
    console.log('Failed to fetch all URLs', error);
  }
}

async function getAllUrls() {
  console.log('triggered')
  try {
    const urls = await triggerCall('/urls');
    updateUrlsTable(urls);
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener('DOMContentLoaded', getAllUrls);

function updateShorted(urlObj) {
  const html = `<p>Short URL - 
    <a href="/${urlObj.shortUrl}" target="_blank">${urlObj.shortUrl}</a>`;
  updateElm.innerHTML = html;
  updateElm.classList.remove('hide');
}

function updateUrlsTable(urls) {
  for (let i = 0; i < urls.length; i++) {
    try {
      let row = `<tr>
        <td>${i + 1}</td>
        <td><a href="/${urls[i].shortUrl}" target="_blank">${urls[i].shortUrl}</a></td>
        <td><a href="${urls[i].fullUrl}" target="_blank">${urls[i].fullUrl}</a></td>
        <td>${urls[i].clicks}</td>
      </tr>`;
      urlsTableBody.innerHTML += row;
    } catch (error) {
      console.log(error);
    }
  }
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