import { gzip } from 'pako';

/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url) {
  const response = await fetch(url, {
    method: 'GET',
  });
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
  });
  return await response.json();
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  const queryParams = new URLSearchParams(file);
  const response = await fetch(url + queryParams, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  });
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

  const queryParams = new URLSearchParams(compressed);
  const response = await fetch(url + queryParams, {
    method: 'POST',
    headers: {
      'Content-Encoding': 'gzip',
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
