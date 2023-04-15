import Head from "next/head";
import { useState, useEffect } from "react";
import questionsList from "@/public/questionsList";
import NextImage from "next/image";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [stage, setStage] = useState(0);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleNextGame = () => {
    const img = new Image();
    img.src = questionsList[stage + 2].imageUrl;
    setShowAnswer(false);
    setStage((prev) => prev + 1);
  };

  useEffect(() => {
    const img = new Image();
    img.src = questionsList[stage].imageUrl;
    img.src = questionsList[stage + 1].imageUrl;
  }, []);
  return (
    <div>
      <Head>
        <title>Ai로 만든 넌센스그림퀴즈</title>
      </Head>
      <main className="flex flex-col items-center justify-center h-screen ">
        {!gameStarted && (
          <>
            <h1 className="lg:text-5xl font-bold mb-8 xs:text-xl">
              Ai로 만든 넌센스그림퀴즈
            </h1>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleStartGame}
            >
              게임시작
            </button>
          </>
        )}
        {gameStarted && (
          <>
            <NextImage
              src={questionsList[stage].imageUrl}
              key={questionsList[stage].imageUrl}
              priority={true}
              alt="Question"
              width={400}
              height={400}
              className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            />
            {!showAnswer ? (
              <>
                <div className="flex items-center justify-center mb-8">
                  <span className="text-xl font-bold mr-2">초성힌트:</span>
                  <span className="text-3xl font-bold text-red-500 mb-2">
                    {questionsList[stage].hint}
                  </span>
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => {
                    setShowAnswer(true);
                  }}
                >
                  정답보기
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center mb-8">
                  <span className="text-xl font-bold mr-2">정답:</span>
                  <span className="text-3xl font-bold text-green-500 mb-2">
                    {questionsList[stage].answer}
                  </span>
                </div>
                {stage == questionsList.length - 1 ? (
                  <span className="text-xl font-bold mr-2">문제끝</span>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleNextGame}
                  >
                    다음문제
                  </button>
                )}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
