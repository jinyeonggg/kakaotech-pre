// app/search/page.tsx — 검색 페이지 (Client Component)
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default function SearchPage() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // BASE_PATH: 런박스 환경에서 Client Component가 Route Handler 경로를 올바르게 구성하기 위해 필요합니다.
  // .env.local 파일에 NEXT_PUBLIC_BASE_PATH='/proxy/3000'이 포함되어 있는지 확인해주세요.
  const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  // ===========================================================================
  // [실습 1] Direct Fetch 방식
  //   흐름: 브라우저 → FastAPI (NEXT_PUBLIC_FASTAPI_URL/posts) 직접 호출
  //   TODO: 아래 useEffect 블록을 완성해보세요.완성 후 Route Handler 방식(아래)은 주석 처리하세요.
  // ===========================================================================
<<<<<<< HEAD
  
    // useEffect(() => {
    //   setLoading(true);
    //   setError(null);
    //   fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/posts`)
    //     .then((response)=>{
    //       if (!response.ok) throw new Error("에러발생");
    //       return response.json();
    //     })
    //     .then((data) => {
    //     // 2단계: 변환된 진짜 데이터를 상태(state)에 저장
    //       setResults(data); 
    //     })
    //     .catch((error) => {
    //     // 3단계: 에러 발생 시 처리
    //       setError(error.message); 
    //     })
    //     .finally(() => {
    //     // 4단계: 성공/실패 여부와 상관없이 로딩 완료 처리
    //       setLoading(false); 
    //     });

  
    //   // TODO: process.env.NEXT_PUBLIC_FASTAPI_URL 을 사용해 /posts 를 fetch 하세요.
    //   //       성공 시 setResults, 실패 시 setError, 완료 시 setLoading(false) 처리.
  
    // }, []);
  
=======

  // useEffect(() => {
  //   setLoading(true);
  //   setError(null);

  //   fetch(`${process.env.NEXT_PUBLIC_FASTAPI_URL}/posts`)
  //     .then((response) => {
  //       if (!response.ok) throw new Error("데이터를 불러오는데 실패했습니다.");
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setResults(data);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });

  //   // TODO: process.env.NEXT_PUBLIC_FASTAPI_URL 을 사용해 /posts 를 fetch 하세요.
  //   //       성공 시 setResults, 실패 시 setError, 완료 시 setLoading(false) 처리.
  // }, []);
>>>>>>> 91ecd3f1e1624cea18f1bd34270dbe830aac3bcd

  // ===========================================================================
  // [실습 1] Route Handler 방식
  //   흐름: 브라우저 → /api/search (Route Handler) → FastAPI
  //   TODO: 아래 useEffect 블록을 완성해보세요.
  // ===========================================================================
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
<<<<<<< HEAD
      try{
        const response = await axios.get(`${BASE_PATH}/api/search`);
        setResults(response.data);
      } catch (error) {
        if(axios.isAxiosError(error)){
          setError(error.response?.data?.detail || "데이터를 가져오는 데 실패했습니다.");
        } else{
          setError(error instanceof Error ? error.message : "알 수 없는 에러");
        }
      } finally {
        setLoading(false);
      }
    }
      fetchData();


=======
>>>>>>> 91ecd3f1e1624cea18f1bd34270dbe830aac3bcd

      try {
        const response = await axios.get(`${BASE_PATH}/api/search`);
        setResults(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.detail ?? "알 수 없는 오류");
        } else {
          setError(error instanceof Error ? error.message : "알 수 없는 오류");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // ===========================================================================
  // TODO: results 배열을 query 로 필터링하는 로직을 구현해보세요.
  //       post.title 또는 post.content 에 query 가 포함된 게시글만 남기세요.
  // ===========================================================================
<<<<<<< HEAD
  const filtered: Post[] = results.filter((post) => 
    post.title.includes(query) || post.content.includes(query)
=======
  const filtered: Post[] = results.filter(
    (post) => post.title.includes(query) || post.content.includes(query),
>>>>>>> 91ecd3f1e1624cea18f1bd34270dbe830aac3bcd
  );

  return (
    <main>
      <div className="flex items-center gap-3 mb-6">
        <Link
          href={`${BASE_PATH}/posts`}
          className="text-gray-400 hover:text-gray-600 text-sm"
        >
          ← 목록으로
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">검색</h1>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="제목 또는 내용으로 검색하세요"
        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {loading && (
        <p className="text-center text-gray-400 py-10">불러오는 중...</p>
      )}

      {error && <p className="text-center text-red-500 py-10">{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p className="text-center text-gray-400 py-10">
          {query ? "검색 결과가 없습니다." : "게시글이 없습니다."}
        </p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <ul className="space-y-3">
          {filtered.map((post) => (
            <li key={post.id}>
              <Link
                href={`${BASE_PATH}/posts/${post.id}`}
                className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-sm transition-all"
              >
                <p className="font-medium text-gray-900">{post.title}</p>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                  {post.content}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  {new Date(post.created_at).toLocaleDateString("ko-KR")}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
