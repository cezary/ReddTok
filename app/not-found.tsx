import Link from "@/components/link";
 
export default function NotFound() {
  return (
    <div className="h-dvh w-fill">
      <main>
        <div className="flex flex-col items-center justify-center h-dvh bg-static text-white" style={{
        }}>
          <h1 className="text-center text-4xl">404</h1>
          <p className="text-center text-xl">Page not found</p>
          <Link href="/">return home</Link>
        </div>
      </main>
    </div>
  )
}