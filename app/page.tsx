'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import {
  Card,
  CardDescription,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const FallingLeaves = dynamic(() => import('@/app/animation/fallingleaf'), { ssr: false });

const Home: React.FC = () => {
  const user = useAuth();
  console.log(user);

  if(!user) {
    throw new Error('User not found');
  }

  return (
    <main className="bg-gradient-to-b from-sky-300 via-green-200 to-yellow-200 w-screen h-screen relative overflow-hidden flex items-center justify-center">
      <FallingLeaves count={50} />
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-30 z-0"></div>
      <div className="relative z-10 text-center">
        <h1 className="text-6xl md:text-7xl font-popone text-emerald-800 mb-8 shadow-text ghibli-title">自然にいってみよう</h1>
        <Card className="w-full max-w-lg p-8 bg-white/70 backdrop-blur-sm shadow-xl rounded-3xl border-4 border-emerald-200">
          <CardDescription className="text-xl md:text-2xl tracking-wide text-emerald-700 font-popone">
            あなたは自然と触れ合っていますか？<br /> 
            自然と触れ合うことは、心の安らぎや癒やし、<br className="hidden md:inline" />
            幸せな気持ちになることができます。<br />
            <span className="mt-4 inline-block font-bold text-2xl md:text-3xl text-emerald-600">
              さあ、探してみよう自分の癒やしの場所を。
            </span>
          </CardDescription>
          <Link href="/login">
              <Button className="mt-8">自然を探す</Button>
          </Link>
        </Card>
      </div>
    </main>
  );
}

export default Home;