"use client";
import { useState } from "react";

export default function ShortenForm() {
    const [url, setUrl] useState("");
    const [alias, setAlias] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: react.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");
        setLoading(true);
        setShortUrl("");

        try {
            const response = await fetch("/api/shorten", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url, alias }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
                return;
            }

            setShortUrl(
                `${window.location.origin}/r/${data.alias}`
            );

            setUrl("");
            setAlias("");
        } catch {
            setError("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit = {handleSubmit}>
            <div>
                <label htmlFor="url">Long URL</label>
                <input
                    id = "url"
                    type = "url"
                    placeholder = "https://example.com"
                    value = {url}
                    onChange = {(event) => setUrl(event.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="alias">Custom Alias</label>
                <input
                    id = "alias"
                    type = "text"
                    placeholder = "my-link"
                    value = {alias}
                    onChange = {(event) => setAlias(event.target.value)}
                    required
                />
            </div>

            <button type = "submit" disabled = {loading}>
                {loading ? "Creating..." : "Shorten URL"}
            </button>

            {error && <p>{error}</p>}

            {shortUrl && (
                <div>
                    <p>Your shortened URL:</p>
                    <a href = {shortUrl}>{shortUrl}</a>
                </div>
            )}
        </form>
    );
}