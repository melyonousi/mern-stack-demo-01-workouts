const requireAuth = (req, res, next) => {

    // verfiy authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: 'authorization token required' })
    }

    const token = authorization.split(' ')[1]

    if (!token) {
        
    }
}