import clientPromise from "./mongodb";

export interface ShortUrl {
    alias: string;
    url: string;
    createdAt: Date;
}

export async function createShortUrl(alias: string, url: string) {
    const client = await clientPromise;
    const db = client.db("url_shortener");
    const urls = db.collection<ShortUrl>("urls");

    //make every alias unique
    await urls.createIndex({ alias: 1}, {unique: true });

    //save shortened url
    await urls.insertOne({
        alias,
        url,
        createdAt: new Date(),
    })
}

export async function getUrlByAlias(alias: string) {
    const client = await clientPromise;
    const db = client.db("url_shortener");
    const urls = db.collection<ShortUrl>("urls");
    return await urls.findOne({ alias });
}