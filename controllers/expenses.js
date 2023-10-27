const path = require("path")
const booking = require("../models/expenses")

exports.getbooking = async (req, res, next) => {
    try {
        // const Booking=await booking.findAll();
        // res.json(Booking)
        res.sendFile(path.join(__dirname, "../views/expenses.html"))
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" })
    }
}

exports.getPreviousBookings = async (req, res, next) => {
    try {
        const appointments = await booking.findAll();
        console.log(appointments)
        res.status(200).json({ appointments: appointments })

    } catch (err) {
        console.log(err)
        res.status(500).json({ success: 'false' })
    }
}

exports.postAddbooking = async (req, res, next) => {
    try {
        console.log("post request is succesfully")
        console.log(req.body)
        console.log('hii')

        const epense = req.body.epense;
        const amount = req.body.amount;
        const description = req.body.description;

        const appointmentDetails = await booking.create({
            epense: epense,
            amount: amount,
            description:description
        })

        

        res.status(200).json({ message: "appointment booked successfully", appointmentDetails: appointmentDetails })

    } catch (err) {
        res.status(500).json({success:'false',error:err})
    }

}

exports.Editbooking = async (req, res) => {

    try {
        const { id } = req.params;
const { epense, amount, description } = req.body;
        console.log(req.body)
        const Booking = await booking.findByPk(id)

        if (!Booking) {
            res.status(404).json({ error: "booking is not found" })
            return
        }
        Booking.epense= epense;
        Booking.amount = amount;
        Booking.description = description;
        await Booking.save()
        res.json({message:"edit Item successfully"});
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" })
    }
}

exports.deletebooking = async (req, res) => {
    try {
        const { id } = req.params;
        const Booking = await booking.findByPk(id);

        if (!Booking) {
            res.status(404).json({ error: "Booking not found" });
            return;
        }

        await Booking.destroy();
        res.json({ message: "Booking deleted successfully" });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ error: "Internal server error" });
    }
};
