import twilio from "twilio";

const accountSid = "xx";
const authToken = "xx";

const client = twilio(accountSid, authToken);

const sendWelcomeSms = async (email, password) => {
  const welcomeMessage = `
Bienvenido a Movimientos del Alma.
Para ingresar a la web debes usar:
Usuario: ${email}
Contraseña: ${password}
    `;

  try {
    const smsOptions = {
      from: "xx",
      to: "xx",
      body: welcomeMessage,
    };

    const message = await client.messages.create(smsOptions);
    console.log("Mensaje enviado:", message.sid);
  } catch (error) {
    console.error("Error enviando el mensaje:", error);
  }
};

export default sendWelcomeSms;
