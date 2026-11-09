import { NextResponse } from 'next/server';
import { createShortUrl } from "@/lib/urls";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {alias, url} = body;

        if (
            typeof alias !== "string" ||
            typeof url !== "string" ||
            !alias.trim() ||
            !url.trim()
        ) {
            return NextResponse.json(
                {error: "Please provide both a URL and an alias."},
                {status: 400}
            );
        }

        let parsedURL: URL;

        try {
            parsedURL = new URL(url.trim());
        } catch {
            return NextResponse.json(
                {error: "Invalid URL"},
                { status: 400 }
            );
        }

        if (
            parsedURL.protocol !== "http:" &&
            parsedURL.protocol !== "https:"
        ) {
            return NextResponse.json(
                {error: "Invalid URL, must start with http:// or https://."},
                { status: 400 }
            );
        }

        const cleanAlias = alias.trim();

        if (!/^[a-zA-Z0-9_-]+$/.test(cleanAlias)) {
            return NextResponse.json(
                {
                    error: "Alias can only contain letters, hyphens, and underscores."
                },
                { status: 400 }
            );
        }

        await createShortUrl(cleanAlias, parsedURL.toString());

        return NextResponse.json(
            {
                message: "Short URL created successfully.",
                alias: cleanAlias
            },
            { status: 201 }
        );
    } catch (error) {
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            error.code === 11000
        ) {
            return NextResponse.json(
                { error: "Alias already taken, choose another." },
                { status: 409 }
            );
        }

        console.error("Error creating short URL:", error);

        return NextResponse.json(
            {
                error: "Issue when creating shortened URL."
            },
            { status: 500 }
        );
    }
}