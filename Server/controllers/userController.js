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
    try{
        const {recentSearchedCities} = req.body;
        const user = await req.user;

        if(user.recentSearchedCities.length >= 5){
            user.recentSearchedCities.push(recentSearchedCities); // remove the oldest city if more than 5
        }
        else{
            user.recentSearchedCities.shift();
            user.recentSearchedCities.push(recentSearchedCities);        
        }
        await user.save();
        res.json({
            success:true,
            message:"Recent Searched Cities Updated",
            recentSearchedCities:user.recentSearchedCities
        });
    }
    catch(error){
        res.json({
            success:false,
            message:error.message
        });
    }
}
