import Header from "@/components/Header";
import VideoGrid from "@/components/VideoGrid";

export default function HomePage() {
  return (
      <div className="bg-teal-800 min-h-screen text-white">
        <Header />
        <h1 className="text-3xl font-bold text-center mt-10">Ambient Background Videos</h1>
        <VideoGrid />
      </div>
  );
}