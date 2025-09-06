import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen flex flex-col">
   
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>

      {/* This is Footer Part */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-4">
        Built with ❤️ by Prince Mishra 
      </footer>
    </div>
  );
}

export default MyApp;
