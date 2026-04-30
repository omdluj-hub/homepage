import { NextResponse } from 'next/server';
import Parser from 'rss-parser';

const parser = new Parser();
const NAVER_BLOG_RSS_URL = 'https://rss.blog.naver.com/hoban2011902';

export async function GET() {
  try {
    const feed = await parser.parseURL(NAVER_BLOG_RSS_URL);
    
    // 네이버 RSS는 썸네일을 직접 제공하지 않으므로, 
    // 본문 내용에서 첫 번째 이미지를 추출하거나 기본 이미지를 설정해야 할 수 있음.
    // 하지만 우선은 기본 정보를 정리해서 반환.
    const posts = feed.items.map(item => {
      // content 또는 description에서 첫 번째 img 태그의 src 추출
      const content = item.content || item.description || '';
      const imgMatch = content.match(/<img[^>]+src=["']([^"'>]+)["']/i);
      const thumbnail = imgMatch ? imgMatch[1] : null;

      return {
        title: item.title,
        link: item.link,
        pubDate: item.pubDate,
        contentSnippet: item.contentSnippet,
        thumbnail: thumbnail,
        description: content,
      };
    });

    return NextResponse.json({ 
      success: true, 
      posts: posts.slice(0, 12), // 최신 12개만 반환
      title: feed.title,
      description: feed.description
    });
  } catch (error) {
    console.error('Error fetching Naver Blog RSS:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
