const moment = require("moment")
const Discord = require('discord.js');
const client = new Discord.Client();;
const config = require('./config.json');
const { readdirSync } = require('fs'); 
const { join } = require('path'); 

const prefix = `${config.prefix}`

client.on('ready', () => {
    client.user.setActivity('M0NCEDA YAKINDA GELİYOR #2021') //Botun Durumunun Yazılacağı Yer
    console.log(`Bot Aktif! \n Botun Nicki: ${client.user.tag}`)
    client.channels.cache.get(config.seskanal).join()
});

client.commands= new Discord.Collection();
const commandFiles = readdirSync(join(__dirname, "komutlar")).filter(file => file.endsWith(".js")); 

for (const file of commandFiles) {
    const command = require(join(__dirname, "komutlar", `${file}`));
    client.commands.set(command.kod, command); 
}
client.on("message", async message => {
    if(message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        try {
            client.commands.get(command).run(client, message, args);

        } catch (error){}
    }
})

client.on('message', msg => {
  if (msg.content === '.tag') {
    msg.channel.send(`${config.tag}`);
  }
});

client.on('message', msg => {
  if (msg.content === 'tag') {
    msg.channel.send(`${config.tag}`);
  }
});


client.on("guildMemberAdd", async member => {
    
  let kayıtekibi = config.yetkili
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const kurulus = new Date().getTime() - user.createdAt.getTime();  
  const embed = new Discord.MessageEmbed()
  var kontrol;
if (kurulus < 1296000000) kontrol = ' **Şüpheli** '
if (kurulus > 1296000000) kontrol = ' **Güvenli** '
  moment.locale("tr");
 
  //Hoşgeldin Mesajı 

  let yetkili = member.guild.roles.cache.find(x => x.id === "844587282542624790")
  const hgmesajı = new Discord.MessageEmbed()
    .setAuthor("Aramıza Yeni Bir Üye Katıldı!")
    .addField(`Toplam Kişi Sayımız`, `${member.guild.memberCount} Oldu!`)
    .addField(`Güvenlik Durumu`, `${kontrol}`)
    .addField(`Hesap Kuruluş Tarihi`, `${moment(member.user.createdAt).format(" **DD/MMMM/YYYY**")}`)
    .addField(`Kayıt Hakkında`, `Kayıt Olabilmek için Kayıt Odalarına Girip, Kayıt Yetkililerini Beklemelisiniz.`)
    .setFooter("🔱 M0NCEDA")
    .setColor("BLUE")
    .setThumbnail(user.avatarURL({dynamic:true}))  
    .setTimestamp()  
 client.channels.cache.get(config.welcomechat).send(`${user} ${yetkili}`, hgmesajı)
  
//Hoşgeldin Mesajı (Bu kısmı İstediğiniz Gibi Özelleştirebilirsiniz Fakat Sadece "Varinia ⸸" Kısmını Özelliştirmenizi Tavsiye Ederim.)

  });

//otorol , otoisim

  client.on("guildMemberAdd", member => {
    var rol = config.kayıtsız
     member.roles.add(rol)
     member.setNickname("🔱 İsim Yaş") //sunucuya yeni gelicek kişiye verilecek  olan ismi  
     })

//otorol , otoisim

client.login(config.token)