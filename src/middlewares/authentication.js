// Example middleware to check if the user is authenticated
export const requireAuth = (req, res, next) => {
    if (req.session && req.session.userId) {
      // User is authenticated, proceed to the next middleware or route handler
      next();
    } else {
      // User is not authenticated, redirect or send an error response
      res.status(401).json({ error: 'Unauthorized' });
    }
  };
  