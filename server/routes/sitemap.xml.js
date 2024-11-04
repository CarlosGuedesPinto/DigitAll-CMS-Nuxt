import { SitemapStream, streamToPromise } from 'sitemap';
import axios from 'axios';

export default defineEventHandler(async (event) => {
    // Fetch all documents
    const url = `${process.env.NUXT_PUBLIC_SB_URL}/links/?version=published&token=${process.env.NUXT_PUBLIC_SB_CONTENT_DELIVERY_TOKEN}&per_page=500`;
    const { data } = await axios.get(url);
    const config = useRuntimeConfig();
    const sitemap = new SitemapStream({
        hostname: config.public.NUXT_PUBLIC_SITE_URL,
    })

    Object.values(data.links).forEach(link => {
        if (!link.is_folder && !link.real_path.includes('global')) { // Only include non-folder links
            sitemap.write({
                url: link.real_path,
                changefreq: 'monthly',
                priority: 0.8
            });
        }
    });
    sitemap.end()

    return streamToPromise(sitemap)
})