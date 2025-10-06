export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer 
      className="w-full border-t border-dashed border-gray-500 dark:border-gray-700 flex items-center justify-center text-center py-6 px-4 font-mono text-sm sm:text-base font-semibold">
      <p>
        © {year} — Built with ❤️ by <span className="font-extrabold">Ayomide</span> &{" "}
        <span className="font-extrabold">Ayanfeoluwa</span>
      </p>
    </footer>
  );
}
