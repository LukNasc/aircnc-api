const Booking = require('../models/Booking');

module.exports = {
    async store(req, res) {
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;
        let message;
        if (!date) {
            message = 'Você não pode fazer a reserva do spot sem informar a data'
        } else {
            message = 'Solicitação enviada com sucesso'
        }
        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
            message
        });

        await booking.populate('spot').populate('user').execPopulate();

        const ownerSocket = req.connectedUsers[booking.spot.user];
        if (ownerSocket) {
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);

    }
}