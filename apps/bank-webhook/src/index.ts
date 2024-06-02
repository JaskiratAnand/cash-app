import { z } from 'zod';
import Fastify from 'fastify'
import db from "@repo/db/client"

const fastify = Fastify({ logger: true });

const paymentInfoSchema = z.object({
    token: z.string(),
    userId: z.string(),
    amount: z.string(),
});

fastify.get('/', (request, reply) => {
    reply.status(200).send({
        message: "Server Healthy"
    })
})

fastify.post('/hdfcWebhook', async (request, reply) => {
    const paymentInfo = paymentInfoSchema.parse(request.body);
    try {
        console.log("processing transaction...")
        await db.$transaction([
            db.balance.updateMany({
                where: {
                    userId: Number(paymentInfo.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInfo.amount)
                    }
                }
            }),
            db.onRampTransaction.updateMany({
                where: {
                    token: paymentInfo.token,
                },
                data: {
                    status: "Success"
                }  
            })  
        ]);

        reply.status(200).send({ message: "Captured" });
    } catch (err) {
        try {
            await db.onRampTransaction.update({
                where: {
                    token: paymentInfo.token,
                },
                data: {
                    status: "Failure"
                }
            });
        } catch (updateErr) {
            fastify.log.error('Failed to update onRampTransaction status to Failure', updateErr);
        }

        if(err instanceof z.ZodError) {
            reply.status(400).send({
                error: "Invalid request payload",
                details: err.errors,
            });
        } else {
            reply.status(500).send({
                error: "Internal server error",
                details: err
            });
        }
    }
});



fastify.listen({ port: 3003 }, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    fastify.log.info(`Server listening at ${address}`);
});