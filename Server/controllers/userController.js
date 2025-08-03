export const getUserData = async (req,res)=>{
    try{
        const role = req.user.role;
        const recentSearchedCities = req.user.recentSearchedCities;
        res.json({
            success:true,
            role,
            recentSearchedCities
        });
    }
    catch(error){
         res.json({
            success:false,
            message:error.message})
    }
}


// store User Recent Searched cities
export const storeRecentSearchedCities = async (req,res)=>{
    try {
        // The frontend sends recentSearchedCity (single string)
        const { recentSearchedCity } = req.body;
        const user = req.user;

        // Remove duplicate if already present
        user.recentSearchedCities = user.recentSearchedCities.filter(city => city !== recentSearchedCity);
        // Add new city to end
        user.recentSearchedCities.push(recentSearchedCity);
        // Keep only last 5
        if (user.recentSearchedCities.length > 5) {
            user.recentSearchedCities = user.recentSearchedCities.slice(-5);
        }
        await user.save();
        res.json({
            success: true,
            message: "Recent Searched Cities Updated",
            recentSearchedCities: user.recentSearchedCities
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
}
