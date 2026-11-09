import { redirect, notFound } from "next/navigation";
import { getUrlByAlias } from "@/lib/urls";
export const instant = false;

export default async function RedirectPage({
                                               params,
                                           }: {
    params: Promise<{ alias: string }>;
                                           }) {
    const { alias } = await params;
    const shortUrl = await getUrlByAlias(alias);

    if (!shortUrl) {
        notFound();
    }
    redirect(shortUrl.url);
}