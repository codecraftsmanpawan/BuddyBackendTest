const Profile = require('../../models/Profile');
const RequestBooking = require('../../models/RequestBooking'); 
const Ride = require('../../models/RideOffer');

// Get profile, booking requests, and ride offers by profile ID
const getProfileDetailsWithBookings = async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the profile
        const profile = await Profile.findById(id)
            .select('name age gender bio location status profilePicture interests') 
            .populate('userId', 'mobile isMobileVerified isEmailVerified') 
            .exec();

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Fetch ride offers where the driver matches the profile ID
        const rideOffers = await Ride.find({ driver: id })
            .populate('vehicle')  // Ensure 'vehicle' is a valid reference in Ride schema
            .exec();

        // Fetch booking requests associated with the profile
        const bookingRequests = await RequestBooking.find({ userProfile: id })
            .populate('offerRide') // Ensure 'offerRide' is a valid reference in RequestBooking schema
            .exec();

        // Prepare the response with offerRide data
        const formattedBookingRequests = bookingRequests.map(request => ({
            ...request.toObject(),
            offerRide: request.offerRide || null // Ensure offerRide is explicitly null if not present
        }));

        // Prepare the response
        res.status(200).json({
            profile,
            rideOffers,
            bookingRequests: formattedBookingRequests
        });
    } catch (error) {
        console.error("Error fetching profile details:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getProfileDetailsWithBookings,
};
