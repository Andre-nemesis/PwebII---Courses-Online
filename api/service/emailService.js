import nodemailer from 'nodemailer';

const createTestAccountAndSendEmail = async (to, userId) => {
  try {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const resetLink = `http://localhost:3001/reset-password/${userId}`;

    const mailOptions = {
      from: `"Learnify" <${testAccount.user}>`,
      to,
      subject: 'Recuperação de Senha - Learnify',
      html: `
        <h2>Redefinição de Senha</h2>
        <p>Você solicitou a redefinição da sua senha. Clique no link abaixo:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>Se você não solicitou isso, ignore este e-mail.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`E-mail de teste enviado para ${to}`);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    return nodemailer.getTestMessageUrl(info);
  } catch (error) {
    console.error('Erro ao enviar e-mail de teste:', error);
  }
};

export default createTestAccountAndSendEmail;
