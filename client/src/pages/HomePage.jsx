import React from "react";
import { Link } from "react-router";
import { ArrowRight, Users, Zap, Terminal,Play, Circle } from "lucide-react";

const GithubMark = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.87-1.54-3.87-1.54-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.2.67.8.56A11.51 11.51 0 0 0 23.5 12c0-6.35-5.15-11.5-11.5-11.5Z" />
  </svg>
);

const editorTabs = ["app.js", "server.js", "README.md"];

const code = [
  "import express from 'express';",
  "import { Server } from 'socket.io';",
  "",
  "const app = express();",
  "const io = new Server(server);",
  "",
  "io.on('connection', (socket) => {",
  "  socket.join(roomId);",
  "  socket.emit('sync', state);",
  "",
  "  socket.on('code:update', update => {",
  "    socket.to(roomId).emit('code:update', update);",
  "  });",
  "});",
  "",
  "server.listen(3000);",
];

const features = [
  {
    icon: Users,
    title: "Real-time Collaboration",
    description:
      "Simultaneous editing with shared cursors, presence awareness and conflict-free synchronization powered by Yjs.",
  },
  {
    icon: Terminal,
    title: "Docker Code Execution",
    description:
      "Execute code inside isolated Docker containers with stdin support and synchronized output for every participant.",
  },
  {
    icon: ArrowRight,
    title: "One-click Rooms",
    description:
      "Create or join collaborative sessions instantly using lightweight room IDs with automatic state synchronization.",
  },
];

const stack = [
  {
    name: "React",
    badge: "R",
  },
  {
    name: "Monaco",
    badge: "M",
  },
  {
    name: "Yjs",
    badge: "Y",
  },
  {
    name: "Socket.IO",
    badge: "S",
  },
  {
    name: "Docker",
    badge: "D",
  },
  {
    name: "Express",
    badge: "E",
  },
  {
    name: "Node.js",
    badge: "N",
  },
];


const steps = [
  "Create Room",
  "Share Room ID",
  "Collaborate",
  "Run Code",
  "View Output",
];


