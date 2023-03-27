import client from '@/libs/server/client';
import { NextApiRequest, NextApiResponse } from 'next';
import withHandler from '@/libs/server/withHandler';
import smtpTransport from '@/libs/server/email';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;
  const name = email.split('@')[0];
  const payload = Math.floor(100000 + Math.random() * 90000) + '';

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            email,
          },
          create: {
            name,
            email,
            about: `안녕하세요 ${name}의 페이지 입니다.`,
          },
        },
      },
    },
  });

	console.log('created token in db')

  const mailOption = {
    from: process.env.MAIL_ID,
    to: email,
    subject: 'movieus 로그인 인증번호입니다.',
    text: `로그인 인증번호는 ${payload}입니다.`,
  };

  const sendMail = await smtpTransport.sendMail(mailOption, (error, res) => {
    if (error) {
      console.log(error);
      return null;
    } else {
      console.log(res);
      return null;
    }
  });

  console.log('mailOption', mailOption);
  console.log('sendMail', sendMail);
  smtpTransport.close();

  return res.json({
    ok: true,
  });
}

export default withHandler({
  methods: ['POST'],
  fn: handler,
  isPrivate: false,
});
