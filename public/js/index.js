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
  urlsTableBody.innerHTML = '';
  let rows = '';
  for (let i = 0; i < urls.length; i++) {
    const createdDate = new Date(urls[i].createdDate),
          lastAccess = new Date(urls[i].lastAccessDate);
    try {
      rows += `<tr>
        <td>${i + 1}</td>
        <td><a href="/${urls[i].shortUrl}" target="_blank">${urls[i].shortUrl}</a></td>
        <td><a href="${urls[i].fullUrl}" target="_blank">${urls[i].fullUrl}</a></td>
        <td>${urls[i].clicks}</td>
        <td>${createdDate.toLocaleDateString()}</td>
        <td>${lastAccess.toLocaleDateString()}</td>
      </tr>`;
    } catch (error) {
      console.log(error);
    }
  }
  urlsTableBody.innerHTML = rows;
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