const HomePage = () => {
  return (
    <main className="min-h-screen bg-[#0d1117] text-zinc-100">
      {/* ---------------- NAVBAR ---------------- */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold tracking-tight"
          >
            {/* <div className="flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900">
            </div> */}

            <span className="font-['Space_Grotesk'] text-2xl">
              syncForge
            </span>
          </Link>

          <a
            href="https://github.com/gautamthakur0014/syncForge"
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm transition-colors hover:border-zinc-600 hover:bg-zinc-900"
          >
            <GithubMark className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </header>
      {/* ---------------- HERO ---------------- */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-[1.25fr_.9fr]">
          {/* Left */}

          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1 text-sm text-zinc-400">
              
              Real-time collaborative code editor
            </div>

            <h1 className="max-w-3xl font-['Space_Grotesk'] text-5xl font-bold leading-tight tracking-tight lg:text-7xl">
              Code together.
              <br />
              Run instantly.
              <br />
              Stay in sync.
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">
              Build software collaboratively with synchronized editing,
              Docker-powered execution, shared rooms, and instant updates—
              designed for developers who work together.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/Playground"
                className="inline-flex items-center gap-2 rounded-lg bg-[#2F81F7] px-5 py-3 text-sm font-medium transition-colors hover:bg-[#1f6fe0]"
              >
                <Play size={18} />
                Launch Editor
              </Link>

              <a
                href="https://github.com/gautamthakur0014/syncForge"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-5 py-3 text-sm hover:bg-zinc-900"
              >
                <GithubMark className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>

          {/* Right */}

          <div>
            <div className="overflow-hidden rounded-lg border border-zinc-800 bg-[#11161c]">
              {/* Window */}

              <div className="flex items-center justify-between border-b border-zinc-800 bg-[#0d1117] px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="h-3 w-3 rounded-full bg-green-500" />
                </div>

                <div className="text-xs text-zinc-500">
                  syncForge • Collaborative Session
                </div>

                <div />
              </div>

              {/* Tabs */}

              <div className="flex border-b border-zinc-800 bg-[#161b22] text-sm">
                {editorTabs.map((tab, index) => (
                  <div
                    key={tab}
                    className={`border-r border-zinc-800 px-4 py-3 ${
                      index === 0 ? "bg-[#0d1117] text-white" : "text-zinc-500"
                    }`}
                  >
                    {tab}
                  </div>
                ))}
              </div>

              {/* Editor */}

              <div className="relative bg-[#0d1117]">
                <div className="flex font-['JetBrains_Mono'] text-[13px] leading-7">
                  {/* Line numbers */}

                  <div className="select-none border-r border-zinc-800 px-4 py-4 text-right text-zinc-600">
                    {code.map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>

                  {/* Code */}

                  <div className="relative flex-1 px-6 py-4 text-zinc-300">
                    {code.map((line, i) => (
                      <div key={i}>{line || " "}</div>
                    ))}

                    {/* Cursor 1 */}

                    <div
                      className="absolute"
                      style={{
                        top: 150,
                        left: 245,
                      }}
                    >
                      <div className="absolute -top-6 rounded bg-[#2F81F7] px-2 py-0.5 text-[10px] font-semibold text-white">
                        Gautam
                      </div>

                      <div className="h-6 w-0.5 bg-[#2F81F7]" />
                    </div>

                    {/* Cursor 2 */}

                    <div
                      className="absolute"
                      style={{
                        top: 255,
                        left: 160,
                      }}
                    >
                      <div className="absolute -top-6 rounded bg-[#2EA043] px-2 py-0.5 text-[10px] font-semibold text-white">
                        Alex
                      </div>

                      <div className="h-6 w-0.5 bg-[#2EA043]" />
                    </div>

                    {/* Cursor 3 */}

                    <div
                      className="absolute"
                      style={{
                        top: 195,
                        left: 345,
                      }}
                    >
                      <div className="absolute -top-6 rounded bg-orange-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                        Sarah
                      </div>

                      <div className="h-6 w-0.5 bg-orange-500" />
                    </div>
                  </div>
                </div>

                {/* Console */}

                <div className="border-t border-zinc-800 bg-[#11161c] px-5 py-4 font-['JetBrains_Mono'] text-xs">
                  <div className="mb-2 text-zinc-500">$ node server.js</div>

                  <div className="text-[#2EA043]">
                    ✓ Server listening on localhost:3000
                  </div>

                  <div className="text-zinc-400">
                    Room connected • 3 collaborators
                  </div>
                </div>

                {/* Status Bar */}

                <div className="flex items-center justify-between border-t border-zinc-800 bg-[#161b22] px-4 py-2 text-xs text-zinc-500">
                  <div className="flex items-center gap-4">
                    <span>JavaScript</span>
                    <span>UTF-8</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users size={14} />
                    <span>3 Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom info */}

            <div className="mt-5 flex items-center justify-between text-sm text-zinc-500">
              <span>Monaco Editor</span>

              <span className="inline-flex items-center gap-2">
                <Circle size={8} fill="#2EA043" className="text-[#2EA043]" />
                Live synchronized
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
            {/* ---------------------------------------------------------------- */}
            {/* LEFT CONTENT                                                     */}
            {/* ---------------------------------------------------------------- */}

            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#2F81F7]">
                Live Collaboration
              </p>

              <h2 className="font-['Space_Grotesk'] text-4xl font-bold tracking-tight">
                One workspace.
                <br />
                Every developer.
              </h2>

              <p className="mt-6 max-w-lg leading-8 text-zinc-400">
                syncForge keeps every collaborator perfectly synchronized.
                Cursor movement, edits, room state, input, execution and
                terminal output stay consistent across every connected client.
              </p>

              <div className="mt-10 space-y-6">
                {[
                  {
                    title: "Shared editing",
                    desc: "Powered by CRDT synchronization so everyone edits the same document without conflicts.",
                  },
                  {
                    title: "Instant execution",
                    desc: "Run code inside isolated Docker containers and stream results back to everyone in the room.",
                  },
                  {
                    title: "Presence awareness",
                    desc: "See collaborators, cursor positions and active typing in real time.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 border-l border-zinc-700 pl-4"
                  >
                    <div className="mt-2 h-2 w-2 rounded-full bg-[#2F81F7]" />

                    <div>
                      <h3 className="font-medium">{item.title}</h3>

                      <p className="mt-1 text-sm leading-7 text-zinc-500">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* RIGHT PREVIEW                                                    */}
            {/* ---------------------------------------------------------------- */}

            <div className="overflow-hidden rounded-lg border border-zinc-800 bg-[#0d1117]">
              {/* Header */}

              <div className="flex items-center justify-between border-b border-zinc-800 bg-[#11161c] px-5 py-3">
                <div className="flex items-center gap-3">
                  <span className="font-medium">Room</span>

                  <span className="rounded border border-zinc-700 px-2 py-1 font-mono text-xs">
                    6K9J-A2Q
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-zinc-500">
                  <span>3 collaborators</span>

                  <div className="flex -space-x-2 text-white">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#0d1117] bg-[#2F81F7] text-[11px] font-semibold">
                      G
                    </div>

                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#0d1117] bg-[#2EA043] text-[11px] font-semibold">
                      A
                    </div>

                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#0d1117] bg-orange-500 text-[11px] font-semibold">
                      S
                    </div>
                  </div>
                </div>
              </div>

              {/* Code */}

              <div className="relative border-b border-zinc-800 bg-[#0d1117] px-6 py-6 font-['JetBrains_Mono'] text-[13px] leading-7 text-zinc-300">
                <div className="text-zinc-500">
                  1&nbsp;&nbsp;function execute(code) {"{"}
                </div>

                <div>
                  <span className="text-zinc-500">2</span>
                  &nbsp;&nbsp;&nbsp;&nbsp;return docker.run(code);
                </div>

                <div className="text-zinc-500">3 {"}"}</div>

                <div className="mt-2">
                  <span className="text-zinc-500">4</span>
                  &nbsp;&nbsp;execute(source);
                </div>

                {/* Cursor */}

                <div
                  className="absolute"
                  style={{
                    top: 64,
                    left: 235,
                  }}
                >
                  <div className="absolute -top-6 rounded bg-[#2F81F7] px-2 py-0.5 text-[10px] text-white">
                    Gautam
                  </div>

                  <div className="h-6 w-0.5 bg-[#2F81F7]" />
                </div>

                <div
                  className="absolute"
                  style={{
                    top: 120,
                    left: 150,
                  }}
                >
                  <div className="absolute -top-6 rounded bg-[#2EA043] px-2 py-0.5 text-[10px] text-white">
                    Alex
                  </div>

                  <div className="h-6 w-0.5 bg-[#2EA043]" />
                </div>

                <div
                  className="absolute"
                  style={{
                    top: 175,
                    left: 305,
                  }}
                >
                  <div className="absolute -top-6 rounded bg-orange-500 px-2 py-0.5 text-[10px] text-white">
                    Sarah
                  </div>

                  <div className="h-6 w-0.5 bg-orange-500" />
                </div>

                {/* Typing */}

                <div className="mt-10 flex items-center gap-2 text-xs text-zinc-500">
                  <div className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2EA043]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2EA043]" />
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#2EA043]" />
                  </div>
                  Alex is typing...
                </div>
              </div>

              {/* Shared Terminal */}

              <div className="border-b border-zinc-800 bg-[#11161c] px-5 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-medium">Shared Terminal</span>

                  <span className="text-xs text-zinc-500">
                    Docker Container
                  </span>
                </div>

                <div className="space-y-2 font-['JetBrains_Mono'] text-xs">
                  <div className="text-zinc-500">$ node server.js</div>

                  <div className="text-[#2EA043]">✓ Server started</div>

                  <div className="text-zinc-300">Listening on :3000</div>

                  <div className="text-zinc-300">GET /api/execute 200</div>

                  <div className="text-zinc-300">Room synchronized</div>
                </div>
              </div>

              {/* Footer */}

              <div className="flex items-center justify-between bg-[#0d1117] px-5 py-3 text-xs text-zinc-500">
                <span>JavaScript</span>

                <div className="flex items-center gap-5">
                  <span>Docker Ready</span>

                  <span>Yjs Connected</span>

                  <span>Socket.IO Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-6 py-24">
          {/* --------------------------------------------------------- */}
          {/* Heading                                                    */}
          {/* --------------------------------------------------------- */}

          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#2F81F7]">
              Features
            </p>

            <h2 className="font-['Space_Grotesk'] text-4xl font-bold tracking-tight">
              Built for collaborative development.
            </h2>

            <p className="mt-5 leading-8 text-zinc-400">
              Everything needed for teams to write, execute and iterate on code
              together in a shared environment.
            </p>
          </div>

          {/* --------------------------------------------------------- */}
          {/* Cards                                                      */}
          {/* --------------------------------------------------------- */}

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="border border-zinc-800 bg-[#0d1117] p-6"
              >
                <feature.icon size={19} className="mb-5 text-[#2F81F7]" />

                <h3 className="text-lg font-semibold">{feature.title}</h3>

                <p className="mt-3 text-sm leading-7 text-zinc-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------- */}
      {/* CTA                                                                        */}
      {/* -------------------------------------------------------------------------- */}
      <section className="border-t border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-28">
          <div className="border border-zinc-800 bg-[#0d1117] px-8 py-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-[#2F81F7]">
              Get Started
            </p>

            <h2 className="font-['Space_Grotesk'] text-4xl font-bold tracking-tight md:text-5xl">
              Ready to code together?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
              Create a room, invite your teammates and start building in a
              synchronized development environment with instant execution.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/Playground"
                className="inline-flex items-center gap-2 rounded-lg bg-[#2F81F7] px-5 py-3 text-sm font-medium transition-colors hover:bg-[#1f6fe0]"
              >
                Launch Editor
                <ArrowRight size={18} />
              </Link>

              <a
                href="https://github.com/gautamthakur0014/syncForge"
                className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-5 py-3 text-sm transition-colors hover:bg-zinc-900"
              >
                <GithubMark className="h-4 w-4" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* -------------------------------------------------------------------------- */}
      {/* FOOTER                                                                     */}
      {/* -------------------------------------------------------------------------- */}
      <footer className="border-t border-zinc-800">
        {/* Bottom Bar */}

        <div className="border-t border-zinc-800">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-sm text-zinc-500 md:flex-row">
            <p>© {new Date().getFullYear()} syncForge. All rights reserved.</p>

            <div className="flex items-center gap-6">
              <a
                href="https://github.com/gautamthakur0014/syncForge"
                className="transition-colors hover:text-zinc-200"
              >
                GitHub
              </a>

              
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
