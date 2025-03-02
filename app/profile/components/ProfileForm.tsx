"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, MapPin, Calendar } from "lucide-react"
// Add these imports at the top of the file
import { Instagram, Facebook, Twitter } from "lucide-react"
import Link from "next/link"

export default function ProfileForm() {
  // Update the profile state to include social media links
  const [profile, setProfile] = useState(
    {
      username: "johndoe",
      avatarUrl: "https://example.com/avatar.jpg",
      description: "I'm a software developer passionate about creating user-friendly interfaces.",
      counts: {
        followers: 1200,
        following: 300,
        articles: 45,
      },
      tags: {
        places: ["Mountains", "Forests", "Lakes"],
        seasons: ["Spring", "Summer", "Autumn"],
      },
      socialMedia: {
        instagram: "https://instagram.com/johndoe",
        facebook: "https://facebook.com/johndoe",
        twitter: "https://twitter.com/johndoe",
      },
    }
  );

  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)

  // Format numbers for display (e.g., 1.2k instead of 1243)
  const formatCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k"
    }
    return count.toString()
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="flex flex-col items-center space-y-4 pb-2">
        <div className="relative group">
          <Avatar className="w-24 h-24 border-4 border-background">
            <AvatarImage
              src={avatarPreview || profile.avatarUrl || "/placeholder.svg?height=96&width=96"}
              alt={profile.username}
            />
            <AvatarFallback className="text-2xl">{profile.username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-bold">@{profile.username}</h2>
          <p className="text-muted-foreground text-sm mt-1">{profile.description}</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center py-2 border-y">
          <div>
            <p className="font-bold">{formatCount(profile.counts.followers)}</p>
            <p className="text-xs text-muted-foreground">Followers</p>
          </div>
          <div>
            <p className="font-bold">{formatCount(profile.counts.following)}</p>
            <p className="text-xs text-muted-foreground">Following</p>
          </div>
          <div>
            <p className="font-bold">{formatCount(profile.counts.articles)}</p>
            <p className="text-xs text-muted-foreground">Articles</p>
          </div>
        </div>

        {/* Favorite Places */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Favorite Nature Places</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.tags.places.map((place) => (
              <Badge key={place} variant="secondary">
                {place}
              </Badge>
            ))}
          </div>
        </div>

        {/* Favorite Seasons */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">Favorite Seasons</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.tags.seasons.map((season) => (
              <Badge key={season} variant="secondary">
                {season}
              </Badge>
            ))}
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 pt-4">
          <a
            href={profile.socialMedia.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram className="h-6 w-6" />
            <span className="sr-only">Instagram</span>
          </a>
          <a
            href={profile.socialMedia.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Facebook className="h-6 w-6" />
            <span className="sr-only">Facebook</span>
          </a>
          <a
            href={profile.socialMedia.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Twitter className="h-6 w-6" />
            <span className="sr-only">X (Twitter)</span>
          </a>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button className="w-full">
            <Link href="/profile/edit">
            Edit Profile
            </Link>
            </Button>
          <Button variant="outline" className="w-full">
            Share Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

