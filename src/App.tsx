import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import AuthPage from "./pages/AuthPage";
import ReaderPage from "./pages/ReaderPage";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  const [user, setUser] = useState<null | object | undefined>(undefined); // undefined = loading

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ?? null);
    });
    return () => unsubscribe();
  }, []);

  // Optional: loading screen
  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <>
      <ThemeToggle />
      {user ? <ReaderPage /> : <AuthPage />}
    </>
  );
}

export default App;
