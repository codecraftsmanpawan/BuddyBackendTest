const Contract = require('../../models/Contract');
const Profile = require('../../models/Profile');

// Create Contract
const createContract = async (req, res) => {
    try {
        const { profileId, startDateTime, endDateTime } = req.body;

        // Ensure the profile exists
        const profile = await Profile.findById(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Create the contract
        const contract = new Contract({
            profileId,
            startDateTime,
            endDateTime
        });

        await contract.save();
        return res.status(201).json(contract);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Join Contract
const joinContract = async (req, res) => {
    try {
        const { contractId } = req.params;
        const contract = await Contract.findOne({ _id: contractId });

        if (!contract) {
            return res.status(404).json({ message: 'Contract not found' });
        }

        if (contract.join) {
            return res.status(400).json({ message: 'You have already joined this contract' });
        }

        // Update join status and join date/time
        contract.join = true;
        contract.joinDateTime = new Date();

        await contract.save();
        return res.status(200).json({ message: 'Joined contract successfully', contract });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get Contract by ID
const getContract = async (req, res) => {
    try {
        const { contractId } = req.params;
        const contract = await Contract.findOne({ _id: contractId }).populate('profileId');

        if (!contract) {
            return res.status(404).json({ message: 'Contract not found' });
        }

        return res.status(200).json(contract);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Get all Users who joined a specific Contract
const getUsersByJoinStatus = async (req, res) => {
    try {
        const { contractId } = req.params;

        // Find all contracts where `join` is true for the given contractId
        const contracts = await Contract.find({ _id: contractId, join: true }).populate('profileId');

        if (contracts.length === 0) {
            return res.status(404).json({ message: 'No users have joined this contract' });
        }

        // Extract the profiles of the users who joined
        const users = contracts.map(contract => contract.profileId);

        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createContract,
    joinContract,
    getContract,
    getUsersByJoinStatus
};
