"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Calendar, ChevronRight } from "lucide-react";

interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  contentSnippet: string;
  thumbnail: string | null;
}

export default function BlogColumnPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/blog");
        const data = await response.json();
        if (data.success) {
          setPosts(data.posts);
        }
      } catch (error) {
        console.error("Failed to fetch blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="bg-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-primary mb-4">후한의원 칼럼</h1>
          <p className="text-lg text-muted">구미 후한의원의 건강 정보와 치료 이야기를 만나보세요.</p>
        </div>
      </section>

      {/* Blog List Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {posts.map((post, index) => (
                <article 
                  key={index}
                  className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500"
                >
                  <a 
                    href={post.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="relative aspect-[16/10] overflow-hidden"
                  >
                    {post.thumbnail ? (
                      <img 
                        src={post.thumbnail} 
                        alt={post.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-300">
                        <span className="text-sm font-bold uppercase tracking-widest">Hoo Clinic Column</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                  </a>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 text-xs text-point-green font-bold mb-4 uppercase tracking-wider">
                      <Calendar size={14} />
                      {new Date(post.pubDate).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-primary transition-colors min-h-[3.5rem] leading-snug">
                      <a href={post.link} target="_blank" rel="noopener noreferrer">
                        {post.title}
                      </a>
                    </h3>
                    
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 mb-8 flex-grow">
                      {post.contentSnippet}
                    </p>
                    
                    <a 
                      href={post.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:translate-x-1 transition-transform"
                    >
                      칼럼 자세히 보기
                      <ChevronRight size={16} />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              가져올 수 있는 블로그 글이 없습니다.
            </div>
          )}

          <div className="mt-20 text-center">
            <a 
              href="https://blog.naver.com/hoban2011902" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-primary text-white px-10 py-4 rounded-full font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
            >
              네이버 블로그 전체보기
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
