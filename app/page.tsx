import Image from "next/image"

export default function Home() {
  return (
    <div>
      <h1>Welcome to Docenty AI Workshop</h1>
      <Image src="/images/docenty-ai-workshop.webp" alt="Docenty AI Workshop Thumbnail" width={500} height={300} />
      {/* rest of code here */}
    </div>
  )
}
