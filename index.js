const { AoiClient } = require("aoi.js");
const { AoiVoice, PlayerEvents, PluginName, Cacher, Filter } = require("@aoijs/aoi.music");

const client = new AoiClient({
  token: "YOUR TOKEN",
  prefix: "?",
  intents: ["MessageContent", "Guilds", "GuildMessages", "GuildVoiceStates"],
  events: ["onMessage", "onInteractionCreate"],
  database: {
    type: "aoi.db",
    db: require("@aoijs/aoi.db"),
    dbType: "KeyValue",
    tables: ["main"],
    securityKey: "a-32-characters-long-string-here",
  },
});

const voice = new AoiVoice(client, {
  requestOptions: {
    offsetTimeout: 0,
    soundcloudLikeTrackLimit: 200,
  },
  searchOptions: {
   youtubeClient: "WEB"
  }
});


// Command Example (ping)
client.command({
  name: "ping",
  code: `Pong! $pingms`,
});

client.loadCommands("./commands");

// optional (cacher / filter)
voice.addPlugin(PluginName.Cacher, new Cacher("memory" /* or "disk" */));
voice.addPlugin(PluginName.Filter, new Filter({
    filterFromStart: false
})),

 { Manager } = require("@aoijs/aoi.music");

const manager = new Manager({
   devOptions: {
      debug: false, // Set to true for debugging purposes
   },
   searchOptions: {
      soundcloudClientId: "<YOUR_SOUNDCLOUD_CLIENT_ID>",
      youtubeAuth: true, // Options: TRUE or FALSE, default: TRUE
      youtubegl: "<ID>", // default: US
      youtubeClient: "WEB, YTMUSIC", // Options: "WEB" | "ANDROID" | "YTMUSIC_ANDROID" | "YTMUSIC" | "YTSTUDIO_ANDROID" | "TV_EMBEDDED", default: WEB
   },
   requestOptions: {
      offsetTimeout: 1500, // Timeout in milliseconds for searching and skipping, default: 500
      soundcloudLikeTrackLimit: 10, // Limit the number of liked tracks from SoundCloud, default: -1
      youtubePlaylistLimit: 20, // Limit the number of tracks in a YouTube playlist, default: -1
      spotifyPlaylistLimit: 30, // Limit the number of tracks in a Spotify playlist, default: -1
   },
});

voice.bindExecutor(client.functionManager.interpreter);