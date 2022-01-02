import { gzip } from 'pako';

/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url) {
  const response = await fetch(url, {
    method: 'GET',
  }).catch(catchError);
  if (!response.ok) {
    return catchError(response.error);
  }
  return await response.arrayBuffer();
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON(url) {
  const response = await fetch(url, {
    method: 'GET',
  }).catch(catchError);
  if (!response.ok) {
    return catchError(response.error);
  }
  return await response.json();
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    body: file,
  }).catch(catchError);
  if (!response.ok) {
    return catchError(response.error);
  }
  return await response.json();
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  const jsonString = JSON.stringify(data);
  const uint8Array = new TextEncoder().encode(jsonString);
  const compressed = gzip(uint8Array);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Encoding': 'gzip',
      'Content-Type': 'application/json',
    },
    body: compressed,
  }).catch(catchError);
  if (!response.ok) {
    return catchError(response.error);
  }
  return await response.json();
}

function catchError(e) {
  console.error(e);
  return null;
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
