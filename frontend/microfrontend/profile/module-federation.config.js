module.exports = {
  mfConfig: {
    name: "profile",
    exposes: {
      './Profile': './src/components/Profile.jsx'
    },
    shared: ["react", "react-dom"],
    remotes: {
      'feed': 'feed@http://localhost:8093/feed.js',
    }
  }
}
