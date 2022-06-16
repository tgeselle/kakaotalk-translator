# KakaoTalk Translator
Chat bot that translate messages from Any to Korean and from Korean to English.

![img.png](img.png)

# Installation and Running

You will be required to create a Naver developer account with a Papago API key here: https://developers.naver.com/main/.

You will also need a KakaoTalk account and generate a device UUID.

You can generate a UUID, after cloning the project, with this command: `npx ts-node uuid.ts`

Once you have all the credentials needed, fill the blanks in `server.ts` and start the script with `npx ts-node server.ts`.

Add your account as a friend on KakaoTalk and chat with him. The messages will be translated!
