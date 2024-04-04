
const accountSid = "AC0348070fe97afe239d512048a0d9bffe";
const authToken = "d7f1baea867fe2db11e4cd2025eb2dea";
const client = require('twilio')(accountSid, authToken);

export const sendWhatsAppMessage = async (to: string, message: string) => {
  try {
    await client.messages.create({
      body: message,
      from: "whatsapp:+12512929487",
      to: `whatsapp:${to}`,
    });
    console.log("Pesan WhatsApp berhasil dikirim.");
  } catch (error) { 
    console.error("Error saat mengirim pesan WhatsApp:", error);
  }
};