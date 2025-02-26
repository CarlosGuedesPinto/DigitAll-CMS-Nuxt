import type { SitemapUrlInput } from '#sitemap/types';
import axios from 'axios';

const fetchLinks = async () => {
  const url = `https://api.storyblok.com/v2/cdn/links/?version=published&token=6QIlGppf3xcha9QvQOhhfAtt&per_page=500`;
  try {
    const { data } = await axios.get(url);
    const links = Object.values(data.links)
        .filter((link: any) => !link.is_folder && !link.real_path.includes('global'))
        .map((link: any) => link.real_path);
    return links;
  } catch (error) {
    console.error('Error fetching links:', error);
    return [];
  }
};

export default defineSitemapEventHandler(async () => {
  const links = await fetchLinks();
  return links satisfies SitemapUrlInput[]
})