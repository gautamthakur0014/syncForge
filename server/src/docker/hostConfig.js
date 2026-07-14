// docker/hostConfig.js

module.exports ={
  AutoRemove: false,

  // Disable networking
  NetworkMode: "none",

  // Resource limits
  Memory: 256 * 1024 * 1024, // 256 MB
  MemorySwap: 256 * 1024 * 1024, // Disable swap
  NanoCpus: 0.5 * 1e9, // 0.5 CPU
  PidsLimit: 64,

  // Filesystem
  ReadonlyRootfs: true,

  // Writable temporary directory
  Tmpfs: {
    "/tmp": "rw,noexec,nosuid,size=64m",
  },

  // Security
  CapDrop: ["ALL"],
  SecurityOpt: ["no-new-privileges"],

  // Prevent excessive open files
  Ulimits: [
    {
      Name: "nofile",
      Soft: 128,
      Hard: 128,
    },
  ],

  // kernel kill the process if it exceeds memory
  OomKillDisable: false,
};
