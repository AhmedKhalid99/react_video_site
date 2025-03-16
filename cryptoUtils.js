export async function encryptToken(token) {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encryptedData = await crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        encoder.encode(token)
    );

    // Export the key for later decryption
    const exportedKey = await crypto.subtle.exportKey("raw", key);
    const encryptedToken = btoa(
        JSON.stringify({
            iv: Array.from(iv),
            key: Array.from(new Uint8Array(exportedKey)),
            data: Array.from(new Uint8Array(encryptedData)),
        })
    );

    return encryptedToken;
}

export async function decryptToken(encryptedToken) {
    const decoder = new TextDecoder();
    const parsedData = JSON.parse(atob(encryptedToken));

    const iv = new Uint8Array(parsedData.iv);
    const keyBuffer = new Uint8Array(parsedData.key);
    const encryptedData = new Uint8Array(parsedData.data);

    const key = await crypto.subtle.importKey(
        "raw",
        keyBuffer,
        { name: "AES-GCM" },
        true,
        ["decrypt"]
    );

    const decryptedData = await crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        encryptedData
    );

    return decoder.decode(decryptedData);
}
