
import { Toaster } from "@/components/ui/toaster"
import ProfileEditor from "./components/EditorForm"

export default function Page() {
  return (
    <div className="container py-10">
      <ProfileEditor />
      <Toaster />
    </div>
  )
}

