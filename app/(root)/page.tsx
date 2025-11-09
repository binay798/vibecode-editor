import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import "./home.css";
import UserButton from "@/features/auth/components/user-button";
// export default function Home() {
//   return (
//     <div classNameName=" z-20 flex flex-col items-center justify-start min-h-screen py-2 mt-10">
//       <div classNameName="flex flex-col justify-center items-center my-5">
//         <Image src={"/hero.svg"} alt="Hero-Section" height={500} width={500} />

//         <h1 classNameName=" z-20 text-6xl mt-5 font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 dark:from-rose-400 dark:via-red-400 dark:to-pink-400 tracking-tight leading-[1.3] ">
//           Vibe Code With with Intelligence
//         </h1>
//       </div>

//       <p classNameName="mt-2 text-lg text-center text-gray-600 dark:text-gray-400 px-5 py-10 max-w-2xl">
//         VibeCode Editor is a powerful and intelligent code editor that enhances
//         your coding experience with advanced features and seamless integration.
//         It is designed to help you write, debug, and optimize your code
//         efficiently.
//       </p>
//       <Link href={"/dashboard"}>
//         <Button variant={"brand"} classNameName="mb-4" size={"lg"}>
//           Get Started
//           <ArrowUpRight classNameName="w-3.5 h-3.5" />
//         </Button>
//       </Link>
//     </div>
//   );
// }

export default function Home() {
  return (
    <div>
      <div className="grid-bg"></div>
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>

      <header>
        <div className="logo">
          <div className="logo-icon">⚡</div>
          DevFlow
        </div>
        <nav>
          <UserButton />
        </nav>
      </header>

      <section className="hero">
        <h1>
          Code Anywhere,
          <br />
          <span className="gradient-text">Deploy Instantly</span>
        </h1>
        <p>
          A powerful browser-based development environment powered by
          WebContainer technology. Build, test, and deploy full-stack
          applications without any setup—right from your browser.
        </p>
        <div className="cta-buttons ">
          <a href="/dashboard" className="btn-large btn-gradient">
            Start Coding Now
          </a>
          <button className="btn-large btn-outline">View Demo</button>
        </div>

        <div className="illustration">
          <div className="browser-window">
            <div className="browser-header">
              <div className="browser-dot dot-red"></div>
              <div className="browser-dot dot-yellow"></div>
              <div className="browser-dot dot-green"></div>
            </div>
            <div className="browser-content">
              <div className="sidebar">
                <div className="folder">📁 src</div>
                <div className="folder" style={{ paddingLeft: 24 }}>
                  📄 App.jsx
                </div>
                <div className="folder" style={{ paddingLeft: 24 }}>
                  📄 index.js
                </div>
                <div className="folder">📁 components</div>
                <div className="folder">📁 public</div>
                <div className="folder">📄 package.json</div>
              </div>
              <div className="code-editor">
                <div className="code-line">
                  <span className="line-number">1</span>
                  <span className="code-text">
                    <span className="keyword">import</span> React{" "}
                    <span className="keyword">from</span>{" "}
                    <span className="string">{"react"}</span>;
                  </span>
                </div>
                <div className="code-line">
                  <span className="line-number">2</span>
                  <span className="code-text"></span>
                </div>
                <div className="code-line">
                  <span className="line-number">3</span>
                  <span className="code-text">
                    <span className="keyword">function</span>{" "}
                    <span className="function">App</span>() {"{"}
                  </span>
                </div>
                <div className="code-line">
                  <span className="line-number">4</span>
                  <span className="code-text">
                    {" "}
                    <span className="keyword">return</span> (
                  </span>
                </div>
                <div className="code-line">
                  <span className="line-number">5</span>
                  <span className="code-text">
                    {" "}
                    &lt;<span className="function">div</span>{" "}
                    <span className="keyword">classNameName</span>=
                    <span className="string">{"app"}</span>&gt;
                  </span>
                </div>
                <div className="code-line">
                  <span className="line-number">6</span>
                  <span className="code-text">
                    {" "}
                    &lt;<span className="function">h1</span>&gt;Hello
                    DevFlow!&lt;/<span className="function">h1</span>&gt;
                  </span>
                </div>
                <div className="code-line">
                  <span className="line-number">7</span>
                  <span className="code-text">
                    {" "}
                    &lt;/<span className="function">div</span>&gt;
                  </span>
                </div>
                <div className="code-line">
                  <span className="line-number">8</span>
                  <span className="code-text"> );</span>
                </div>
                <div className="code-line">
                  <span className="line-number">9</span>
                  <span className="code-text">{"}"}</span>
                </div>
                <div className="code-line">
                  <span className="line-number">10</span>
                  <span className="code-text"></span>
                </div>
                <div className="code-line">
                  <span className="line-number">11</span>
                  <span className="code-text">
                    <span className="keyword">export default</span> App;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Instant Setup</h3>
          <p>
            Start coding immediately with zero configuration. No installations,
            no setup—just open and build.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🌐</div>
          <h3>Full-Stack Development</h3>
          <p>
            Build complete applications with Node.js, npm packages, and modern
            frameworks—all in your browser.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>Live Preview</h3>
          <p>
            See your changes instantly with hot module replacement and real-time
            collaboration features.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure Sandboxing</h3>
          <p>
            WebContainer technology ensures your code runs securely in an
            isolated environment.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📦</div>
          <h3>npm Integration</h3>
          <p>
            Access millions of npm packages instantly. Install dependencies
            without leaving your browser.
          </p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💾</div>
          <h3>Cloud Storage</h3>
          <p>
            Your projects are automatically saved and synced across all your
            devices.
          </p>
        </div>
      </section>
    </div>
  );
}
