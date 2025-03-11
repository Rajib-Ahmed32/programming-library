import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Library, Upload } from "lucide-react";
import { Home } from "./pages/Home";
import { ReadBook } from "./pages/ReadBook";
import { UploadBook } from "./pages/UploadBook";
import fullLogo from "../asset/fullLogo.png";
import { IoIosLogOut } from "react-icons/io";
import { FaGithub } from "react-icons/fa";
import {
  auth,
  githubProvider,
  signInWithPopup,
  signOut,
} from "./firebaseConfig/firebaseConfig";
import { GithubAuthProvider } from "firebase/auth";

function App() {
  interface User {
    name: string | null;
    email: string | null;
    avatar: string | null;
  }

  const [user, setUser] = useState<User | null>(null);
  const [userToken, setUserToken] = useState("");

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const userData = result.user;

      setUserToken(token);

      // set user in session storage
      sessionStorage.setItem("userToken", JSON.stringify(token));
      sessionStorage.setItem(
        "displayName",
        JSON.stringify(userData.displayName)
      );
      sessionStorage.setItem("avatar", JSON.stringify(userData.photoURL));
      sessionStorage.setItem("email", JSON.stringify(userData.email));
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error during login:", error.message);
      }
    }
  };

  // Get User from session storage

  useEffect(() => {
    if (userToken) {
      setUser({
        name: JSON.parse(sessionStorage.getItem("displayName") || ""),
        email: JSON.parse(sessionStorage.getItem("email") || ""),
        avatar: JSON.parse(sessionStorage.getItem("avatar") || ""),
      });
    }
  }, []);

  // Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      sessionStorage.clear();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error during logout:", error.message);
      }
    }
  };
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-r from-black to-gray-800">
        <nav className="bg-black border-b border-zinc-800 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex justify-between">
                <div className="flex-shrink-0 flex items-center">
                  <img className="h-6 w-auto" src={fullLogo} alt="logo" />
                </div>
                <div className="sm:ml-6 sm:flex sm:space-x-8 flex items-center">
                  <a
                    href="/"
                    className="flex items-center px-1 pt-1 text-zinc-300 hover:text-white transition-colors"
                  >
                    <Library className="h-5 w-5 mr-1 text-[#00C66C]" />
                    Library
                  </a>
                  {user?.email === "mithuncy01@gmail.com" && (
                    <a
                      href="/upload"
                      className="flex items-center px-1 pt-1 text-zinc-300 hover:text-white transition-colors"
                    >
                      <Upload className="h-5 w-5 mr-1 text-[#00C66C]" />
                      Upload
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-center">
                {!user ? (
                  <div>
                    <button
                      onClick={handleLogin}
                      className="bg-gray-900 text-white px-3 py-1 rounded-md flex items-center gap-2"
                    >
                      <FaGithub className="text-white" />
                      Signin with Github
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1">
                    <div className="flex items-center ">
                      <img
                        src={user.avatar}
                        alt="photo"
                        className="h-16 w-auto rounded-full"
                      />
                    </div>
                    <button
                      onClick={handleLogout}
                      className="bg-gray-900 text-white px-3 py-1 rounded-md flex items-center gap-1"
                    >
                      Signout
                      <IoIosLogOut className="text-red-500 w-5 h-auto" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/read/:id" element={<ReadBook />} />
            <Route path="/upload" element={<UploadBook />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
