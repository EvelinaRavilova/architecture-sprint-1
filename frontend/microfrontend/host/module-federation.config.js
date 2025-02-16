module.exports = {
  mfConfig: {
    name: "host",
    exposes: {},
    shared: ["react", "react-dom"],
    remotes: {
      'auth': 'auth@http://localhost:8091/auth.js',
      'profile': 'profile@http://localhost:8092/profile.js',
      'feed': 'feed@http://localhost:8093/feed.js',
    }
  }
}
