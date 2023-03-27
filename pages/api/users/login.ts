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

  await new Promise((resolve, reject) => {
    // verify connection configuration
    smtpTransport.verify(function (error, success) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log('Server is ready to take our messages');
        resolve(success);
      }
    });
  });

  console.log('created token in db');

  const mailOption = {
    from: process.env.MAIL_ID,
    to: email,
    subject: 'movieus 로그인 인증번호입니다.',
    html: `
		<div style='width: 80%; text-align: center; padding: 16px; background-color: #eee; border-radius: 12px;'>
		<h1>Welcome to Movieus</h1>
		<h3>로그인 인증번호는 ${payload}입니다.</h3>
		<p>홈페이지로 돌아가 인증번호를 입력해주세요.</p>
		<p>위 번호는 1회 인증 후 폐기됩니다.</p>
		</div>
		`,
  };

  await new Promise((resolve, reject) => {
    // send mail
    smtpTransport.sendMail(mailOption, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });

  // const sendMail = await smtpTransport.sendMail(mailOption, (error, data) => {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     console.log('response', data);
  //   }
  //   smtpTransport.close();
  // });

  return res.json({
    ok: true,
  });
}

export default withHandler({
  methods: ['POST'],
  fn: handler,
  isPrivate: false,
});
