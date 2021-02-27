const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const moment = require("moment");
require("moment-duration-format");
const db = new qdb.table("istatistik");
const mdb = new qdb.table("level");

function numberWithCommas(x) {
	if(!x) return x;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports.execute = async(client, message, args, ayar, emoji) => {
  	let raw = db.get("raw");
	  let embed = new MessageEmbed().setAuthor(message.author.username, message.author.avatarURL({dynamic:true})).setColor("RANDOM").setFooter("No Mercy Milona'yı Seviyor <3").setDescription(`${message.guild.name} sunucusunda son __14 günlük__ kullanıcı aktiflik verileri. \n Bu verilerin kayıt olma şekli Türkiye saati ile yapılmaktadır.`);
	  
	  let data = db.get(`stats.voice.members`);
	  let inday = Object.keys(data[raw.day]).filter(e => message.guild.members.cache.has(e)).sort((a, b) => (Object.values(data[raw.day][b] || {}).reduce((x,y) => Number(x) + Number(y), 0) || 0) - (Object.values(data[raw.day][a] || {}).reduce((x,y) => Number(x) + Number(y), 0)) || 0).splice(0, 5).map((id, index) => `\`${index + 1}.\` <@${id}> \`${moment.duration(Object.values(data[raw.day][id]).reduce((x, y) => Number(x) + Number(y))).format("H [saat,] m [dakika]")}\``);
	  embed.addField("Ses | Günlük Toplam", inday.join("\n") || "Hiç veri yok.");
	  let inweekObject = {};
	  let intwoweekObject = {};
	  Object.keys(data).forEach(day => {
		  if(Number(day) > 14) return;
		  let element = data[day];
		  if(!element) return;
		  Object.keys(element).forEach(id => {
			  let val = Object.values(element[id]).reduce((x,y) => x+y, 0);
			  if(inweekObject[id] && Number(day) <= 7)
				inweekObject[id] += val;
			  else if(Number(day) <= 7)inweekObject[id] = val;
			  
			  if(intwoweekObject[id] && Number(day) <= 14)
				  intwoweekObject[id] += val;
			  else if(Number(day) <= 14)intwoweekObject[id] = val;
		  })
	  });
	  inweekObject = Object.keys(inweekObject).sort((a, b) => (inweekObject[b] || 0) - (inweekObject[a] || 0)).splice(0 ,5).map((val, index) => `\`${index + 1}.\` <@${val}> \`${moment.duration(inweekObject[val]).format("H [saat,] m [dakika]")}\``);
	  intwoweekObject = Object.keys(intwoweekObject).sort((a, b) => (intwoweekObject[b] || 0) - (intwoweekObject[a] || 0)).splice(0 ,5).map((val, index) => `\`${index + 1}.\` <@${val}> \`${moment.duration(intwoweekObject[val]).format("H [saat,] m [dakika]")}\``);
	  embed.addField("Ses | Haftalık Toplam", inweekObject.join("\n") || "Hiçbir veri yok.");
	  embed.addField("Ses | 2 Haftalık Toplam", intwoweekObject.join("\n") || "Hiçbir veri yok.");
	  let data2 = db.get(`stats.text.members`);
	  let indaytext = Object.keys(data2[raw.day]).filter(e => message.guild.members.cache.has(e)).sort((a, b) => (Object.values(data2[raw.day][b] || {}).reduce((x,y) => Number(x) + Number(y), 0) || 0) - (Object.values(data2[raw.day][a] || {}).reduce((x,y) => Number(x) + Number(y), 0)) || 0).splice(0, 5).map((id, index) => `\`${index + 1}.\` <@${id}> \`${Object.values(data2[raw.day][id]).reduce((x, y) => Number(x) + Number(y))} mesaj\``);
	  let inweektextObject = {}, intwoweektextObject = {}, inweektextTotal = 0, intwoweekTotal = 0;
	  Object.keys(data2).forEach(day => {
		  if(Number(day) > 14) return;
		  let element = data2[day];
		  if(!element) return;
		  Object.keys(element).forEach(id => {
			  let val = Object.values(element[id]).reduce((x,y) => Number(x)+Number(y), 0);
			  if(inweektextObject[id] && Number(day) <= 7){
				  inweektextObject[id] += val;
				  inweektextTotal += val;
			  }
			  else if(Number(day) <= 7){
				  inweektextObject[id] = val;
				  inweektextTotal += val;
			  }
			  
			  if(intwoweektextObject[id] && Number(day) <= 14){
				  intwoweektextObject[id] += val;
				  intwoweekTotal += val;
			  }
			  else if(Number(day) <= 14){
				  intwoweektextObject[id] = val;
				  intwoweekTotal += val;
			  }
		  })
	  });
	  inweektextTotal = numberWithCommas(inweektextTotal);
	  intwoweekTotal = numberWithCommas(intwoweekTotal);
	  inweektextObject = Object.keys(inweektextObject).sort((a, b) => (inweektextObject[b] || 0) - (inweektextObject[a] || 0)).splice(0 ,5).map((val, index) => `\`${index + 1}.\` <@${val}> \`${numberWithCommas(inweektextObject[val])} mesaj\``);
	  intwoweektextObject = Object.keys(intwoweektextObject).sort((a, b) => (intwoweektextObject[b] || 0) - (intwoweektextObject[a] || 0)).splice(0 ,5).map((val, index) => `\`${index + 1}.\` <@${val}> \`${numberWithCommas(intwoweektextObject[val])} mesaj\``);
	  embed.addField("Mesaj | Günlük Toplam", indaytext.join("\n") || "Hiçbir veri yok.");
	  embed.addField("Mesaj | Haftalık Toplam", `Toplam Mesaj: \`${inweektextTotal} mesaj\` \n\n ${inweektextObject.join("\n") || "Hiçbir veri yok."}`);
	  embed.addField("Mesaj | 2 Haftalık Toplam", `Toplam Mesaj: \`${intwoweekTotal} mesaj\` \n\n ${intwoweektextObject.join("\n") || "Hiçbir veri yok."}`);
	  embed.setImage("https://cdn.discordapp.com/attachments/791333686674063360/815189113028214794/81267dec1d4578c4a954894cf7609415.gif");
	  message.channel.send(embed);
};
module.exports.configuration = {
    name: "top",
    aliases: ["toplist"],
    usage: "top",
    description: "Top 10 istatistikler."
};