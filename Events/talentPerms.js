const { MessageEmbed } = require("discord.js");
const conf = require('../ayarlar.json');
const qdb = require("quick.db");
const cdb = new qdb.table("cezalar");
const db = new qdb.table("ayarlar");
const client = global.client;

client.komutlar = [
  {isim: "vip", rol: "814911350274129957"},
  {isim: "elite", rol: "814911350274129957"},
  {isim: "important", rol: "814911350274129957"},
  {isim: "rapper", rol: "814911350274129957"},
  {isim: "beatboxer", rol: "814911350241362029"},
  {isim: "vocalist", rol: "814911350261940226"},
  {isim: "gitarist", rol: "814911350261940227"},
  {isim: "kemanist", rol: "814911350241362028"},
  {isim: "piyanist", rol: "814911350261940224"},
  {isim: "designer", rol: "815155789295517717"},
  {isim: "gamer", rol: "815155789395525642"},
  {isim: "intro-maker", rol: "815155786699112478"},
  {isim: "poet", rol: "814911350261940225"},
  {isim: "painter", rol: "814911350241362027"},
  {isim: "instagram-user", rol: "814911350241362027"},
  {isim: "lovers", rol: "814911350261940231"},
  {isim: "sap", rol: "814911350261940232"},
  {isim: "ekip", rol: "814911350241362026"},
  {isim: "terapist", rol: "815155785876635669"},
  {isim: "rehber", rol: "815155785646473246"},
  {isim: "uyarı1", rol: "814911350207545363"},
  {isim: "uyarı2", rol: "814911350207545364"},
  {isim: "uyarı3", rol: "814911350207545365"},
  {isim: "streamer", rol: "802153129583968290"},
  {isim: "yetkilial1", rol: "814911350358278155"},
  {isim: "yetkilial2", rol: "814911350328524888"},
  {isim: "yetkilial3", rol: "814911350328524886"},
  {isim: "teyitver", rol: "814911350358278155"},
];

module.exports = (message) => {
  if (!message.content.startsWith(conf.prefix)) return;
  let ayar = db.get('ayar') || {};
  let args = message.content.substring(conf.prefix.length).split(" ");
  let command = args[0];
  args = args.splice(1);
  let uye = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  if (!uye) return;
  let komut = client.komutlar.find(k => k.isim === command);
  if (komut && (komut.isim === "yetkilial1" || komut.isim === "yetkilial2" || komut.isim === "yetkilial3")) {
    if (!message.member.roles.cache.has("814911350328524884") && !message.member.roles.cache.has(ayar.sahipRolu) && !conf.sahip.some(id => message.author.id === id)) return;
    uye.roles.add([komut.rol, "814911350358278155", "814911350358278159", "814911350358278160"]);
    return message.react(client.emojiler.onay);
  };

  if (komut && (komut.isim === "teyitver")) {
    if (!message.member.roles.cache.has("814911350358278158") && !message.member.roles.cache.has(ayar.sahipRolu) && !conf.sahip.some(id => message.author.id === id)) return;
    uye.roles.add(["814911350358278155", "814911350358278155"]);
    return message.react(client.emojiler.onay);
  };

  if (komut && komut.isim === "terapist") {
  if (!message.member.roles.cache.has("815155785876635669") && !message.member.roles.cache.has(ayar.sahipRolu) && !conf.sahip.some(id => message.author.id === id)) return;
    uye.roles.cache.has(komut.rol) ? uye.roles.remove(komut.rol) : uye.roles.add(komut.rol);
    return message.react(client.emojiler.onay);
  };
  if (komut && (komut.isim === "rehber" || komut.isim === "uyarı1" || komut.isim === "uyarı2" || komut.isim === "uyarı3")) {
  if (!message.member.roles.cache.has("815155785646473246") && !message.member.roles.cache.has(ayar.sahipRolu) && !conf.sahip.some(id => message.author.id === id)) return;
    uye.roles.cache.has(komut.rol) ? uye.roles.remove(komut.rol) : uye.roles.add(komut.rol);
    return message.react(client.emojiler.onay);
  };
  if (komut && (komut.isim === "streamer" || komut.isim === "youtuber" || komut.isim === "coder" || komut.isim === "famous")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    uye.roles.cache.has(komut.rol) ? uye.roles.remove(komut.rol) : uye.roles.add(komut.rol);
    return message.react(client.emojiler.onay);
  };

  if (komut && (komut.isim === "elite")) {
    if (!message.member.hasPermission("ADMINISTRATOR")) return;
    uye.roles.cache.has(komut.rol) ? uye.roles.remove(komut.rol) : uye.roles.add(komut.rol);
    return message.react(client.emojiler.onay);
  };
  if (!message.member.roles.cache.has("814911350308208664") && !message.member.roles.cache.has(ayar.sahipRolu) && !conf.sahip.some(id => message.author.id === id)) return;
  if (!uye || !komut) return;
  uye.roles.cache.has(komut.rol) ? uye.roles.remove(komut.rol).catch() : uye.roles.add(komut.rol).catch();
  return message.react(client.emojiler.onay);
};

module.exports.configuration = {
  name: "message"
};