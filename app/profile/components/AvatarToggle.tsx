import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function AvatarToggle() {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)){
                setIsOpen(false);
            }
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            }
        }
    }, []);


    return (
        <div className="relative" >
            <div onClick={() => setIsOpen(prev => !prev)} className="cursor-pointer">
                <Avatar>
                    <AvatarImage src={user?.user_metadata?.avatar_url || "https://github.com/shadcn.png"} alt="User Avatar" />
                </Avatar>
            </div>
            {isOpen && (
                <div ref={containerRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10">
                    <div className="py-2">
                        <Link href='/profile' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            プロフィール
                        </Link>
                        <Link href='/profile/setting' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            設定
                        </Link>
                        <Link href='/logout' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            ログアウト
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}