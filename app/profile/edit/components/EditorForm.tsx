"use client"

import type React from "react"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Facebook, Instagram, Twitter, Upload, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { redirect } from "next/navigation"

const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  description: z
    .string()
    .max(500, {
      message: "Description must not be longer than 500 characters.",
    })
    .optional(),
  instagram: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  facebook: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
  twitter: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export default function ProfileEditor() {
  const [avatar, setAvatar] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Default values for the form
  const defaultValues: Partial<ProfileFormValues> = {
    username: "johndoe",
    description: "I'm a software developer passionate about creating user-friendly interfaces.",
    instagram: "https://instagram.com/johndoe",
    facebook: "https://facebook.com/johndoe",
    twitter: "https://twitter.com/johndoe",
  }

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  })

  function onSubmit(data: ProfileFormValues) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(data)
      console.log("Avatar:", avatar)

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })

      setIsSubmitting(false)
      redirect("/profile")
    }, 1000)
  }

  function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatar(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>Update your profile information and social media links.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="w-24 h-24">
                <AvatarImage src={avatar || "/placeholder.svg?height=96&width=96"} alt="Avatar" />
                <AvatarFallback>
                  <User className="w-12 h-12 text-muted-foreground" />
                </AvatarFallback>
              </Avatar>

              <div className="flex items-center">
                <label htmlFor="avatar-upload" className="cursor-pointer">
                  <div className="flex items-center gap-2 text-sm text-primary">
                    <Upload className="w-4 h-4" />
                    <span>Upload new avatar</span>
                  </div>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
            </div>

            <Separator />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="johndoe" {...field} />
                  </FormControl>
                  <FormDescription>This is your public display name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>Brief description for your profile. Maximum 500 characters.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            <div>
              <h3 className="mb-4 text-lg font-medium">Social Media Links</h3>
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Instagram className="w-4 h-4" />
                        Instagram
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://instagram.com/username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="facebook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Facebook className="w-4 h-4" />
                        Facebook
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://facebook.com/username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Twitter className="w-4 h-4" />
                        Twitter/X
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://twitter.com/username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <CardFooter className="px-0 pt-4">
              <Button type="submit" disabled={isSubmitting} className="ml-auto">
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

