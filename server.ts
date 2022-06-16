import {AuthApiClient, ChatBuilder, KnownChatType, ReplyContent, TalkClient} from 'node-kakao';
import {Translate} from "@google-cloud/translate/build/src/v2";
// @ts-ignore
import Translator from 'papago';

const DEVICE_UUID = ""; // Put the UUID you generated
const DEVICE_NAME = ""; // Any name works here

const EMAIL = ""; // Put your KakaoTalk account email
const PASSWORD = ""; // Put your KakaoTalk account password

const PAPAGO_ID = ""; // Put your Papago API user
const PAPAGO_KEY = ""; // Put your Papago API Key

const CLIENT = new TalkClient();
const translate = new Translate();

async function translateText(text: string) {
    let languageDetection = await translate.detect(text)
    let output = "ko"

    console.log(languageDetection)

    if (languageDetection[0].language === 'ko') output = "en"

    let translator = new Translator(PAPAGO_ID, PAPAGO_KEY)
    return translator.translate(text, languageDetection[0].language, output)
        // @ts-ignore
        .then(res => {
            return res.text
        })
}

CLIENT.on('chat', async (data, channel) => {
    const sender = data.getSenderInfo(channel);

    console.log(data)

    if (!sender) return;

    if ('text' in data && Object.keys(data.attachment()).length === 0) {
        let translation = await translateText(data.text)

        channel.sendChat(
            new ChatBuilder()
                .append(new ReplyContent(data.chat))
                // @ts-ignore
                .text(translation)
                .build(KnownChatType.REPLY)
        )
    }

});

async function main() {
    const api = await AuthApiClient.create(DEVICE_NAME, DEVICE_UUID);
    const loginRes = await api.login({
        email: EMAIL,
        password: PASSWORD,
    });
    if (!loginRes.success) throw new Error(`Web login failed with status: ${loginRes.status}`);

    console.log(`Received access token: ${loginRes.result.accessToken}`);

    const res = await CLIENT.login(loginRes.result);
    if (!res.success) throw new Error(`Login failed with status: ${res.status}`);

    console.log('Login success');
}
main().then();