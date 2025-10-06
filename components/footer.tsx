export default function Footer() {
  const now = new Date
  const year = now.getFullYear()
  return (
    <div className="w-full h-22 border-t-2 border-dashed border-gray-500 flex items-center justify-center font-black font-mono text-xl text-center px-10">
      <p>Copyright © {year} — About The Authors — Ayomide and Ayanfeoluwa</p>
    </div>
  );
}
