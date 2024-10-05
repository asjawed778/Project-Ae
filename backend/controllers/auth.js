

exports.signup = (req, res) => {
    try {


        return res.status(200).json({
            success: true,
            message: "User created Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}