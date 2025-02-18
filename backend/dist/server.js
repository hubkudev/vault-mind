import Fastify from 'fastify';
import 'dotenv/config';
const server = Fastify({
    logger: true
});
// Basic route
server.get('/', async (request, reply) => {
    return { hello: 'world' };
});
try {
    server.listen({
        host: "0.0.0.0",
        port: 5001,
    });
}
catch (err) {
    server.log.error(err);
    process.exit(1);
}
