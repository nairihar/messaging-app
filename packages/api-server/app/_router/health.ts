export default function (router) {
    router.get('/health', (req, res) => res.status(200).send('OK'));
}
